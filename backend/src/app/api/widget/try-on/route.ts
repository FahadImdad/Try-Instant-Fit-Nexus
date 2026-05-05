import { NextRequest, NextResponse } from 'next/server';
import { tryOn, TRYON_MODEL } from '@/lib/gemini';
import { uploadTryOnResult, uploadIsolatedGarment } from '@/lib/storage';
import { supabase } from '@/lib/supabase';

export const maxDuration = 90;

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Flash 3.1 @ 512px — cached garment = 1 call, fresh = 2 calls
const COST_PER_CALL = 0.045;

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const formData = await request.formData();

    const userPhotoFile   = formData.get('user_photo')        as File | null;
    const productImageUrl = formData.get('product_image_url') as string | null;
    const brandId         = formData.get('brand_id')          as string | null;
    const productId       = formData.get('product_id')        as string | null;
    const productName     = formData.get('product_name')      as string | null;

    if (!userPhotoFile)   return NextResponse.json({ error: 'user_photo is required' },        { status: 400 });
    if (!productImageUrl) return NextResponse.json({ error: 'product_image_url is required' }, { status: 400 });
    if (!brandId)         return NextResponse.json({ error: 'brand_id is required' },          { status: 400 });
    if (!ALLOWED_TYPES.includes(userPhotoFile.type)) {
      return NextResponse.json({ error: 'Photo must be JPG, PNG, or WebP' }, { status: 400 });
    }
    if (userPhotoFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Photo must be under 10MB' }, { status: 400 });
    }

    const userPhotoBuffer = Buffer.from(await userPhotoFile.arrayBuffer());
    const userPhotoBase64 = userPhotoBuffer.toString('base64');

    const productResponse = await fetch(productImageUrl, {
      headers: { 'User-Agent': 'TryInstantFit/1.0' },
    });
    if (!productResponse.ok) {
      return NextResponse.json({ error: 'Could not fetch product image. Please try again.' }, { status: 400 });
    }
    const productBuffer = Buffer.from(await productResponse.arrayBuffer());
    const productBase64 = productBuffer.toString('base64');
    const productMimeType = (productResponse.headers.get('content-type') ?? 'image/jpeg').split(';')[0];

    // ── Check for cached isolated garment ──────────────────────────────────────
    let cachedGarment: { data: string; mimeType: string } | undefined;
    let usedGarmentCache = false;
    if (productId) {
      const { data: cacheRow } = await supabase
        .from('product_garments')
        .select('isolated_garment_url, mime_type')
        .eq('product_id', productId)
        .eq('brand_id', brandId)
        .single();

      if (cacheRow?.isolated_garment_url) {
        try {
          const resp = await fetch(cacheRow.isolated_garment_url);
          if (resp.ok) {
            const buf = Buffer.from(await resp.arrayBuffer());
            cachedGarment = { data: buf.toString('base64'), mimeType: cacheRow.mime_type ?? 'image/jpeg' };
            usedGarmentCache = true;
            console.log('[try-on] Cache hit: using cached isolated garment for product:', productId);
          }
        } catch { /* ignore — will re-isolate */ }
      }
    }

    const result = await tryOn(userPhotoBase64, userPhotoFile.type, productBase64, productMimeType, cachedGarment);
    const resultBase64 = result.data;
    const resultMimeType = result.mimeType;
    const isolatedGarmentResult = result.isolatedGarment;

    console.log('[try-on] Done.');

    const resultBuffer = Buffer.from(resultBase64, 'base64');
    const resultUrl = await uploadTryOnResult(resultBuffer, brandId, resultMimeType);

    const processingTimeMs = Date.now() - startTime;

    if (isolatedGarmentResult && productId) {
      (async () => {
        try {
          const garmentBuffer = Buffer.from(isolatedGarmentResult.data, 'base64');
          const garmentUrl = await uploadIsolatedGarment(garmentBuffer, productId, isolatedGarmentResult.mimeType);
          await supabase.from('product_garments').upsert({
            product_id:           productId,
            brand_id:             brandId,
            isolated_garment_url: garmentUrl,
            mime_type:            isolatedGarmentResult.mimeType,
          }, { onConflict: 'product_id,brand_id' });
          console.log('[try-on] Cached isolated garment for product:', productId);
        } catch (err) {
          console.error('[try-on] Failed to cache garment:', err);
        }
      })();
    }

    supabase
      .from('tryons')
      .insert({
        brand_id:           brandId,
        product_id:         productId,
        product_name:       productName,
        result_image_url:   resultUrl,
        ai_model:           TRYON_MODEL,
        processing_time_ms: processingTimeMs,
        cost_usd:           usedGarmentCache ? COST_PER_CALL : COST_PER_CALL * 2,
        source:             'ghost-layer',
      })
      .then(({ error }) => {
        if (error) console.error('[try-on] Failed to save tryon record:', error.message);
      });

    return NextResponse.json({
      result_url:         resultUrl,
      processing_time_ms: processingTimeMs,
      model:              TRYON_MODEL,
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

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
