import { GoogleAuth } from 'google-auth-library';
import sharp from 'sharp';

// ── Model ──────────────────────────────────────────────────────────────────────
export const TRYON_MODEL = 'gemini-3.1-flash-image-preview';
export const TRYON_MAX_DIM = 512;

const MAX_RETRIES = 3;

// ── Auth ───────────────────────────────────────────────────────────────────────

async function getAccessToken(scope: string): Promise<string> {
  const keyJson = process.env.GOOGLE_CLOUD_KEY_JSON;
  if (!keyJson) throw new Error('GOOGLE_CLOUD_KEY_JSON is required');

  const credentials = JSON.parse(keyJson);
  const auth = new GoogleAuth({ credentials, scopes: [scope] });

  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error('Failed to get OAuth2 access token');
  return token;
}

// ── Image preprocessing ────────────────────────────────────────────────────────
// Normalizes input photos to JPEG at 512px on longest side.

export async function preprocessImage(base64: string, mimeType: string): Promise<{ base64: string; mimeType: string }> {
  const inputBuffer = Buffer.from(base64, 'base64');

  const outputBuffer = await sharp(inputBuffer)
    .rotate()
    .resize(TRYON_MAX_DIM, TRYON_MAX_DIM, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 92 })
    .toBuffer();

  return { base64: outputBuffer.toString('base64'), mimeType: 'image/jpeg' };
}

// ── Gemini call ────────────────────────────────────────────────────────────────

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callGemini(requestBody: object): Promise<any> {
  const token = await getAccessToken('https://www.googleapis.com/auth/generative-language');

  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${GEMINI_BASE_URL}/${TRYON_MODEL}:generateContent`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Gemini API ${response.status}: ${text}`);
      }
      return await response.json();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`[try-on] Gemini attempt ${attempt}/${MAX_RETRIES} failed: ${lastError.message}`);
      if (attempt < MAX_RETRIES) {
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError ?? new Error('Gemini API failed after retries');
}

async function isolateGarment(
  productBase64: string,
  productMimeType: string,
): Promise<{ data: string; mimeType: string }> {
  const result = await callGemini({
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `This is a product catalog photo showing a garment worn by a model or mannequin.

Your task: output an image of ONLY the garment item, completely isolated on a plain white background.
- Remove the model/mannequin entirely — keep ONLY the clothing
- Remove the background
- Show the garment flat or as if on an invisible hanger, at full size
- CRITICAL — preserve the EXACT color: if the garment is sky blue, it must be sky blue in the output. If it is maroon, it must be maroon. Do not lighten, darken, or shift the color at all.
- Preserve all details exactly: fabric texture, collar style, sleeve length, buttons, embroidery, cut, and any patterns
Output: just the garment on a white background with its exact original color and details intact.`,
          },
          { inlineData: { data: productBase64, mimeType: productMimeType } },
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
    throw new Error('Could not isolate garment from product image');
  }
  return { data: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType };
}

export async function tryOn(
  userPhotoBase64: string,
  userMimeType: string,
  productBase64: string,
  productMimeType: string,
  cachedGarment?: { data: string; mimeType: string },
): Promise<{ data: string; mimeType: string; model: string; isolatedGarment?: { data: string; mimeType: string } }> {
  const [userPhoto, productImg] = await Promise.all([
    preprocessImage(userPhotoBase64, userMimeType),
    preprocessImage(productBase64, productMimeType),
  ]);

  let garment: { data: string; mimeType: string };
  let freshlyIsolated = false;

  if (cachedGarment) {
    console.log('[try-on] Using cached isolated garment, skipping Step 1.');
    garment = cachedGarment;
  } else {
    console.log('[try-on] Step 1: Isolating garment...');
    garment = await isolateGarment(productImg.base64, productImg.mimeType);
    freshlyIsolated = true;
  }

  console.log('[try-on] Step 2: Applying garment to person...');

  const result = await callGemini({
    systemInstruction: {
      parts: [{ text: `You are a photo editing AI that performs clothing swaps. You receive a customer photo and an isolated garment image (garment on white background, no person). Your job is to place the garment onto the customer exactly as they appear — preserving their face, body, pose, and background completely. You only change the clothing.` }],
    },
    contents: [
      {
        role: 'user',
        parts: [
          { text: `You will receive two images:\n\nIMAGE 1 — ISOLATED GARMENT (on white background, no person):\nUse this as your garment reference — its exact color, fabric, texture, collar, sleeves, buttons, and all design details.\n\nIMAGE 2 — CUSTOMER PHOTO (your canvas):\nPreserve EVERYTHING exactly: face, pose, body, background.\n\nTHE ONLY CHANGE: Replace the clothing in IMAGE 2 with the garment from IMAGE 1.\n\nOUTPUT: IMAGE 2 with only the clothing swapped. Everything else unchanged.` },
          { text: 'IMAGE 1 — ISOLATED GARMENT:' },
          { inlineData: { data: garment.data, mimeType: garment.mimeType } },
          { text: 'IMAGE 2 — CUSTOMER PHOTO:' },
          { inlineData: { data: userPhoto.base64, mimeType: userPhoto.mimeType } },
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
    console.error('[try-on] No image in Gemini response. Text:', textPart?.text);
    throw new Error('AI could not generate the try-on. Please try a clearer, front-facing photo.');
  }

  return {
    data: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType ?? 'image/jpeg',
    model: TRYON_MODEL,
    isolatedGarment: freshlyIsolated ? garment : undefined,
  };
}
