import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@gradio/client';
import { generateContent, TRYON_MODEL, TRYON_PROMPT, TRYON_SYSTEM_INSTRUCTION, isolateGarment } from '@/lib/gemini';
import { uploadTryOnResult } from '@/lib/storage';
import { supabase } from '@/lib/supabase';

// 90s timeout — polling providers can take up to ~60s
export const maxDuration = 90;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// ── Fashn.ai integration ──────────────────────────────────────────────────────

async function callFashn(
  userPhotoBase64: string,
  userMimeType: string,
  productImageUrl: string
): Promise<{ buffer: Buffer; mimeType: string; model: string }> {
  const apiKey = process.env.FASHN_API_KEY;
  if (!apiKey) throw new Error('FASHN_API_KEY not configured');

  const userDataUri = `data:${userMimeType};base64,${userPhotoBase64}`;

  // Start prediction
  const startRes = await fetch('https://api.fashn.ai/v1/run', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tryon',
      input: {
        model_image: userDataUri,
        garment_image: productImageUrl,
        category: 'tops',
      },
    }),
  });

  if (!startRes.ok) {
    const text = await startRes.text();
    throw new Error(`Fashn.ai ${startRes.status}: ${text}`);
  }

  const { id, error: startErr } = await startRes.json();
  if (startErr) throw new Error(`Fashn.ai error: ${startErr}`);

  // Poll until done (max ~50s: 25 × 2s)
  for (let i = 0; i < 25; i++) {
    await new Promise((r) => setTimeout(r, 2000));

    const pollRes = await fetch(`https://api.fashn.ai/v1/status/${id}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const status = await pollRes.json();

    if (status.status === 'completed' && status.output?.[0]) {
      const imgRes = await fetch(status.output[0]);
      const mimeType = imgRes.headers.get('content-type')?.split(';')[0] ?? 'image/jpeg';
      return {
        buffer: Buffer.from(await imgRes.arrayBuffer()),
        mimeType,
        model: 'fashn-tryon',
      };
    }

    if (status.status === 'failed') {
      throw new Error(`Fashn.ai failed: ${status.error ?? 'unknown error'}`);
    }
  }

  throw new Error('Fashn.ai timed out after 50s');
}

// ── Replicate IDM-VTON integration ────────────────────────────────────────────

// ── HuggingFace IDM-VTON integration (free) ──────────────────────────────────

async function callHuggingFace(
  userPhotoBase64: string,
  userMimeType: string,
  productImageUrl: string
): Promise<{ buffer: Buffer; mimeType: string; model: string }> {
  const userPhotoBuffer = Buffer.from(userPhotoBase64, 'base64');
  const userBlob = new Blob([userPhotoBuffer], { type: userMimeType });

  const productRes = await fetch(productImageUrl, {
    headers: { 'User-Agent': 'TryInstantFit/1.0' },
  });
  if (!productRes.ok) throw new Error('Could not fetch product image for HuggingFace');
  const productBlob = await productRes.blob();

  const client = await Client.connect('yisol/IDM-VTON');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await client.predict('/tryon', {
    dict: { background: userBlob, layers: [], composite: null },
    garm_img: productBlob,
    garment_des: 'clothing item',
    is_checked: true,
    is_checked_crop: false,
    denoise_steps: 30,
    seed: 42,
  });

  // result.data[0] is the output image (FileData with .url)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const outputImg: any = result?.data?.[0];
  const outputUrl: string = outputImg?.url ?? outputImg;
  if (!outputUrl) throw new Error('HuggingFace IDM-VTON returned no image');

  const imgRes = await fetch(outputUrl);
  const mimeType = imgRes.headers.get('content-type')?.split(';')[0] ?? 'image/png';
  return {
    buffer: Buffer.from(await imgRes.arrayBuffer()),
    mimeType,
    model: 'idm-vton-hf',
  };
}

// ── Gemini integration ────────────────────────────────────────────────────────

async function callGemini(
  userPhotoBase64: string,
  userMimeType: string,
  productBase64: string,
  productMimeType: string
): Promise<{ buffer: Buffer; mimeType: string; model: string }> {
  // Step 1: Isolate the garment (remove model/mannequin from product image)
  console.log('[try-on] Step 1: Isolating garment from product image...');
  const isolatedGarment = await isolateGarment(productBase64, productMimeType);
  console.log('[try-on] Garment isolated, proceeding to try-on...');

  // Step 2: Apply isolated garment (no human pose) to customer photo
  const result = await generateContent({
    systemInstruction: {
      parts: [{ text: TRYON_SYSTEM_INSTRUCTION }],
    },
    contents: [
      {
        role: 'user',
        parts: [
          { text: TRYON_PROMPT },
          { text: 'IMAGE 1 — ISOLATED GARMENT (on white background, no person, no pose):' },
          { inlineData: { data: isolatedGarment.data, mimeType: isolatedGarment.mimeType } },
          { text: 'IMAGE 2 — CUSTOMER PHOTO (your canvas — preserve everything, only swap the clothing):' },
          { inlineData: { data: userPhotoBase64, mimeType: userMimeType } },
          { text: 'Now output IMAGE 2 with only the clothing replaced by the garment from IMAGE 1. Face, pose, body, and background unchanged.' },
        ],
      },
    ],
    generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parts: any[] = result.candidates?.[0]?.content?.parts ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imagePart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith('image/'));

  if (!imagePart?.inlineData?.data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textPart = parts.find((p: any) => p.text);
    console.error('[try-on] No image in Gemini response. Text:', textPart?.text, 'Full:', JSON.stringify(result).slice(0, 500));
    throw new Error('AI could not generate the try-on. Please try a clearer, front-facing photo.');
  }

  return {
    buffer: Buffer.from(imagePart.inlineData.data, 'base64'),
    mimeType: imagePart.inlineData.mimeType ?? 'image/jpeg',
    model: TRYON_MODEL,
  };
}

// ── Main route ────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const formData = await request.formData();

    const userPhotoFile = formData.get('user_photo') as File | null;
    const productImageUrl = formData.get('product_image_url') as string | null;
    const brandId = formData.get('brand_id') as string | null;
    const productId = formData.get('product_id') as string | null;
    const productName = formData.get('product_name') as string | null;
    const provider = (formData.get('provider') as string | null) ?? 'gemini';

    // ── Validation ──────────────────────────────────────────────────────────
    if (!userPhotoFile) {
      return NextResponse.json({ error: 'user_photo is required' }, { status: 400 });
    }
    if (!productImageUrl) {
      return NextResponse.json({ error: 'product_image_url is required' }, { status: 400 });
    }
    if (!brandId) {
      return NextResponse.json({ error: 'brand_id is required' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(userPhotoFile.type)) {
      return NextResponse.json({ error: 'Photo must be JPG, PNG, or WebP' }, { status: 400 });
    }
    if (userPhotoFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Photo must be under 10MB' }, { status: 400 });
    }

    // ── Convert user photo to base64 ────────────────────────────────────────
    const userPhotoBuffer = Buffer.from(await userPhotoFile.arrayBuffer());
    const userPhotoBase64 = userPhotoBuffer.toString('base64');

    // ── Fetch and convert product image ────────────────────────────────────
    const productResponse = await fetch(productImageUrl, {
      headers: { 'User-Agent': 'TryInstantFit/1.0' },
    });
    if (!productResponse.ok) {
      return NextResponse.json(
        { error: 'Could not fetch product image. Please try again.' },
        { status: 400 }
      );
    }
    const productBuffer = Buffer.from(await productResponse.arrayBuffer());
    const productMimeType = (productResponse.headers.get('content-type') ?? 'image/jpeg').split(';')[0];
    const productBase64 = productBuffer.toString('base64');

    // ── Call selected AI provider ───────────────────────────────────────────
    let resultBuffer: Buffer;
    let resultMimeType: string;
    let aiModel: string;

    console.log(`[try-on] Using provider: ${provider}`);

    if (provider === 'fashn') {
      const res = await callFashn(userPhotoBase64, userPhotoFile.type, productImageUrl);
      resultBuffer = res.buffer;
      resultMimeType = res.mimeType;
      aiModel = res.model;
    } else if (provider === 'replicate') {
      const res = await callHuggingFace(userPhotoBase64, userPhotoFile.type, productImageUrl);
      resultBuffer = res.buffer;
      resultMimeType = res.mimeType;
      aiModel = res.model;
    } else {
      // default: gemini
      const res = await callGemini(userPhotoBase64, userPhotoFile.type, productBase64, productMimeType);
      resultBuffer = res.buffer;
      resultMimeType = res.mimeType;
      aiModel = res.model;
    }

    // ── Upload result to Google Cloud Storage ───────────────────────────────
    const resultUrl = await uploadTryOnResult(resultBuffer, brandId, resultMimeType);

    const processingTimeMs = Date.now() - startTime;

    // ── Save to Supabase (fire-and-forget) ──────────────────────────────────
    supabase
      .from('tryons')
      .insert({
        brand_id: brandId,
        product_id: productId,
        product_name: productName,
        result_image_url: resultUrl,
        ai_model: aiModel,
        processing_time_ms: processingTimeMs,
        cost_usd: 0.004,
        source: 'ghost-layer',
      })
      .then(({ error }) => {
        if (error) console.error('[try-on] Failed to save tryon record:', error.message);
      });

    return NextResponse.json({
      result_url: resultUrl,
      processing_time_ms: processingTimeMs,
      provider,
    });
  } catch (error) {
    const processingTimeMs = Date.now() - startTime;
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[try-on] Unhandled error:', msg, error);
    return NextResponse.json(
      {
        error: 'Something went wrong generating your try-on. Please try again.',
        debug: msg,
        processing_time_ms: processingTimeMs,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
