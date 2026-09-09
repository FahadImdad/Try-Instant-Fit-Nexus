import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const DEFAULT_CONFIG = {
  enabled: true,
  buttonText: 'Try It On ✨',
  buttonColor: '#1a1a2e',
  buttonPosition: 'bottom-right' as const,
  showPlatformLogo: true,
  vendorLogoUrl: null as string | null,
  platformLogoUrl: null as string | null,
  vendorName: null as string | null,
  platformName: 'Try Instant Fit',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ brandId: string }> }
) {
  const { brandId } = await params;

  try {
    // Check brand is active
    const { data: brand } = await supabase
      .from('brands')
      .select('id, status')
      .eq('id', brandId)
      .single();

    if (!brand || (brand.status !== 'active' && brand.status !== 'trial')) {
      return NextResponse.json({ enabled: false });
    }

    // Fetch widget config for this brand
    const { data: config } = await supabase
      .from('widget_configs')
      .select('enabled, button_text, button_color, button_position, show_platform_logo, vendor_logo_url, platform_logo_url, vendor_name, platform_name')
      .eq('brand_id', brandId)
      .single();

    return NextResponse.json({
      brandId,
      enabled: config?.enabled ?? DEFAULT_CONFIG.enabled,
      buttonText: config?.button_text ?? DEFAULT_CONFIG.buttonText,
      buttonColor: config?.button_color ?? DEFAULT_CONFIG.buttonColor,
      buttonPosition: config?.button_position ?? DEFAULT_CONFIG.buttonPosition,
      showPlatformLogo: config?.show_platform_logo ?? DEFAULT_CONFIG.showPlatformLogo,
      vendorLogoUrl: config?.vendor_logo_url ?? DEFAULT_CONFIG.vendorLogoUrl,
      platformLogoUrl: config?.platform_logo_url ?? DEFAULT_CONFIG.platformLogoUrl,
      vendorName: config?.vendor_name ?? DEFAULT_CONFIG.vendorName,
      platformName: config?.platform_name ?? DEFAULT_CONFIG.platformName,
      apiEndpoint: process.env.NEXT_PUBLIC_API_URL ?? 'https://backend-tryinstantfit.vercel.app',
    });
  } catch (error) {
    console.error('[config] Error fetching widget config:', error);
    // Return default config on error so the widget still works
    return NextResponse.json({
      brandId,
      ...DEFAULT_CONFIG,
      apiEndpoint: process.env.NEXT_PUBLIC_API_URL ?? 'https://backend-tryinstantfit.vercel.app',
    });
  }
}

// Admin settings endpoint. The dashboard can call this with a brand id.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ brandId: string }> }
) {
  const { brandId } = await params;
  const body = await request.json().catch(() => ({}));
  const update = {
    show_platform_logo: body.showPlatformLogo !== false,
    vendor_logo_url: typeof body.vendorLogoUrl === 'string' && body.vendorLogoUrl.trim() ? body.vendorLogoUrl.trim() : null,
    platform_logo_url: typeof body.platformLogoUrl === 'string' && body.platformLogoUrl.trim() ? body.platformLogoUrl.trim() : null,
    vendor_name: typeof body.vendorName === 'string' && body.vendorName.trim() ? body.vendorName.trim() : null,
    platform_name: typeof body.platformName === 'string' && body.platformName.trim() ? body.platformName.trim() : 'Try Instant Fit',
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase.from('widget_configs').update(update).eq('brand_id', brandId).select().single();
  if (error) return NextResponse.json({ error: 'Could not update widget branding' }, { status: 400 });
  return NextResponse.json(data);
}

// Handle preflight
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
