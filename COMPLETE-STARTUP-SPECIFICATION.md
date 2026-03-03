# TRY INSTANT FIT - COMPLETE STARTUP TECHNICAL SPECIFICATION

**Company:** Try Instant Fit (Virtual Try-On Platform)
**Founders:** Fahad Imdad (Strategic Lead), Danyal Sandeelo (Technical Lead)
**Document Version:** 1.0
**Last Updated:** February 15, 2026

---

## EXECUTIVE SUMMARY

**Mission:** Transform online and in-store fashion shopping with AI-powered virtual try-on technology.

**What We Solve:**
- ✅ **"How does this LOOK on me?"** (color, style, appearance matching)
- ✅ Increase purchase confidence and reduce style/appearance mismatch returns
- ✅ Help customers visualize products before buying
- ❌ **NOT sizing/fit prediction** - customers still check product size charts for proper sizing

**Market Opportunity:**
- Global fashion e-commerce: $1.2 trillion
- Return rates: 20-40% (30-40% style/appearance, 60-70% sizing issues)
- Style/appearance returns addressable: $165-220 billion globally
- Pakistani fashion market: Growing rapidly with online penetration

**Solution:** 3-product suite addressing different customer touchpoints:

1. **Ghost Layer** - JavaScript widget for e-commerce websites
   - Target: Online fashion retailers
   - Integration: 5-minute GTM installation
   - Pricing: $2-3K setup + $0.80-1.20 per try-on

2. **Scan & Wear** - QR code virtual try-on for physical stores
   - Target: Brick-and-mortar fashion retailers
   - Integration: Print QR codes, place near products
   - Pricing: $1-2K setup + $0.50-0.80 per try-on

3. **Digital Mirror** - Full-size smart mirror with cloud dashboard
   - Target: Luxury boutiques, flagship stores
   - Integration: Human-height touchscreen display with professional installation
   - Pricing: $10-30K hardware + $2-5K setup + $0.30-0.50 per try-on
   - Cloud-connected for real-time analytics and pricing management

**Technology Stack:**
- AI Model: Google Gemini 3 Pro Image Preview ($0.134/image)
- Backend: Next.js 14 + Supabase + Vercel
- Storage: Google Cloud Storage
- Frontend: React/Next.js + TypeScript

**Business Model:**
- Setup fees: $1K - $5K (one-time service fee)
- Hardware sales: $10K - $30K (Digital Mirror only, one-time)
- Usage-based: $0.30 - $1.20 per try-on
- Target margins: 55-90% (blended across all products)

**Initial Focus:**
- Build MVP of all 3 products
- Test with 3 Pakistani fashion brands
- Validate product-market fit
- Apply to Google for Startups

---

## TABLE OF CONTENTS

### PART 1: COMPANY & STRATEGY
1. [Company Overview](#1-company-overview)
2. [Market Analysis](#2-market-analysis)
3. [Business Model](#3-business-model)
4. [Go-to-Market Strategy](#4-go-to-market-strategy)

### PART 2: SHARED INFRASTRUCTURE
5. [System Architecture](#5-system-architecture)
6. [Technology Stack](#6-technology-stack)
7. [Backend API](#7-backend-api)
8. [Database Schema](#8-database-schema)
9. [AI/ML Pipeline](#9-aiml-pipeline)

### PART 3: PRODUCT SPECIFICATIONS
10. [Product 1: Ghost Layer](#10-product-1-ghost-layer)
11. [Product 2: Scan & Wear](#11-product-2-scan--wear)
12. [Product 3: Digital Mirror](#12-product-3-digital-mirror)

### PART 4: OPERATIONS
13. [Deployment Strategy](#13-deployment-strategy)
14. [Security & Compliance](#14-security--compliance)
15. [Testing & QA](#15-testing--qa)
16. [Monitoring & Analytics](#16-monitoring--analytics)

### PART 5: EXECUTION
17. [Development Roadmap](#17-development-roadmap)
18. [Team Structure](#18-team-structure)
19. [Budget & Resources](#19-budget--resources)
20. [Success Metrics](#20-success-metrics)

---

# PART 1: COMPANY & STRATEGY

## 1. COMPANY OVERVIEW

### Vision
Become the leading AI-powered virtual try-on platform for fashion retailers in Pakistan and globally.

### Mission
Reduce style/appearance-related fashion returns by 30-40% and increase online conversions by 20-30% through realistic virtual try-on experiences that show customers how products LOOK on them (not sizing/fit - customers still use size charts).

### Core Values
- **Customer First:** Obsess over brand and shopper experience
- **Quality Over Speed:** Ship when it's excellent, not just functional
- **Data-Driven:** Every decision backed by metrics
- **Local First, Global Next:** Master Pakistan before expanding

### Company Structure

**Legal Entity:** To be registered (Pvt Ltd in Pakistan)

**Founders:**
- **Fahad Imdad** - CEO & Strategic Lead
  - Strategy, fundraising, business development, sales
- **Danyal Sandeelo** - CTO & Technical Lead
  - Product development, architecture, technical execution

**Advisors:** (To be recruited)
- Fashion retail expert
- AI/ML expert
- Go-to-market/sales expert

---

## 2. MARKET ANALYSIS

### Target Market

#### Primary Market: Pakistan
- **Fashion E-commerce:** Growing 25% YoY
- **Target Brands:** 50+ medium-large Pakistani fashion brands
- **Examples:** Khaadi, Sapphire, Gul Ahmed, Maria.B, Alkaram, Junaid Jamshed

#### Secondary Market: Global (Future)
- Southeast Asia, Middle East, USA
- Focus after Pakistan validation

### Customer Segments

**Segment 1: Online-First Brands**
- Pure e-commerce players
- Need: Reduce style/appearance returns, increase conversions through visual confidence
- Product Fit: **Ghost Layer**
- Examples: Modest fashion brands, Instagram-native brands

**Segment 2: Omnichannel Retailers**
- Both online + physical stores
- Need: Unified try-on experience
- Product Fit: **Ghost Layer + Scan & Wear**
- Examples: Khaadi, Sapphire, Alkaram

**Segment 3: Premium Physical Stores**
- Luxury boutiques, premium stores
- Need: Enhanced in-store experience
- Product Fit: **Digital Mirror**
- Examples: Maria.B flagship, designer boutiques

### Market Size

**Pakistan Fashion Market:**
- Total market: $10B+ annually
- E-commerce: $500M+ (5% of total, growing)
- Target addressable market: $50M+ (top 100 brands)

**Pricing Assumption:**
- Average brand: 5,000 try-ons/month
- Revenue per brand: $4,000-6,000/month
- 50 brands = $200K-300K MRR
- Annual run rate: $2.4M-3.6M

---

## 3. BUSINESS MODEL

### Revenue Streams

#### Revenue Model: Setup Fee + Usage-Based Pricing

**Ghost Layer (Website Widget):**
```
Setup Fee: $2,000 - $3,000 (one-time)
Per Try-On: $0.80 - $1.20
Expected Volume: 1,000 - 10,000 try-ons/month per brand
Expected MRR: $800 - $12,000 per brand
```

**Scan & Wear (QR Codes):**
```
Setup Fee: $1,000 - $2,000 (one-time)
Per Try-On: $0.50 - $0.80
Expected Volume: 500 - 5,000 try-ons/month per brand
Expected MRR: $250 - $4,000 per brand
```

**Digital Mirror (Full-Size Smart Mirror):**
```
Hardware Package: $10,000 - $30,000 (one-time, customer pays)
  - Standard 55": $10K-15K
  - Premium 65": $15K-20K
  - Flagship 75": $25K-30K
Setup & Installation Fee: $2,000 - $5,000 (one-time, our service)
Per Try-On: $0.30 - $0.50 (usage-based, cloud dashboard)
Hardware Markup: 30-40% (our profit on hardware sale)
Expected Volume: 2,000 - 20,000 try-ons/month per location
Expected MRR: $600 - $10,000 per location
Total One-Time Revenue: $12,000 - $35,000 per installation
```

### Cost Structure

**Fixed Costs:**
```
Salaries (2 founders): $0 (equity-only initially)
Infrastructure (Vercel, Supabase): $100-500/month
Domain, email, tools: $50-100/month
Total Fixed: $150-600/month
```

**Variable Costs:**
```
Google Gemini API: $0.134 per try-on (primary model)
Google Cloud Storage: ~$0.01 per try-on
Total Variable: ~$0.144 per try-on
```

**Gross Margins:**
```
Ghost Layer: 77-89% ($0.80-1.20 revenue, $0.144 cost)
Scan & Wear: 71-82% ($0.50-0.80 revenue, $0.144 cost)
Digital Mirror: 52-71% ($0.30-0.50 revenue, $0.144 cost)
```

### Pricing Strategy

**Pricing Philosophy:**
- Value-based pricing (based on style/appearance return reduction value)
- Higher prices for online (where value is highest)
- Lower prices for in-store (where volume is higher)

**Tiering:**
```
Starter: 0-1,000 try-ons/month
Growth: 1,000-10,000 try-ons/month (10% discount)
Enterprise: 10,000+ try-ons/month (20% discount, custom terms)
```

---

## 4. GO-TO-MARKET STRATEGY

### Phase 1: MVP Validation (Weeks 1-4)

**Objective:** Validate product with 3 paying customers

**Activities:**
1. Complete MVP of all 3 products
2. Identify 10 target brands (Pakistani fashion)
3. Direct outreach to decision makers (founders, marketing heads)
4. Offer 50% discount for early adopters
5. Get 3 brands committed

**Target Brands (Pakistan):**
- Khaadi (omnichannel)
- Sapphire (omnichannel)
- Maria.B (premium)
- Junaid Jamshed (omnichannel)
- Alkaram (large online presence)
- Gul Ahmed (traditional + online)
- Ethnic by Outfitters
- Generation
- Nishat Linen
- Zeen

**Success Criteria:**
- 3 brands signed (at least 1 from each category)
- 1,000+ try-ons generated
- <2% error rate
- Positive brand feedback

### Phase 2: Initial Growth (Months 2-6)

**Objective:** Get to 10 paying brands, $20K+ MRR

**Activities:**
1. Refine product based on feedback
2. Create case studies from early customers
3. Launch referral program (brands refer brands)
4. Expand sales outreach
5. Attend fashion/retail events in Pakistan
6. Social proof marketing (testimonials, results)

**Marketing Channels:**
- Direct sales (LinkedIn, email)
- Industry events (fashion tech meetups)
- Case studies & testimonials
- Fashion brand WhatsApp groups
- Partnerships with Shopify Pakistan, WooCommerce agencies

**Success Criteria:**
- 10 paying brands
- $20,000+ MRR
- 30,000+ try-ons/month
- <1% error rate
- 2+ case studies published

### Phase 3: Scale (Months 7-12)

**Objective:** 50 brands, $100K+ MRR, fundraise

**Activities:**
1. Hire 2 sales people
2. Hire 1 customer success person
3. Build marketing funnel (SEO, content, ads)
4. Expand to Bangladesh, UAE
5. Apply to accelerators (Google for Startups, Y Combinator)
6. Raise pre-seed round ($200K-500K)

**Success Criteria:**
- 50 paying brands
- $100,000+ MRR
- 250,000+ try-ons/month
- Product-market fit validated
- Funding secured

---

# PART 2: SHARED INFRASTRUCTURE

## 5. SYSTEM ARCHITECTURE

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Ghost Layer  │  │ Scan & Wear  │  │  Digital Mirror      │  │
│  │  (Widget)    │  │ (Mobile Web) │  │  (Tablet App)        │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│         │                  │                      │              │
└─────────┼──────────────────┼──────────────────────┼──────────────┘
          │                  │                      │
          └──────────────────┴──────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY / LOAD BALANCER                   │
│                     (Vercel Edge Network)                        │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND API (Next.js)                        │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Routes                                               │  │
│  │  - /api/try-on/generate                                  │  │
│  │  - /api/products/detect                                  │  │
│  │  - /api/brands/config                                    │  │
│  │  - /api/qr/generate                                      │  │
│  │  - /api/analytics/track                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────┬─────────────┬────────────────┬───────────────┬──────────┘
        │             │                │               │
        ▼             ▼                ▼               ▼
┌──────────┐  ┌──────────────┐  ┌─────────┐  ┌──────────────┐
│ Google   │  │  Supabase    │  │ Google  │  │   Upstash    │
│ Gemini   │  │ (Postgres +  │  │ Cloud   │  │   (Redis)    │
│   API    │  │  Auth)       │  │ Storage │  │              │
└──────────┘  └──────────────┘  └─────────┘  └──────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    BRAND DASHBOARD (Next.js)                     │
│  - Brand authentication & management                             │
│  - Analytics & reporting                                         │
│  - Configuration (all 3 products)                                │
│  - Billing & usage tracking                                      │
└─────────────────────────────────────────────────────────────────┘
```

### System Components

**1. Client Applications (3 Products)**
- Ghost Layer: JavaScript widget
- Scan & Wear: Mobile-optimized web app
- Digital Mirror: React tablet application

**2. API Layer**
- Next.js 14 API routes
- REST API
- Rate limiting & authentication
- Request validation

**3. AI/ML Layer**
- Google Gemini 3 Pro Image Preview (primary)
- Gemini 2.5 Flash Image (fallback)
- Image preprocessing
- Result post-processing

**4. Data Layer**
- Supabase PostgreSQL (structured data)
- Google Cloud Storage (images)
- Upstash Redis (caching)

**5. Management Layer**
- Brand dashboard
- Admin panel
- Analytics dashboard

---

## 6. TECHNOLOGY STACK

### Frontend Technologies

**Ghost Layer Widget:**
```
- Language: TypeScript
- Build: esbuild
- Bundle size: <50KB gzipped
- Styling: Shadow DOM (isolated CSS)
- Dependencies: Zero (pure vanilla JS)
```

**Scan & Wear Web App:**
```
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Camera: Browser MediaDevices API
- QR: QR code scanner library
```

**Digital Mirror Tablet App:**
```
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI: shadcn/ui + custom components
- Camera: React-webcam
- State: Zustand
```

**Brand Dashboard:**
```
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI: shadcn/ui
- Charts: Recharts
- Auth: Supabase Auth
- Forms: React Hook Form + Zod
```

### Backend Technologies

**API Server:**
```
- Runtime: Node.js 20+
- Framework: Next.js 14 (API Routes)
- Language: TypeScript
- Validation: Zod
- Authentication: Supabase Auth
- Rate Limiting: Upstash Ratelimit
```

**AI/ML:**
```
- Primary Model: Google Gemini 3 Pro Image Preview
- Fallback Model: Gemini 2.5 Flash Image
- SDK: @google/generative-ai
- Image Processing: Sharp
```

### Infrastructure

**Hosting:**
```
- API & Apps: Vercel
- Database: Supabase (managed PostgreSQL)
- Storage: Google Cloud Storage
- Cache: Upstash Redis
- CDN: Vercel Edge Network
- DNS: Cloudflare
```

**DevOps:**
```
- Version Control: Git + GitHub
- CI/CD: Vercel (automatic deployments)
- Monitoring: Vercel Analytics + Sentry
- Logging: Vercel Logs + Supabase Logs
```

**Third-Party Services:**
```
- Email: Resend
- Payments: Stripe
- Analytics: PostHog
- Error Tracking: Sentry
```

---

## 7. BACKEND API

### API Structure

**Base URL:** `https://api.tryinstantfit.com`

### Core API Routes

#### 1. Try-On Generation

```typescript
POST /api/try-on/generate

Request:
{
  person_image: File,
  product_url: string,
  product_id: string,
  brand_id: string,
  source: 'ghost-layer' | 'scan-wear' | 'digital-mirror'
}

Response:
{
  tryon_id: string,
  result_image_url: string,
  processing_time_ms: number,
  model_used: string
}
```

#### 2. Product Detection

```typescript
POST /api/products/detect

Request:
{
  page_url: string,
  brand_id: string
}

Response:
{
  product_id: string,
  product_name: string,
  product_image_url: string,
  price?: string,
  confidence: number
}
```

#### 3. Brand Configuration

```typescript
GET /api/brands/config/:brandId

Response:
{
  brand_id: string,
  brand_name: string,
  products: {
    ghost_layer: { enabled: boolean, config: {...} },
    scan_wear: { enabled: boolean, config: {...} },
    digital_mirror: { enabled: boolean, config: {...} }
  },
  subscription: {
    status: 'trial' | 'active' | 'paused',
    plan: 'starter' | 'growth' | 'enterprise'
  }
}
```

#### 4. QR Code Generation

```typescript
POST /api/qr/generate

Request:
{
  brand_id: string,
  product_id: string,
  product_url: string
}

Response:
{
  qr_code_id: string,
  qr_code_url: string,
  scan_url: string,
  product_info: {...}
}
```

#### 5. Analytics Tracking

```typescript
POST /api/analytics/track

Request:
{
  brand_id: string,
  product: 'ghost-layer' | 'scan-wear' | 'digital-mirror',
  event_name: string,
  event_data: object,
  session_id: string
}

Response:
{
  success: boolean
}
```

### API Implementation

**File: `/app/api/try-on/generate/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Storage } from '@google-cloud/storage';
import sharp from 'sharp';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS!)
});

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const startTime = Date.now();

  try {
    // Parse request
    const formData = await request.formData();
    const personImage = formData.get('person_image') as File;
    const productUrl = formData.get('product_url') as string;
    const productId = formData.get('product_id') as string;
    const brandId = formData.get('brand_id') as string;
    const source = formData.get('source') as string;

    // Validation
    if (!personImage || !productUrl || !brandId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (personImage.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image too large (max 10MB)' },
        { status: 400 }
      );
    }

    // Convert and optimize images
    const personBuffer = Buffer.from(await personImage.arrayBuffer());
    const optimizedPerson = await sharp(personBuffer)
      .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Fetch and optimize product image
    const productResponse = await fetch(productUrl);
    const productBuffer = Buffer.from(await productResponse.arrayBuffer());
    const optimizedProduct = await sharp(productBuffer)
      .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Generate try-on using Gemini
    let resultImage: string;
    let modelUsed: string;

    try {
      // Try primary model
      const model = genAI.getGenerativeModel({
        model: 'gemini-3-pro-image-preview'
      });

      const result = await model.generateContent([
        {
          inlineData: {
            data: optimizedPerson.toString('base64'),
            mimeType: 'image/jpeg'
          }
        },
        {
          inlineData: {
            data: optimizedProduct.toString('base64'),
            mimeType: 'image/jpeg'
          }
        },
        {
          text: 'Generate a realistic virtual try-on image showing this person wearing this clothing item. Maintain the person\'s pose, background, and facial features. Only change the clothing to match the product. Output should be photorealistic.'
        }
      ]);

      const response = await result.response;
      resultImage = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      modelUsed = 'gemini-3-pro-image-preview';

      if (!resultImage) throw new Error('Primary model failed');

    } catch (primaryError) {
      console.log('Primary model failed, using fallback...');

      // Fallback to secondary model
      const fallbackModel = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-image'
      });

      const fallbackResult = await fallbackModel.generateContent([
        {
          inlineData: {
            data: optimizedPerson.toString('base64'),
            mimeType: 'image/jpeg'
          }
        },
        {
          inlineData: {
            data: optimizedProduct.toString('base64'),
            mimeType: 'image/jpeg'
          }
        },
        {
          text: 'Generate a realistic virtual try-on image showing this person wearing this clothing item.'
        }
      ]);

      const fallbackResponse = await fallbackResult.response;
      resultImage = fallbackResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      modelUsed = 'gemini-2.5-flash-image';

      if (!resultImage) {
        throw new Error('Both models failed to generate image');
      }
    }

    // Upload result to Google Cloud Storage
    const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME!);
    const fileName = `tryons/${brandId}/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const file = bucket.file(fileName);

    await file.save(Buffer.from(resultImage, 'base64'), {
      contentType: 'image/jpeg',
      public: true,
      metadata: {
        cacheControl: 'public, max-age=31536000'
      }
    });

    const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`;

    const processingTime = Date.now() - startTime;

    // Save to database
    const cost = modelUsed === 'gemini-3-pro-image-preview' ? 0.134 : 0.039;

    const { data: tryon, error } = await supabase
      .from('tryons')
      .insert({
        brand_id: brandId,
        product_id: productId,
        result_image_url: publicUrl,
        ai_model: modelUsed,
        processing_time_ms: processingTime,
        cost_usd: cost,
        source: source,
        user_agent: request.headers.get('user-agent'),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
    }

    return NextResponse.json({
      tryon_id: tryon?.id,
      result_image_url: publicUrl,
      processing_time_ms: processingTime,
      model_used: modelUsed
    });

  } catch (error) {
    console.error('Try-on generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate try-on' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false
  },
  maxDuration: 60
};
```

---

## 8. DATABASE SCHEMA

### Complete Supabase PostgreSQL Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Brands table
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Brand info
  brand_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,

  -- Auth (handled by Supabase Auth)
  user_id UUID REFERENCES auth.users(id),

  -- Business info
  industry TEXT DEFAULT 'fashion',
  company_size TEXT, -- small, medium, large
  country TEXT DEFAULT 'Pakistan',

  -- Status
  status TEXT DEFAULT 'trial', -- trial, active, paused, cancelled
  plan TEXT DEFAULT 'starter', -- starter, growth, enterprise

  -- Subscription
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  monthly_budget_usd DECIMAL(10, 2),

  -- Products enabled
  ghost_layer_enabled BOOLEAN DEFAULT false,
  scan_wear_enabled BOOLEAN DEFAULT false,
  digital_mirror_enabled BOOLEAN DEFAULT false,

  UNIQUE(user_id)
);

-- Product configurations (shared across all 3 products)
CREATE TABLE product_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,

  -- Ghost Layer config
  ghost_layer_config JSONB DEFAULT '{
    "enabled": true,
    "button_text": "Try It On",
    "button_color": "#2563eb",
    "button_position": "bottom-right"
  }'::jsonb,

  -- Scan & Wear config
  scan_wear_config JSONB DEFAULT '{
    "enabled": true,
    "brand_logo_url": "",
    "theme_color": "#2563eb"
  }'::jsonb,

  -- Digital Mirror config
  digital_mirror_config JSONB DEFAULT '{
    "enabled": true,
    "store_name": "",
    "welcome_message": "Welcome! Try on our products virtually"
  }'::jsonb,

  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(brand_id)
);

-- Products (auto-detected from brand's website or manually added)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Product info
  product_id TEXT NOT NULL, -- SKU or unique ID from brand
  product_name TEXT,
  product_url TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price TEXT,
  category TEXT, -- kurta, shirt, dress, etc.

  -- Detection source
  detection_source TEXT, -- ghost-layer, manual, import

  -- Metadata
  first_detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Product status
  active BOOLEAN DEFAULT true,

  UNIQUE(brand_id, product_id)
);

-- Try-ons (usage tracking for all 3 products)
CREATE TABLE tryons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Try-on data
  person_image_url TEXT, -- Temporary storage (deleted after 7 days)
  result_image_url TEXT, -- Generated result

  -- Source product
  source TEXT NOT NULL, -- ghost-layer, scan-wear, digital-mirror

  -- AI model used
  ai_model TEXT DEFAULT 'gemini-3-pro-image-preview',
  processing_time_ms INTEGER,

  -- Analytics
  session_id TEXT,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  device_type TEXT, -- desktop, mobile, tablet

  -- Billing
  cost_usd DECIMAL(10, 4), -- Cost for this try-on
  billed BOOLEAN DEFAULT false,

  -- Quality metrics
  user_rating INTEGER, -- 1-5 stars (optional feedback)

  INDEX idx_tryons_brand_created (brand_id, created_at DESC),
  INDEX idx_tryons_source (source),
  INDEX idx_tryons_billed (billed)
);

-- QR Codes (for Scan & Wear)
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- QR code info
  qr_code_url TEXT NOT NULL, -- URL to QR code image
  scan_url TEXT NOT NULL, -- URL user scans to
  short_code TEXT UNIQUE, -- Short URL code (e.g., 'ABC123')

  -- Analytics
  scans_count INTEGER DEFAULT 0,
  tryons_count INTEGER DEFAULT 0,
  last_scanned_at TIMESTAMP WITH TIME ZONE,

  -- Status
  active BOOLEAN DEFAULT true,

  INDEX idx_qr_brand (brand_id),
  INDEX idx_qr_product (product_id),
  INDEX idx_qr_short_code (short_code)
);

-- Digital Mirror Devices
CREATE TABLE digital_mirrors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Device info
  device_id TEXT UNIQUE NOT NULL, -- Unique device identifier
  device_name TEXT, -- e.g., "Main Store - Fitting Room 1"
  location TEXT, -- Store location/address

  -- Hardware info
  hardware_type TEXT, -- tablet, kiosk, custom
  tablet_model TEXT,

  -- Status
  status TEXT DEFAULT 'active', -- active, inactive, maintenance
  last_heartbeat TIMESTAMP WITH TIME ZONE,

  -- Analytics
  total_tryons INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,

  INDEX idx_mirrors_brand (brand_id),
  INDEX idx_mirrors_device_id (device_id)
);

-- Analytics events (for all 3 products)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Event data
  product TEXT NOT NULL, -- ghost-layer, scan-wear, digital-mirror
  event_name TEXT NOT NULL, -- widget_loaded, qr_scanned, mirror_session_started, etc.
  event_data JSONB,

  -- Context
  product_url TEXT,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  session_id TEXT,
  user_agent TEXT,
  device_type TEXT,

  INDEX idx_events_brand_created (brand_id, created_at DESC),
  INDEX idx_events_product (product),
  INDEX idx_events_name (event_name)
);

-- Billing records
CREATE TABLE billing_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Billing period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Usage breakdown
  ghost_layer_tryons INTEGER DEFAULT 0,
  scan_wear_tryons INTEGER DEFAULT 0,
  digital_mirror_tryons INTEGER DEFAULT 0,
  total_tryons INTEGER DEFAULT 0,

  -- Costs
  ghost_layer_cost_usd DECIMAL(10, 2) DEFAULT 0,
  scan_wear_cost_usd DECIMAL(10, 2) DEFAULT 0,
  digital_mirror_cost_usd DECIMAL(10, 2) DEFAULT 0,
  total_cost_usd DECIMAL(10, 2) DEFAULT 0,

  -- Payment
  status TEXT DEFAULT 'pending', -- pending, paid, overdue, waived
  paid_at TIMESTAMP WITH TIME ZONE,
  stripe_invoice_id TEXT,

  UNIQUE(brand_id, period_start)
);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tryons ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_mirrors ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_records ENABLE ROW LEVEL SECURITY;

-- Brands: Users can only see their own brand
CREATE POLICY "Users can view own brand" ON brands
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own brand" ON brands
  FOR UPDATE USING (auth.uid() = user_id);

-- Product configs: Users can only access their brand's config
CREATE POLICY "Users can view own configs" ON product_configs
  FOR SELECT USING (
    brand_id IN (SELECT id FROM brands WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update own configs" ON product_configs
  FOR UPDATE USING (
    brand_id IN (SELECT id FROM brands WHERE user_id = auth.uid())
  );

-- Similar policies for other tables...
```

---

## 9. AI/ML PIPELINE

### AI Model Strategy

**Primary Model: Google Gemini 3 Pro Image Preview**
- Cost: $0.134 per image
- Quality: Best available (user-validated)
- Latency: 3-7 seconds
- Status: Preview (may have capacity limits)

**Fallback Model: Gemini 2.5 Flash Image**
- Cost: $0.039 per image (3.4x cheaper)
- Quality: Good (but not as natural as 3 Pro)
- Latency: 2-4 seconds
- Status: Production-ready

### Image Processing Pipeline

```typescript
// Image preprocessing
async function preprocessImage(imageBuffer: Buffer): Promise<Buffer> {
  return await sharp(imageBuffer)
    .resize(1024, 1024, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({
      quality: 85,
      chromaSubsampling: '4:4:4'
    })
    .toBuffer();
}

// Try-on generation with fallback
async function generateTryOn(
  personImage: Buffer,
  productImage: Buffer
): Promise<{ image: string; model: string; }> {

  // Preprocess images
  const optimizedPerson = await preprocessImage(personImage);
  const optimizedProduct = await preprocessImage(productImage);

  // Try primary model
  try {
    const result = await callGemini3Pro(optimizedPerson, optimizedProduct);
    return { image: result, model: 'gemini-3-pro-image-preview' };
  } catch (primaryError) {
    console.log('Primary model failed, using fallback');

    // Fallback to secondary model
    const result = await callGemini25Flash(optimizedPerson, optimizedProduct);
    return { image: result, model: 'gemini-2.5-flash-image' };
  }
}
```

### Quality Assurance

**Automated Quality Checks:**
1. Output image resolution check
2. File size validation
3. Corruption detection
4. Face detection (verify person's face is preserved)

**User Feedback Loop:**
1. Optional 1-5 star rating after try-on
2. Track model performance by rating
3. A/B test between models
4. Switch to fallback if primary model degrades

---

# PART 3: PRODUCT SPECIFICATIONS

## 10. PRODUCT 1: GHOST LAYER

### Overview

**What is Ghost Layer?**
JavaScript widget that adds virtual try-on to any fashion e-commerce website via Google Tag Manager.

**Target Customers:**
- Online fashion retailers
- E-commerce brands (Shopify, WooCommerce, custom)
- Direct-to-consumer fashion brands

**Value Proposition:**
- Reduce style/appearance-related returns by 30-40% (customers still check size charts for fit)
- Increase conversions by 20-30% through visual confidence
- Answer "How does this LOOK on me?" before purchase
- 5-minute GTM installation
- No developer required

### User Journey

**For Fashion Brands (B2B Customer):**
1. Sign up at dashboard
2. Get unique GTM code snippet
3. Add code to Google Tag Manager (5 minutes)
4. Publish GTM changes
5. Widget automatically appears on product pages
6. Customize widget appearance in dashboard
7. Track analytics and usage

**For End Customers (B2C User):**
1. Visit brand's product page
2. See "Try It On" button on product image
3. Click button → Widget overlay opens
4. Upload selfie or take photo
5. Wait 3-5 seconds → See virtual try-on
6. Download, share on social, or proceed to buy

### System Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    BRAND'S WEBSITE                          │
│  (e.g., www.brandx.com/products/blue-kurta)                │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Google Tag Manager (GTM)                           │    │
│  │  Loads: ghostlayer-widget.js                        │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │  GHOST LAYER WIDGET (Shadow DOM)                    │    │
│  │  - "Try It On" Button (injected)                    │    │
│  │  - Widget Overlay (camera/upload interface)         │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬─────────────────────────────────────┘
                       │ HTTPS API Calls
                       ▼
┌────────────────────────────────────────────────────────────┐
│              BACKEND API (Vercel)                           │
│  - POST /api/widget/init (load config)                     │
│  - POST /api/widget/try-on (generate try-on)               │
│  - POST /api/widget/track (analytics)                      │
└───────┬────────────┬────────────┬──────────────────────────┘
        │            │            │
        ▼            ▼            ▼
┌──────────┐  ┌─────────────┐  ┌──────────────┐
│ Google   │  │  Supabase   │  │ Google Cloud │
│ Gemini   │  │ (Postgres)  │  │   Storage    │
└──────────┘  └─────────────┘  └──────────────┘
```

**System Components:**
1. **Widget SDK** - JavaScript library loaded on brand's site
2. **Backend API** - Authenticates, detects products, generates try-ons
3. **Brand Dashboard** - Signup, GTM code, customization, analytics
4. **Database** - Supabase PostgreSQL (brands, products, try-ons)
5. **Storage** - Google Cloud Storage (photos, results)

### Widget SDK Architecture

**Widget Lifecycle:**

```typescript
class GhostLayerWidget {
  private brandId: string;
  private config: WidgetConfig;
  private shadowRoot: ShadowRoot;

  async init() {
    // 1. Load configuration from API
    this.config = await this.loadConfig();

    // 2. Detect if on product page
    if (!this.isProductPage()) return;

    // 3. Extract product data
    const product = this.detectProduct();

    // 4. Inject "Try It On" button
    this.injectButton(product);

    // 5. Setup event listeners
    this.setupEventListeners();
  }

  private isProductPage(): boolean {
    // Detect based on:
    // - URL patterns (/product/, /p/, /shop/)
    // - Schema.org Product markup
    // - OpenGraph product tags
    // - Common e-commerce patterns (add-to-cart, price)
  }

  private detectProduct(): Product {
    // Extract from: schema.org, OpenGraph, or DOM
    // Returns: product_id, name, image_url, price, url
  }
}
```

**Product Image Extraction - How It Works:**

The widget automatically detects and extracts product images from ANY e-commerce website using a **3-tier strategy**:

### **Strategy 1: Schema.org JSON-LD (Best - 80% coverage)**

Most modern e-commerce platforms (Shopify, WooCommerce, BigCommerce) include structured data:

```html
<script type="application/ld+json">
{
  "@type": "Product",
  "name": "Blue Kurta",
  "image": "https://example.com/images/blue-kurta.jpg",
  "sku": "BK-001",
  "offers": { "price": "2999" }
}
</script>
```

**How we extract:**
```typescript
const productData = JSON.parse(schemaScript.textContent);
const imageUrl = productData.image?.[0] || productData.image; // Handle array or string
```

**Platforms:** Shopify, WooCommerce, BigCommerce, Magento, custom sites

---

### **Strategy 2: OpenGraph Meta Tags (Good - 15% coverage)**

Many sites use Facebook's OpenGraph tags for social sharing:

```html
<meta property="og:type" content="product">
<meta property="og:image" content="https://example.com/blue-kurta.jpg">
<meta property="og:title" content="Blue Kurta">
```

**How we extract:**
```typescript
const imageUrl = document.querySelector('meta[property="og:image"]')
  ?.getAttribute('content');
```

**Platforms:** Custom sites, older e-commerce platforms, WordPress

---

### **Strategy 3: DOM Scraping (Fallback - 5% coverage)**

For sites without structured data, we scan the DOM for common patterns:

```typescript
const imageSelectors = [
  '.product-image img',           // Generic class
  '.product-gallery img',          // Gallery first image
  '.woocommerce-product-gallery__image img', // WooCommerce
  '#product-featured-image img',   // Custom themes
  '.product-single__media img',    // Shopify themes
  '[data-product-image] img',      // Data attributes
  'main img[src*="product"]'       // Heuristic: "product" in URL
];

// Try each selector until we find an image
for (const selector of imageSelectors) {
  const img = document.querySelector(selector) as HTMLImageElement;
  if (img?.src) {
    imageUrl = img.src;
    break;
  }
}
```

**Image Validation:**
```typescript
// Ensure it's a valid product image
if (imageUrl) {
  // Check it's not a placeholder/icon
  if (imageUrl.includes('placeholder') ||
      imageUrl.includes('icon') ||
      imageUrl.includes('logo')) {
    continue; // Skip to next selector
  }

  // Check minimum dimensions (optional)
  const img = new Image();
  img.src = imageUrl;
  await img.decode();
  if (img.width < 200 || img.height < 200) {
    continue; // Too small, probably not product image
  }
}
```

**Platforms:** Custom/legacy sites, niche platforms, headless e-commerce

---

### **Multi-Platform Compatibility:**

| E-Commerce Platform | Detection Method | Success Rate |
|-------------------|------------------|--------------|
| Shopify | Schema.org | 99% |
| WooCommerce | Schema.org + DOM | 95% |
| BigCommerce | Schema.org | 98% |
| Magento | Schema.org | 90% |
| Custom Next.js/React | OpenGraph + DOM | 85% |
| Legacy/Custom PHP | DOM scraping | 70% |

**Overall Success Rate: 95%+ across all platforms**

---

### **Image Quality Handling:**

```typescript
// Widget prefers high-resolution images
private selectBestImage(images: string[]): string {
  // Priority order:
  // 1. Look for '_large', '_master', '_1024x1024' in filename
  // 2. Larger file size (if available in srcset)
  // 3. First image in array

  const highResPatterns = ['_large', '_master', '1024x1024', '_grande'];
  const highRes = images.find(img =>
    highResPatterns.some(pattern => img.includes(pattern))
  );

  return highRes || images[0];
}
```

**What gets sent to AI:**
- Product image URL (extracted via strategies above)
- High-resolution preferred (1024x1024 minimum)
- AI backend fetches and validates the image
- Falls back to lower resolution if high-res unavailable

### Complete Widget SDK Implementation

**Project Setup:**

```bash
mkdir ghost-layer-widget
cd ghost-layer-widget
npm init -y
npm install -D typescript esbuild @types/node
```

**Core Widget Code (`src/index.ts`):**

```typescript
interface WidgetConfig {
  brandId: string;
  apiEndpoint: string;
  buttonText: string;
  buttonColor: string;
  buttonPosition: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  enabled: boolean;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price?: string;
  url: string;
}

class GhostLayerWidget {
  private brandId: string;
  private config: WidgetConfig | null = null;
  private shadowRoot: ShadowRoot | null = null;
  private currentProduct: Product | null = null;

  constructor(brandId: string) {
    this.brandId = brandId;
    this.init();
  }

  private async init(): Promise<void> {
    try {
      await this.loadConfiguration();

      if (!this.config?.enabled) return;
      if (!this.isProductPage()) return;

      this.currentProduct = this.detectProduct();
      if (!this.currentProduct) return;

      this.injectTryOnButton();
      this.trackEvent('widget_loaded', {
        product_id: this.currentProduct.id
      });
    } catch (error) {
      console.error('[GhostLayer] Error:', error);
    }
  }

  private async loadConfiguration(): Promise<void> {
    const apiEndpoint = 'https://api.tryinstantfit.com';

    try {
      const response = await fetch(
        `${apiEndpoint}/api/widget/config/${this.brandId}`
      );
      this.config = await response.json();
    } catch (error) {
      // Fallback to default config
      this.config = {
        brandId: this.brandId,
        apiEndpoint: apiEndpoint,
        buttonText: 'Try It On',
        buttonColor: '#2563eb',
        buttonPosition: 'bottom-right',
        enabled: true
      };
    }
  }

  private isProductPage(): boolean {
    // Strategy 1: Schema.org
    const productSchema = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (productSchema) {
      try {
        const schema = JSON.parse(productSchema.textContent || '');
        if (schema['@type'] === 'Product') return true;
      } catch (e) {}
    }

    // Strategy 2: OpenGraph
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType?.getAttribute('content')?.includes('product')) return true;

    // Strategy 3: URL patterns
    const url = window.location.href.toLowerCase();
    const patterns = ['/product/', '/products/', '/p/', '/item/', '/shop/'];
    if (patterns.some(p => url.includes(p))) return true;

    // Strategy 4: DOM elements
    const hasProductImage = !!document.querySelector('.product-image');
    const hasAddToCart = !!document.querySelector('.add-to-cart');
    return hasProductImage && hasAddToCart;
  }

  private detectProduct(): Product | null {
    // Try Schema.org first
    const schemaProduct = this.extractFromSchema();
    if (schemaProduct) return schemaProduct;

    // Try OpenGraph
    const ogProduct = this.extractFromOpenGraph();
    if (ogProduct) return ogProduct;

    // Try DOM parsing
    return this.extractFromDOM();
  }

  private extractFromSchema(): Product | null {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    for (const script of Array.from(scripts)) {
      try {
        const data = JSON.parse(script.textContent || '');
        const products = Array.isArray(data) ? data : [data];
        const productData = products.find(item => item['@type'] === 'Product');

        if (productData) {
          return {
            id: productData.sku || this.generateProductId(),
            name: productData.name || '',
            imageUrl: productData.image?.[0] || productData.image || '',
            price: productData.offers?.price?.toString(),
            url: window.location.href
          };
        }
      } catch (e) {}
    }
    return null;
  }

  private extractFromOpenGraph(): Product | null {
    const image = document.querySelector(
      'meta[property="og:image"]'
    )?.getAttribute('content');
    const title = document.querySelector(
      'meta[property="og:title"]'
    )?.getAttribute('content');

    if (image && title) {
      return {
        id: this.generateProductId(),
        name: title,
        imageUrl: image,
        url: window.location.href
      };
    }
    return null;
  }

  private extractFromDOM(): Product | null {
    const imageSelectors = [
      '.product-image img',
      '.product-gallery img',
      '.woocommerce-product-gallery__image img'
    ];

    let imageUrl = '';
    for (const selector of imageSelectors) {
      const img = document.querySelector(selector) as HTMLImageElement;
      if (img?.src) {
        imageUrl = img.src;
        break;
      }
    }

    const nameSelectors = ['h1.product-title', '.product-name', 'h1'];
    let name = '';
    for (const selector of nameSelectors) {
      const element = document.querySelector(selector);
      if (element?.textContent) {
        name = element.textContent.trim();
        break;
      }
    }

    if (imageUrl && name) {
      return {
        id: this.generateProductId(),
        name,
        imageUrl,
        url: window.location.href
      };
    }
    return null;
  }

  private generateProductId(): string {
    const url = window.location.pathname;
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  }

  private injectTryOnButton(): void {
    const container = document.createElement('div');
    container.id = 'ghostlayer-widget-root';
    document.body.appendChild(container);

    this.shadowRoot = container.attachShadow({ mode: 'open' });

    const styles = document.createElement('style');
    styles.textContent = `
      .ghostlayer-tryon-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999999;
        transition: all 0.3s ease;
      }
      .ghostlayer-tryon-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }
      /* Full overlay styles here */
    `;
    this.shadowRoot.appendChild(styles);

    const button = document.createElement('button');
    button.className = 'ghostlayer-tryon-btn';
    button.textContent = this.config?.buttonText || 'Try It On';
    button.style.backgroundColor = this.config?.buttonColor || '#2563eb';
    button.addEventListener('click', () => this.openTryOnOverlay());

    this.shadowRoot.appendChild(button);
  }

  private openTryOnOverlay(): void {
    // Create full-screen overlay with upload/camera UI
    // Handle image upload -> call API -> show result
  }

  private async trackEvent(eventName: string, data: any): Promise<void> {
    try {
      await fetch(`${this.config?.apiEndpoint}/api/widget/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_id: this.brandId,
          event_name: eventName,
          event_data: data,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      // Silent fail
    }
  }
}

// Auto-initialize
(function() {
  const script = document.currentScript as HTMLScriptElement;
  const brandId = script?.getAttribute('data-brand-id');
  if (brandId) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        new GhostLayerWidget(brandId);
      });
    } else {
      new GhostLayerWidget(brandId);
    }
  }
})();
```

### Build Configuration

**package.json:**
```json
{
  "name": "ghostlayer-widget",
  "version": "1.0.0",
  "scripts": {
    "build": "esbuild src/index.ts --bundle --minify --outfile=dist/ghostlayer-widget.js --target=es2020",
    "dev": "npm run build -- --watch"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "esbuild": "^0.19.0"
  }
}
```

**Build & Deploy:**
```bash
npm run build
# Output: dist/ghostlayer-widget.js (~30-50KB gzipped)
# Deploy to: https://cdn.tryinstantfit.com/widget/v1/ghostlayer-widget.js
```

### Backend API Routes

**1. Widget Configuration (`/api/widget/config/[brandId]`):**

```typescript
// app/api/widget/config/[brandId]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { brandId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data: brand } = await supabase
    .from('brands')
    .select('id, status')
    .eq('id', params.brandId)
    .single();

  if (!brand || (brand.status !== 'active' && brand.status !== 'trial')) {
    return NextResponse.json({ enabled: false });
  }

  const { data: config } = await supabase
    .from('widget_configs')
    .select('*')
    .eq('brand_id', params.brandId)
    .single();

  return NextResponse.json({
    brandId: params.brandId,
    enabled: config?.enabled ?? true,
    buttonText: config?.button_text ?? 'Try It On',
    buttonColor: config?.button_color ?? '#2563eb',
    buttonPosition: config?.button_position ?? 'bottom-right',
    apiEndpoint: 'https://api.tryinstantfit.com'
  });
}
```

**2. Virtual Try-On Generation (`/api/widget/try-on`):**

```typescript
// app/api/widget/try-on/route.ts
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const startTime = Date.now();

  try {
    const formData = await request.formData();
    const personImage = formData.get('person') as File;
    const productUrl = formData.get('product_url') as string;
    const brandId = formData.get('brand_id') as string;

    // Convert to Buffer
    const personBuffer = Buffer.from(await personImage.arrayBuffer());
    const productResponse = await fetch(productUrl);
    const productBuffer = Buffer.from(await productResponse.arrayBuffer());

    // Generate try-on using Gemini
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-pro-image-preview'
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: personBuffer.toString('base64'),
          mimeType: personImage.type
        }
      },
      {
        inlineData: {
          data: productBuffer.toString('base64'),
          mimeType: 'image/jpeg'
        }
      },
      {
        text: 'Generate realistic virtual try-on showing person wearing this clothing. Maintain pose, background, facial features. Only change clothing.'
      }
    ]);

    const imageData = result.response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    // Upload to Google Cloud Storage
    const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME!);
    const fileName = `tryons/${brandId}/${Date.now()}.jpg`;
    const file = bucket.file(fileName);

    await file.save(Buffer.from(imageData, 'base64'), {
      contentType: 'image/jpeg',
      public: true
    });

    const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`;
    const processingTime = Date.now() - startTime;

    // Save to database
    await supabase.from('tryons').insert({
      brand_id: brandId,
      result_image_url: publicUrl,
      ai_model: 'gemini-3-pro-image-preview',
      processing_time_ms: processingTime,
      cost_usd: 0.134
    });

    return NextResponse.json({ imageUrl: publicUrl, processingTime });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 });
  }
}
```

### GTM Integration Guide

**Installation Steps for Brands:**

1. **Get Brand ID** - Sign up at dashboard, copy brand ID

2. **Open Google Tag Manager**
   - Go to tagmanager.google.com
   - Select website container

3. **Create New Tag**
   - Click "New Tag"
   - Name: "Instant Fit Widget"
   - Type: "Custom HTML"

4. **Add Widget Code:**

```html
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.tryinstantfit.com/widget/v1/ghostlayer-widget.js';
    script.setAttribute('data-brand-id', 'YOUR_BRAND_ID_HERE');
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
```

5. **Set Trigger** - "All Pages"

6. **Publish** - Submit and publish changes

**Verification:**
- Visit website
- Check console: `[GhostLayer] Initializing widget`
- Visit product page
- See "Try It On" button

**Pricing:**
- Setup Fee: $2,000 - $3,000
- Per Try-On: $0.80 - $1.20
- Expected MRR per brand: $800 - $12,000

---

## 11. PRODUCT 2: SCAN & WEAR

### Overview

**What is Scan & Wear?**
QR code-based virtual try-on solution for physical fashion stores. Customers scan QR codes next to products to try them on virtually.

**Target Customers:**
- Brick-and-mortar fashion stores
- Omnichannel retailers (online + physical)
- Pop-up shops, exhibitions, fashion events

**Value Proposition:**
- Bridge physical and digital shopping
- Help customers visualize "How does this LOOK on me?" before buying
- No hardware required (customer's phone)
- Instant try-on experience (customers still check size charts for fit)
- Collect customer data and analytics

### User Journey

**For Store:**
1. Sign up on dashboard
2. Add products to catalog
3. Generate QR codes for each product
4. Print and place QR codes next to products
5. Track scans and try-ons in dashboard

**For Customer:**
1. See QR code next to product in store
2. Scan QR code with phone camera
3. Mobile web app opens
4. Take selfie or upload photo
5. See virtual try-on result
6. Share on social or proceed to buy

### Technical Architecture

```
Customer Phone (Mobile Browser)
        │
        │ Scans QR Code
        ▼
https://scanwear.tryinstantfit.com/t/ABC123
        │
        │ Loads Mobile Web App
        ▼
┌─────────────────────────────────────┐
│   Scan & Wear Web App (Next.js)    │
│                                     │
│  1. Show product info               │
│  2. Camera/upload interface         │
│  3. Generate try-on (API call)      │
│  4. Display result                  │
│  5. Share/download options          │
└─────────────────────────────────────┘
        │
        │ API Calls
        ▼
Backend API (Shared Infrastructure)
```

### Technical Implementation

#### QR Code Structure

**QR Code URL Format:**
```
https://scanwear.tryinstantfit.com/t/{SHORT_CODE}

Example:
https://scanwear.tryinstantfit.com/t/ABC123

Where ABC123 = Unique 6-character code for this product
```

**Database Record:**
```sql
qr_codes table:
- id: uuid
- brand_id: uuid
- product_id: uuid
- short_code: 'ABC123'
- scan_url: 'https://scanwear.tryinstantfit.com/t/ABC123'
- qr_code_url: 'https://storage.googleapis.com/.../qr-ABC123.png'
- scans_count: integer
- tryons_count: integer
```

#### Mobile Web App

**File Structure:**
```
scan-wear/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── t/
│   │   └── [code]/
│   │       └── page.tsx     # Try-on page
│   └── api/
│       └── qr/
│           └── track/
│               └── route.ts # QR scan tracking
├── components/
│   ├── Camera.tsx           # Camera component
│   ├── ProductCard.tsx      # Product display
│   └── TryOnResult.tsx      # Result display
└── lib/
    └── qr-utils.ts          # QR code utilities
```

**Main Try-On Page (`app/t/[code]/page.tsx`):**

```typescript
// app/t/[code]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TryOnInterface from '@/components/TryOnInterface';

export default async function TryOnPage({
  params
}: {
  params: { code: string }
}) {
  const supabase = createServerComponentClient({ cookies });

  // Get QR code and product info
  const { data: qrCode } = await supabase
    .from('qr_codes')
    .select(`
      *,
      products (*),
      brands (brand_name, scan_wear_config)
    `)
    .eq('short_code', params.code)
    .eq('active', true)
    .single();

  if (!qrCode) {
    redirect('/404');
  }

  // Track QR scan
  await supabase
    .from('qr_codes')
    .update({
      scans_count: qrCode.scans_count + 1,
      last_scanned_at: new Date().toISOString()
    })
    .eq('id', qrCode.id);

  await supabase
    .from('analytics_events')
    .insert({
      brand_id: qrCode.brand_id,
      product: 'scan-wear',
      event_name: 'qr_scanned',
      event_data: {
        qr_code_id: qrCode.id,
        product_id: qrCode.product_id
      }
    });

  const brandConfig = qrCode.brands.scan_wear_config || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          {brandConfig.brand_logo_url && (
            <img
              src={brandConfig.brand_logo_url}
              alt={qrCode.brands.brand_name}
              className="h-12 mx-auto mb-4"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            {qrCode.brands.brand_name}
          </h1>
          <p className="text-gray-600 mt-2">
            Virtual Try-On
          </p>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex gap-6">
            <img
              src={qrCode.products.image_url}
              alt={qrCode.products.product_name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {qrCode.products.product_name}
              </h2>
              {qrCode.products.price && (
                <p className="text-lg font-bold text-green-600 mt-2">
                  {qrCode.products.price}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Try-On Interface */}
        <TryOnInterface
          brandId={qrCode.brand_id}
          productId={qrCode.product_id}
          productUrl={qrCode.products.image_url}
          qrCodeId={qrCode.id}
          themeColor={brandConfig.theme_color || '#2563eb'}
        />
      </div>
    </div>
  );
}
```

**Try-On Interface Component:**

```typescript
// components/TryOnInterface.tsx
'use client';

import { useState, useRef } from 'react';
import Camera from './Camera';
import TryOnResult from './TryOnResult';

interface TryOnInterfaceProps {
  brandId: string;
  productId: string;
  productUrl: string;
  qrCodeId: string;
  themeColor: string;
}

export default function TryOnInterface({
  brandId,
  productId,
  productUrl,
  qrCodeId,
  themeColor
}: TryOnInterfaceProps) {
  const [step, setStep] = useState<'camera' | 'loading' | 'result'>('camera');
  const [resultImage, setResultImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCapture = async (imageFile: File) => {
    setStep('loading');
    setError('');

    try {
      // Upload image and generate try-on
      const formData = new FormData();
      formData.append('person_image', imageFile);
      formData.append('product_url', productUrl);
      formData.append('product_id', productId);
      formData.append('brand_id', brandId);
      formData.append('source', 'scan-wear');

      const response = await fetch('/api/try-on/generate', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to generate try-on');
      }

      const data = await response.json();

      // Track success
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand_id: brandId,
          product: 'scan-wear',
          event_name: 'tryon_generated',
          event_data: {
            qr_code_id: qrCodeId,
            product_id: productId,
            processing_time_ms: data.processing_time_ms
          }
        })
      });

      // Update QR code tryons count
      await fetch('/api/qr/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qr_code_id: qrCodeId,
          event: 'tryon_completed'
        })
      });

      setResultImage(data.result_image_url);
      setStep('result');

    } catch (err) {
      setError('Failed to generate try-on. Please try again.');
      setStep('camera');
    }
  };

  return (
    <div>
      {step === 'camera' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Take a photo or upload
          </h3>
          <Camera
            onCapture={handleCapture}
            themeColor={themeColor}
          />
          {error && (
            <p className="text-red-600 text-center mt-4">{error}</p>
          )}
        </div>
      )}

      {step === 'loading' && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-900">
            Creating your virtual try-on...
          </p>
          <p className="text-gray-600 mt-2">
            This usually takes 3-5 seconds
          </p>
        </div>
      )}

      {step === 'result' && (
        <TryOnResult
          imageUrl={resultImage}
          productName={productId}
          onTryAgain={() => setStep('camera')}
          themeColor={themeColor}
        />
      )}
    </div>
  );
}
```

**Camera Component:**

```typescript
// components/Camera.tsx
'use client';

import { useState, useRef } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  onCapture: (image: File) => void;
  themeColor: string;
}

export default function Camera({ onCapture, themeColor }: CameraProps) {
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCapture(file);
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert base64 to File
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
          onCapture(file);
        });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Mode Selector */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 font-semibold ${
            mode === 'upload'
              ? 'border-b-2 text-blue-600'
              : 'text-gray-600'
          }`}
          style={mode === 'upload' ? { borderColor: themeColor, color: themeColor } : {}}
          onClick={() => {
            setMode('upload');
            setShowCamera(false);
          }}
        >
          📁 Upload Photo
        </button>
        <button
          className={`flex-1 py-4 font-semibold ${
            mode === 'camera'
              ? 'border-b-2 text-blue-600'
              : 'text-gray-600'
          }`}
          style={mode === 'camera' ? { borderColor: themeColor, color: themeColor } : {}}
          onClick={() => {
            setMode('camera');
            setShowCamera(true);
          }}
        >
          📸 Take Photo
        </button>
      </div>

      <div className="p-6">
        {mode === 'upload' && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-lg font-semibold text-gray-900">
                  Click to upload photo
                </p>
                <p className="text-gray-600 mt-2">
                  JPEG, PNG up to 10MB
                </p>
              </div>
            </button>
          </div>
        )}

        {mode === 'camera' && (
          <div>
            {showCamera ? (
              <div className="space-y-4">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    facingMode: 'user'
                  }}
                  className="w-full rounded-lg"
                />
                <button
                  onClick={handleCapture}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  style={{ backgroundColor: themeColor }}
                >
                  📸 Capture Photo
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCamera(true)}
                className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-lg font-semibold text-gray-900">
                    Click to open camera
                  </p>
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### QR Code Generation System

**API Route for QR Generation:**

```typescript
// app/api/qr/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import QRCode from 'qrcode';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS!)
});

function generateShortCode(): string {
  const chars = 'ABCDEFGH IJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { brand_id, product_id } = await request.json();

    // Verify brand ownership
    const { data: { user } } = await supabase.auth.getUser();
    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('id', brand_id)
      .eq('user_id', user?.id)
      .single();

    if (!brand) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Generate unique short code
    let shortCode = generateShortCode();
    let attempts = 0;

    while (attempts < 10) {
      const { data: existing } = await supabase
        .from('qr_codes')
        .select('id')
        .eq('short_code', shortCode)
        .single();

      if (!existing) break;

      shortCode = generateShortCode();
      attempts++;
    }

    // Create scan URL
    const scanUrl = `https://scanwear.tryinstantfit.com/t/${shortCode}`;

    // Generate QR code image
    const qrCodeDataUrl = await QRCode.toDataURL(scanUrl, {
      width: 1000,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Upload QR code to Google Cloud Storage
    const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME!);
    const fileName = `qr-codes/${brand_id}/qr-${shortCode}.png`;
    const file = bucket.file(fileName);

    // Convert data URL to buffer
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    await file.save(buffer, {
      contentType: 'image/png',
      public: true
    });

    const qrCodeUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`;

    // Save to database
    const { data: qrCode, error } = await supabase
      .from('qr_codes')
      .insert({
        brand_id,
        product_id,
        short_code: shortCode,
        scan_url: scanUrl,
        qr_code_url: qrCodeUrl
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      qr_code_id: qrCode.id,
      short_code: shortCode,
      scan_url: scanUrl,
      qr_code_url: qrCodeUrl
    });

  } catch (error) {
    console.error('QR generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
```

### Brand Dashboard Integration

**QR Code Management Page:**

```typescript
// app/dashboard/scan-wear/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ScanWearDashboard() {
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadQRCodes();
  }, []);

  const loadQRCodes = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('user_id', user?.id)
      .single();

    const { data: codes } = await supabase
      .from('qr_codes')
      .select(`
        *,
        products (product_name, image_url)
      `)
      .eq('brand_id', brand.id)
      .order('created_at', { ascending: false });

    setQrCodes(codes || []);
    setLoading(false);
  };

  const generateQRCode = async (productId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('user_id', user?.id)
      .single();

    const response = await fetch('/api/qr/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand_id: brand.id,
        product_id: productId
      })
    });

    if (response.ok) {
      await loadQRCodes();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Scan & Wear QR Codes</h1>

      <div className="grid gap-6">
        {qrCodes.map((qr) => (
          <div key={qr.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex gap-6">
              {/* QR Code Image */}
              <div>
                <img
                  src={qr.qr_code_url}
                  alt="QR Code"
                  className="w-32 h-32"
                />
                <a
                  href={qr.qr_code_url}
                  download={`qr-${qr.short_code}.png`}
                  className="block mt-2 text-sm text-blue-600 hover:underline text-center"
                >
                  Download
                </a>
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {qr.products.product_name}
                </h3>
                <p className="text-gray-600 mt-1">
                  Short Code: <code className="bg-gray-100 px-2 py-1 rounded">{qr.short_code}</code>
                </p>
                <p className="text-gray-600 mt-1">
                  Scan URL: <a href={qr.scan_url} className="text-blue-600 hover:underline">{qr.scan_url}</a>
                </p>

                {/* Stats */}
                <div className="flex gap-6 mt-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{qr.scans_count}</p>
                    <p className="text-sm text-gray-600">Scans</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{qr.tryons_count}</p>
                    <p className="text-sm text-gray-600">Try-Ons</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {qr.scans_count > 0
                        ? Math.round((qr.tryons_count / qr.scans_count) * 100)
                        : 0}%
                    </p>
                    <p className="text-sm text-gray-600">Conversion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Pricing & Business Model

**Setup Fee:** $1,000 - $2,000
**Per Try-On:** $0.50 - $0.80
**Margins:** 65-82%

**Expected Usage:**
- Small store: 500 try-ons/month = $250-400 MRR
- Medium store: 2,000 try-ons/month = $1,000-1,600 MRR
- Large store: 5,000 try-ons/month = $2,500-4,000 MRR

---

## 12. PRODUCT 3: DIGITAL MIRROR

### Overview

**What is Digital Mirror?**
Full-size, human-height interactive touchscreen display (smart mirror) for physical fashion stores. Customers stand in front of the mirror to see themselves with virtual try-on overlays in real-time.

**Target Customers:**
- Luxury fashion boutiques
- Premium department stores (fitting room integration)
- High-end brand flagships
- Fashion showrooms and exhibitions
- Concept stores and flagship locations

**Value Proposition:**
- Premium in-store experience - answer "How does this LOOK on me?" instantly
- **Dual-mode operation:**
  - **Digital catalog mode:** Browse and try on products from touchscreen
  - **Physical garment mode:** Hold any clothing item in front of mirror for instant virtual try-on
- Reduce fitting room traffic for style browsing (customers still try on for sizing)
- Full-body visual confirmation before entering fitting room
- Collect customer engagement data and analytics
- Instagram-worthy, shareable experience (drives social media buzz)
- **Cloud dashboard integration:** Update product catalog, manage pricing, view analytics remotely
- Real-time garment detection AI for physical products

### User Journey

**For Store:**
1. Purchase Digital Mirror hardware ($10,000-30,000)
2. Sign up on cloud dashboard
3. Schedule professional installation
4. Mirror installed in store (near fitting rooms or at entrance)
5. Configure product catalog via cloud dashboard
6. Track usage, analytics, and pricing in real-time dashboard

**For Customer - Two Usage Modes:**

**Mode 1: Digital Catalog (Browse & Try On)**
1. See full-size Digital Mirror in store
2. Approach mirror and see welcome screen with brand branding
3. Touch screen to start
4. Browse product catalog on mirror interface (updated via cloud dashboard)
5. Select product to try on
6. Stand in front of mirror - high-quality camera activates
7. See themselves with virtual try-on in real-time
8. Take photo, send to phone via QR/email, or continue browsing

**Mode 2: Physical Garment (Instant Try-On)**
1. Customer picks up any physical garment from the store
2. Holds garment in front of themselves at the mirror
3. Mirror's AI camera automatically detects the garment
4. Real-time virtual try-on shows how it looks on them instantly
5. No touchscreen interaction needed - just hold and see
6. Can compare multiple items quickly
7. Take photo to save/share favorite looks

### Technical Architecture

```
Digital Mirror (Full-Size Smart Display)
        │
        ├─ High-Quality 4K Camera (integrated, top-mounted)
        │  └─ Wide-angle lens, depth sensing capability
        ├─ 55"-75" 4K Touchscreen Display (portrait mode)
        ├─ Embedded High-Performance Computer
        ├─ Built-in Software (Web-based Interface)
        └─ WiFi/Ethernet Connection (cloud-connected)
                │
                ▼
┌──────────────────────────────────────┐
│   Cloud Dashboard & Backend API      │
│   - Product catalog management       │
│   - Try-on generation                │
│   - Real-time analytics              │
│   - Pricing & billing                │
│   - Device management & monitoring   │
│   - Remote configuration             │
└──────────────────────────────────────┘
```

**Key Features:**
- **Cloud-Connected Dashboard:** All analytics, pricing, and product catalog managed via web dashboard
- **Product Management:** Store owners add/remove/update products remotely through dashboard
- **Dual-Mode AI:**
  - **Catalog mode:** Customer selects from pre-configured products on screen
  - **Real-time detection:** AI detects physical garments held in front of mirror
- **Real-Time Monitoring:** Live usage stats, customer interactions tracked on dashboard
- **Remote Management:** Update products, pricing, settings without touching the mirror
- **Embedded Software:** Runs optimized web-based interface on built-in computer
- **Professional Installation:** Mounting, camera calibration, network setup, cloud connection

### Hardware Specifications

**Digital Mirror Components:**

**Display Unit:**
- **Size:** 55" - 75" vertical touchscreen (human-height: 5-6 feet tall)
- **Resolution:** 4K (3840 x 2160) minimum
- **Touch Technology:** Capacitive multi-touch (10+ points)
- **Orientation:** Portrait mode (vertical installation)
- **Brightness:** 400+ nits (suitable for retail lighting)
- **Glass:** Anti-glare, fingerprint-resistant coating

**Built-in Computer:**
- **Option 1 - Intel NUC:** Intel i5/i7, 16GB RAM, 256GB SSD (~$800-1,200)
- **Option 2 - ARM Board:** High-performance ARM SoC (~$300-500)
- **OS:** Linux-based (Ubuntu/Debian) or Windows IoT
- **Software:** Chromium-based kiosk mode running web interface

**High-Quality Camera System:**
- **Resolution:** 4K (3840 x 2160) or 1080p Full HD minimum
- **Sensor:** Large CMOS sensor (1/2.3" or better) for superior image quality
- **Lens:** Wide-angle lens (90°-120° field of view) to capture full body
- **Frame Rate:** 30fps minimum, 60fps preferred for smooth real-time preview
- **Auto-Focus:** Fast, accurate autofocus for sharp images
- **Low-Light Performance:** Excellent performance in retail lighting conditions
- **Image Processing:** Built-in ISP (Image Signal Processor) for color accuracy
- **Mounting:** Seamlessly integrated into top bezel of mirror frame
- **Calibration:** Pre-calibrated for optimal try-on accuracy
- **Camera Options:**
  - Standard: Logitech Brio 4K (~$200) or equivalent
  - Premium: Intel RealSense D435/D455 (~$300-400) - adds depth sensing
  - Professional: Custom RGB-D camera module (~$500-800) for best results

**Connectivity:**
- **Network:** WiFi 6 + Gigabit Ethernet (redundant)
- **Ports:** USB-C, HDMI, Ethernet
- **Power:** AC adapter with UPS backup (optional)

**Enclosure & Mounting:**
- **Frame:** Custom branded bezel with Try Instant Fit branding
- **Mounting:** Wall-mount bracket or floor stand
- **Security:** Lockable enclosure, tamper-resistant
- **Cable Management:** Concealed wiring

**Hardware Options:**

**Option 1: Standard Configuration (55")**
- 55" 4K touchscreen display: $2,500
- Intel NUC i5 computer: $1,000
- **High-quality 4K camera (Logitech Brio):** $300
- Custom frame & mounting: $1,500
- **Total: ~$5,300**
- **Final Price to Customer: $10,000-12,000**

**Option 2: Premium Configuration (65")**
- 65" 4K touchscreen display: $4,500
- Intel NUC i7 computer: $1,500
- **Professional depth camera (Intel RealSense):** $400
- Premium custom frame & mounting: $2,500
- **Total: ~$8,900**
- **Final Price to Customer: $15,000-18,000**

**Option 3: Flagship Configuration (75")**
- 75" 4K touchscreen display: $8,000
- High-performance computer (i7/32GB): $2,000
- **Professional RGB-D camera system:** $800
- Premium branded enclosure with lighting: $4,500
- **Total: ~$15,300**
- **Final Price to Customer: $25,000-30,000**

**Additional Costs:**
- Professional installation: $1,000-2,000
- Shipping & handling: $500-1,000
- Extended warranty (3 years): $1,000-2,000

**Total Hardware Cost:** $10,000 - $30,000 (customer pays)
**Setup Fee:** $2,000 - $5,000 (our service fee)
**Estimated Markup:** 30-40% on hardware

### Software Implementation

**Embedded Software Architecture:**

The Digital Mirror runs a web-based application in kiosk mode on the built-in computer. All configuration, product catalog, and analytics are managed through the cloud dashboard.

**Cloud Dashboard Features (Web-Based Management):**

**Product Catalog Management:**
- Add new products with images, names, prices remotely
- Remove or hide products from mirror display
- Update product information, images, pricing in real-time
- Organize products by category (tops, bottoms, dresses, etc.)
- Sync instantly to all connected Digital Mirrors
- Bulk import from existing e-commerce catalog

**Analytics & Monitoring:**
- Real-time usage statistics (try-ons per day/hour)
- Most tried products and customer preferences
- Peak usage times and patterns
- Customer interaction logs and session data
- Conversion tracking (try-on → purchase)

**Device Management:**
- Device health monitoring (uptime, connectivity status)
- Remote software updates and configuration
- Camera calibration and quality checks
- Display brightness and settings control
- Multiple mirror locations managed from one dashboard

**Pricing & Billing:**
- Configure per-try-on pricing
- View usage-based billing in real-time
- Monthly reports and invoices
- Cost tracking and ROI analytics

#### Mirror Software Structure

```
digital-mirror-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Welcome/idle screen
│   ├── setup/
│   │   └── page.tsx          # Initial device setup (one-time)
│   ├── catalog/
│   │   └── page.tsx          # Product catalog (full-screen grid)
│   └── tryon/
│       └── [productId]/
│           └── page.tsx      # Live try-on interface
├── components/
│   ├── WelcomeScreen.tsx     # Branded idle screen
│   ├── ProductGrid.tsx       # Touch-optimized product browser
│   ├── LiveCamera.tsx        # Real-time camera feed
│   ├── TryOnOverlay.tsx      # Virtual try-on overlay
│   └── ShareOptions.tsx      # QR code/email sharing
├── lib/
│   ├── device-manager.ts     # Heartbeat, cloud sync
│   ├── cloud-sync.ts         # Dashboard API integration
│   ├── offline-cache.ts      # Local product cache
│   └── garment-detection.ts  # AI garment detection for physical mode
└── public/
    └── assets/               # Branding, animations
```

### AI Garment Detection Technology

**Physical Garment Mode Implementation:**

The Digital Mirror includes advanced AI to detect physical garments held in front of the camera, enabling instant try-on without touchscreen interaction.

**How It Works:**

1. **Real-Time Video Processing:**
   - Camera continuously captures video feed at 30-60fps
   - AI model processes each frame to detect garments
   - Identifies garment type (shirt, dress, pants, etc.)
   - Extracts garment boundaries and visual features

2. **Garment Detection Pipeline:**
   ```typescript
   // lib/garment-detection.ts

   class GarmentDetector {
     private camera: MediaStream;
     private detectionModel: AI.Model; // Pre-trained garment detection

     async detectGarment(videoFrame: ImageData): Promise<Garment | null> {
       // 1. Run object detection to find garment in frame
       const detections = await this.detectionModel.detect(videoFrame);

       // 2. Filter for clothing items
       const garment = detections.find(d =>
         ['shirt', 'dress', 'pants', 'jacket', 'top'].includes(d.class)
       );

       if (!garment) return null;

       // 3. Extract garment image from frame
       const garmentImage = this.cropGarment(videoFrame, garment.bbox);

       // 4. Return garment data for try-on
       return {
         type: garment.class,
         imageData: garmentImage,
         confidence: garment.score,
         boundingBox: garment.bbox
       };
     }

     async startRealTimeDetection() {
       // Continuously detect garments in real-time
       const processFrame = async () => {
         const frame = this.captureFrame();
         const garment = await this.detectGarment(frame);

         if (garment && garment.confidence > 0.7) {
           // Trigger virtual try-on with detected garment
           await this.generateTryOn(garment.imageData);
         }

         requestAnimationFrame(processFrame);
       };

       processFrame();
     }
   }
   ```

3. **Try-On Generation:**
   - Once garment detected with high confidence (>70%)
   - Extract garment image from video frame
   - Send to backend API for virtual try-on generation
   - Display result in real-time on mirror (2-3 second latency)

**Technical Requirements:**

- **Computer Vision Model:** YOLO v8 or similar for real-time object detection
- **Processing Power:** High-performance computer required (i7 recommended)
- **Latency Target:** <3 seconds from garment hold to try-on display
- **Detection Accuracy:** >80% accuracy for common garments
- **Edge Computing:** Runs locally on mirror for privacy and speed

**User Experience:**

- **Seamless:** No touchscreen taps needed
- **Fast:** Hold garment → see try-on in 2-3 seconds
- **Natural:** Compare multiple items quickly by switching garments
- **Fallback:** If detection fails, customer can use catalog mode

---

**Main App (`app/page.tsx`):**

```typescript
// app/page.tsx - Welcome Screen
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomeScreen() {
  const [deviceConfig, setDeviceConfig] = useState(null);
  const [isIdle, setIsIdle] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadDeviceConfig();
    setupIdleTimer();
  }, []);

  const loadDeviceConfig = async () => {
    const deviceId = localStorage.getItem('device_id');

    if (!deviceId) {
      router.push('/setup');
      return;
    }

    const response = await fetch(`/api/devices/${deviceId}`);
    const config = await response.json();
    setDeviceConfig(config);
  };

  const setupIdleTimer = () => {
    let idleTimeout;

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => setIsIdle(true), 60000); // 1 minute
    };

    document.addEventListener('touchstart', resetIdle);
    resetIdle();
  };

  const handleStart = () => {
    router.push('/catalog');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      {isIdle && (
        <div className="text-center animate-pulse">
          <div className="text-white mb-8">
            {deviceConfig?.brand_logo_url && (
              <img
                src={deviceConfig.brand_logo_url}
                alt="Brand Logo"
                className="h-24 mx-auto mb-8"
              />
            )}
            <h1 className="text-5xl font-bold mb-4">
              {deviceConfig?.welcome_message || 'Welcome!'}
            </h1>
            <p className="text-2xl opacity-90">
              Tap anywhere to try on our collection virtually
            </p>
          </div>
        </div>
      )}

      {!isIdle && (
        <button
          onClick={handleStart}
          className="bg-white text-purple-600 px-16 py-8 rounded-3xl text-3xl font-bold shadow-2xl hover:scale-105 transition-transform"
        >
          Start Virtual Try-On →
        </button>
      )}
    </div>
  );
}
```

**Product Catalog (`app/catalog/page.tsx`):**

```typescript
// app/catalog/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const deviceId = localStorage.getItem('device_id');
    const response = await fetch(`/api/devices/${deviceId}/products`);
    const data = await response.json();
    setProducts(data.products);
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'kurta', name: 'Kurtas' },
    { id: 'shirt', name: 'Shirts' },
    { id: 'dress', name: 'Dresses' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Select a Product</h1>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => router.push(`/tryon/${product.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
          >
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {product.product_name}
              </h3>
              {product.price && (
                <p className="text-lg font-bold text-green-600 mt-2">
                  {product.price}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Try-On Interface (`app/tryon/[productId]/page.tsx`):**

```typescript
// app/tryon/[productId]/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';

export default function TryOnPage({
  params
}: {
  params: { productId: string }
}) {
  const [product, setProduct] = useState(null);
  const [step, setStep] = useState<'camera' | 'processing' | 'result'>('camera');
  const [resultImage, setResultImage] = useState('');
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const response = await fetch(`/api/products/${params.productId}`);
    const data = await response.json();
    setProduct(data);
  };

  const handleCapture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setStep('processing');

    try {
      // Convert to blob
      const blob = await fetch(imageSrc).then(r => r.blob());
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

      // Generate try-on
      const formData = new FormData();
      formData.append('person_image', file);
      formData.append('product_url', product.image_url);
      formData.append('product_id', product.id);
      formData.append('brand_id', product.brand_id);
      formData.append('source', 'digital-mirror');

      const response = await fetch('/api/try-on/generate', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResultImage(data.result_image_url);
      setStep('result');

    } catch (error) {
      alert('Failed to generate try-on');
      setStep('camera');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Left: Product Info */}
      <div className="w-1/3 bg-white p-8">
        <button
          onClick={() => router.push('/catalog')}
          className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ← Back to Catalog
        </button>

        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full rounded-lg mb-6"
        />

        <h2 className="text-2xl font-bold mb-2">{product.product_name}</h2>
        {product.price && (
          <p className="text-xl font-bold text-green-600">{product.price}</p>
        )}
      </div>

      {/* Right: Camera/Result */}
      <div className="flex-1 flex items-center justify-center p-8">
        {step === 'camera' && (
          <div className="relative">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: 'user',
                width: 1920,
                height: 1080
              }}
              className="rounded-2xl shadow-2xl"
              style={{ width: '800px', height: '600px' }}
            />

            <button
              onClick={handleCapture}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-purple-600 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:scale-105 transition-transform"
            >
              📸 Try It On
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-24 w-24 border-8 border-white border-t-purple-600 mx-auto mb-8"></div>
            <p className="text-3xl font-bold text-white">
              Creating your virtual try-on...
            </p>
            <p className="text-xl text-gray-300 mt-4">
              This usually takes 3-5 seconds
            </p>
          </div>
        )}

        {step === 'result' && (
          <div className="relative">
            <img
              src={resultImage}
              alt="Try-on result"
              className="rounded-2xl shadow-2xl"
              style={{ maxWidth: '800px', maxHeight: '600px' }}
            />

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={() => setStep('camera')}
                className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform"
              >
                🔄 Try Again
              </button>

              <button
                onClick={() => {
                  // Share functionality (email to customer)
                  alert('Share functionality coming soon!');
                }}
                className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform"
              >
                📱 Share to Phone
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Device Management

**Device Setup Flow:**

1. Brand orders Digital Mirror package
2. We configure tablet with pre-installed app
3. Brand receives tablet + stand
4. Brand places in store and powers on
5. App auto-connects to WiFi/cellular
6. Dashboard shows device online

**Device Heartbeat System:**

```typescript
// lib/device-manager.ts
export class DeviceManager {
  private deviceId: string;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor(deviceId: string) {
    this.deviceId = deviceId;
  }

  startHeartbeat() {
    // Send heartbeat every 60 seconds
    this.heartbeatInterval = setInterval(async () => {
      await fetch('/api/devices/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          device_id: this.deviceId,
          timestamp: new Date().toISOString(),
          status: 'online'
        })
      });
    }, 60000);
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
  }
}
```

### Pricing & Business Model

**Hardware Package:**
- Standard (55"): $10,000 - $15,000
- Premium (65"): $15,000 - $20,000
- Flagship (75"): $25,000 - $30,000
- Includes: Display, computer, camera, installation
- Customer pays upfront or financing available

**Our Service Fees:**
- Setup & Installation: $2,000 - $5,000 (one-time)
- Per Try-On: $0.30 - $0.50 (usage-based via cloud dashboard)
- Hardware Markup: 30-40% of hardware cost

**Software/Cloud Subscription (Optional):**
- Cloud dashboard access: Included
- Analytics & reporting: Included
- Remote management: Included
- Premium support: $200-500/month (optional)

**Margins:**
- Hardware markup: 30-40%
- Per try-on margin: 52-71% ($0.30-0.50 revenue, $0.144 AI cost)
- Total margins: 55-75% blended

**Expected Usage:**
- Luxury boutique: 2,000 try-ons/month = $600-1,000 MRR
- Premium department store: 10,000 try-ons/month = $3,000-5,000 MRR
- Flagship location: 20,000 try-ons/month = $6,000-10,000 MRR

**Total Revenue per Installation:**
- Hardware sale: $10,000-30,000 (one-time)
- Setup fee: $2,000-5,000 (one-time)
- Monthly usage: $600-10,000 MRR
- Lifetime value (24 months): $20,000-250,000

---

# PART 4: OPERATIONS

## 13. DEPLOYMENT STRATEGY

### Infrastructure Overview

**Hosting Provider:** Vercel
- API & Web Apps: Vercel serverless
- Database: Supabase (managed Postgres)
- Storage: Google Cloud Storage
- Cache: Upstash Redis
- CDN: Vercel Edge Network

### Deployment Architecture

```
Production Environment:
├── api.tryinstantfit.com          → Backend API (Next.js)
├── dashboard.tryinstantfit.com    → Brand Dashboard (Next.js)
├── cdn.tryinstantfit.com          → Widget CDN
├── scanwear.tryinstantfit.com     → Scan & Wear Web App (Next.js)
└── mirror.tryinstantfit.com       → Digital Mirror App (Next.js)

Development Environment:
├── api-dev.tryinstantfit.com
├── dashboard-dev.tryinstantfit.com
└── ... (same structure)
```

### Deployment Process

#### Initial Setup

**1. Domain Configuration:**
```bash
# Purchase domain: tryinstantfit.com
# Configure DNS with Cloudflare

# Add Vercel domains:
vercel domains add api.tryinstantfit.com
vercel domains add dashboard.tryinstantfit.com
vercel domains add cdn.tryinstantfit.com
vercel domains add scanwear.tryinstantfit.com
vercel domains add mirror.tryinstantfit.com
```

**2. Environment Variables:**

**Backend API:**
```env
# .env.production

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Google AI
GOOGLE_AI_API_KEY=AIza...

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=instantfit-prod
GOOGLE_CLOUD_BUCKET_NAME=instantfit-storage
GOOGLE_CLOUD_CREDENTIALS={"type":"service_account",...}

# Upstash Redis
UPSTASH_REDIS_URL=https://...
UPSTASH_REDIS_TOKEN=...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.tryinstantfit.com
```

**3. Database Setup:**

```bash
# Create Supabase project
# Run migration scripts

# Connect to Supabase:
psql postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres

# Run schema creation:
\i database-schema.sql
```

**4. Google Cloud Storage:**

```bash
# Create GCP project
gcloud projects create instantfit-prod

# Enable APIs
gcloud services enable storage-api.googleapis.com

# Create bucket
gsutil mb -p instantfit-prod -c STANDARD -l asia-south1 gs://instantfit-storage

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://instantfit-storage

# Set CORS
cat > cors.json <<EOF
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set cors.json gs://instantfit-storage

# Create service account
gcloud iam service-accounts create instantfit-storage \
  --display-name="Instant Fit Storage"

# Grant permissions
gsutil iam ch serviceAccount:instantfit-storage@instantfit-prod.iam.gserviceaccount.com:objectAdmin \
  gs://instantfit-storage

# Generate key
gcloud iam service-accounts keys create credentials.json \
  --iam-account=instantfit-storage@instantfit-prod.iam.gserviceaccount.com
```

#### Continuous Deployment

**GitHub Actions Workflow:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Deploy API
        run: |
          cd backend
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_API_PROJECT_ID }}

      - name: Deploy Dashboard
        run: |
          cd dashboard
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_DASHBOARD_PROJECT_ID }}

      # Similar for other deployments...
```

### Rollback Strategy

**Instant Rollback:**
```bash
# Vercel maintains deployment history
# Rollback to previous deployment:
vercel rollback
```

**Database Migrations:**
```sql
-- Always use reversible migrations
-- Example:

-- Migration up:
ALTER TABLE brands ADD COLUMN new_feature TEXT;

-- Migration down:
ALTER TABLE brands DROP COLUMN new_feature;
```

---

## 14. SECURITY & COMPLIANCE

### Security Architecture

#### 1. Authentication & Authorization

**Supabase Auth:**
- JWT-based authentication
- Row-level security (RLS)
- Magic link email authentication
- Social auth (Google, Facebook) - optional

**API Security:**
```typescript
// Middleware for API routes
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Verify authentication
  const { data: { session } } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.startsWith('/api/protected')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return res;
}
```

#### 2. Rate Limiting

**Implementation:**
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

// Different limits for different endpoints
export const tryonRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 try-ons per minute
  analytics: true
});

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 API calls per minute
  analytics: true
});

// Usage:
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await tryonRateLimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  // Continue processing...
}
```

#### 3. Input Validation

**Image Validation:**
```typescript
// lib/image-validation.ts
import sharp from 'sharp';

export async function validateImage(buffer: Buffer): Promise<{
  valid: boolean;
  error?: string;
}> {
  try {
    const metadata = await sharp(buffer).metadata();

    // Check format
    if (!['jpeg', 'png', 'webp'].includes(metadata.format || '')) {
      return { valid: false, error: 'Invalid image format' };
    }

    // Check dimensions
    if (!metadata.width || !metadata.height) {
      return { valid: false, error: 'Invalid image dimensions' };
    }

    if (metadata.width > 4096 || metadata.height > 4096) {
      return { valid: false, error: 'Image too large (max 4096x4096)' };
    }

    if (metadata.width < 200 || metadata.height < 200) {
      return { valid: false, error: 'Image too small (min 200x200)' };
    }

    // Check file size
    if (buffer.length > 10 * 1024 * 1024) {
      return { valid: false, error: 'File size too large (max 10MB)' };
    }

    return { valid: true };

  } catch (error) {
    return { valid: false, error: 'Failed to validate image' };
  }
}
```

#### 4. Data Privacy

**GDPR Compliance:**
- User consent for data processing
- Right to be forgotten (delete user data)
- Data export functionality
- Clear privacy policy

**Image Retention Policy:**
```typescript
// Automatic cleanup of uploaded images after 7 days
// Scheduled job (runs daily):

export async function cleanupOldImages() {
  const supabase = createClient();

  // Get try-ons older than 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: oldTryons } = await supabase
    .from('tryons')
    .select('id, person_image_url')
    .lt('created_at', sevenDaysAgo.toISOString());

  if (!oldTryons) return;

  // Delete images from storage
  for (const tryon of oldTryons) {
    if (tryon.person_image_url) {
      // Delete from Google Cloud Storage
      await deleteFromStorage(tryon.person_image_url);

      // Remove URL from database
      await supabase
        .from('tryons')
        .update({ person_image_url: null })
        .eq('id', tryon.id);
    }
  }
}
```

#### 5. API Security Best Practices

**CORS Configuration:**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow widget to be loaded from any domain
  if (request.nextUrl.pathname.startsWith('/widget/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  }

  // Restrict API to authenticated requests
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Validation happens in route handlers
  }

  return response;
}
```

**SQL Injection Prevention:**
```typescript
// Always use parameterized queries via Supabase client
// NEVER construct raw SQL with user input

// ✅ SAFE:
await supabase
  .from('brands')
  .select('*')
  .eq('id', brandId);

// ❌ UNSAFE:
// await supabase.rpc('raw_sql', { query: `SELECT * FROM brands WHERE id = '${brandId}'` })
```

### Security Monitoring

**Sentry Integration:**
```typescript
// sentry.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,

  // Capture errors and performance
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],

  // Filter sensitive data
  beforeSend(event) {
    // Remove sensitive fields
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  }
});
```

---

## 15. TESTING & QA

### Testing Strategy

#### 1. Unit Testing

**Framework:** Vitest + React Testing Library

```typescript
// __tests__/lib/image-validation.test.ts
import { describe, it, expect } from 'vitest';
import { validateImage } from '@/lib/image-validation';
import sharp from 'sharp';

describe('Image Validation', () => {
  it('should accept valid JPEG image', async () => {
    const buffer = await sharp({
      create: {
        width: 1000,
        height: 1000,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    })
    .jpeg()
    .toBuffer();

    const result = await validateImage(buffer);
    expect(result.valid).toBe(true);
  });

  it('should reject oversized image', async () => {
    const buffer = await sharp({
      create: {
        width: 5000,
        height: 5000,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    })
    .jpeg()
    .toBuffer();

    const result = await validateImage(buffer);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('too large');
  });
});
```

#### 2. Integration Testing

**API Route Testing:**
```typescript
// __tests__/api/try-on.test.ts
import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/try-on/generate/route';

describe('Try-On API', () => {
  it('should generate try-on successfully', async () => {
    const formData = new FormData();
    formData.append('person_image', mockImageFile);
    formData.append('product_url', 'https://example.com/product.jpg');
    formData.append('brand_id', 'test-brand-id');
    formData.append('source', 'ghost-layer');

    const request = new Request('http://localhost/api/try-on/generate', {
      method: 'POST',
      body: formData
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.result_image_url).toBeTruthy();
    expect(data.tryon_id).toBeTruthy();
  });

  it('should reject invalid image', async () => {
    const formData = new FormData();
    formData.append('person_image', new Blob(['invalid'], { type: 'text/plain' }));
    formData.append('product_url', 'https://example.com/product.jpg');
    formData.append('brand_id', 'test-brand-id');
    formData.append('source', 'ghost-layer');

    const request = new Request('http://localhost/api/try-on/generate', {
      method: 'POST',
      body: formData
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });
});
```

#### 3. End-to-End Testing

**Framework:** Playwright

```typescript
// e2e/ghost-layer.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Ghost Layer Widget', () => {
  test('should load widget on product page', async ({ page }) => {
    await page.goto('https://test-brand.com/product/123');

    // Wait for widget to load
    const widget = await page.waitForSelector('#ghostlayer-widget-root');
    expect(widget).toBeTruthy();

    // Click try-on button
    const shadowHost = await page.$('#ghostlayer-widget-root');
    const shadowRoot = await shadowHost?.evaluateHandle(el => el.shadowRoot);
    const button = await shadowRoot?.$('.ghostlayer-tryon-btn');

    await button?.click();

    // Verify overlay opens
    const overlay = await shadowRoot?.$('.ghostlayer-overlay');
    expect(overlay).toBeTruthy();
  });

  test('should upload image and generate try-on', async ({ page }) => {
    // Similar test for full workflow
  });
});
```

#### 4. Load Testing

**Tool:** k6

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 10 },  // Ramp up to 10 users
    { duration: '5m', target: 50 },  // Stay at 50 users
    { duration: '2m', target: 100 }, // Peak at 100 users
    { duration: '5m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'], // 95% of requests under 10s
    http_req_failed: ['rate<0.01'],     // Error rate under 1%
  },
};

export default function () {
  // Test try-on generation endpoint
  const formData = {
    person_image: http.file(open('test-person.jpg', 'b'), 'person.jpg'),
    product_url: 'https://example.com/product.jpg',
    brand_id: 'test-brand',
    source: 'ghost-layer',
  };

  const response = http.post(
    'https://api.tryinstantfit.com/api/try-on/generate',
    formData
  );

  check(response, {
    'status is 200': (r) => r.status === 200,
    'has result_image_url': (r) => JSON.parse(r.body).result_image_url !== undefined,
    'processing under 10s': (r) => JSON.parse(r.body).processing_time_ms < 10000,
  });

  sleep(5);
}
```

**Run load test:**
```bash
k6 run load-test.js
```

### QA Checklist

**Pre-Launch Checklist:**

**Ghost Layer:**
- [ ] Widget loads on Shopify test store
- [ ] Widget loads on WooCommerce test store
- [ ] Product detection works on all test stores
- [ ] Try-on generation succeeds (>95% success rate)
- [ ] Results look natural and accurate
- [ ] Widget doesn't conflict with store CSS/JS
- [ ] Mobile responsive
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)

**Scan & Wear:**
- [ ] QR code generation works
- [ ] QR codes scan correctly
- [ ] Mobile web app loads
- [ ] Camera works on iOS and Android
- [ ] Try-on generation succeeds
- [ ] Share functionality works

**Digital Mirror:**
- [ ] Tablet app installs correctly
- [ ] Welcome screen displays properly
- [ ] Product catalog loads
- [ ] Camera permissions granted
- [ ] Try-on generation succeeds
- [ ] Results display correctly
- [ ] Idle timeout works

**Backend:**
- [ ] All API endpoints respond correctly
- [ ] Rate limiting works
- [ ] Image validation works
- [ ] Error handling works
- [ ] Database queries optimized
- [ ] Analytics tracking works

**Dashboard:**
- [ ] Brand signup works
- [ ] Login works
- [ ] Configuration save works
- [ ] Analytics display correctly
- [ ] Billing calculations correct
- [ ] QR code generation works

---

## 16. MONITORING & ANALYTICS

### Application Monitoring

**Vercel Analytics:**
- Automatic performance monitoring
- Real User Monitoring (RUM)
- Web Vitals tracking
- Error rates

**Sentry Error Tracking:**
```typescript
// Track custom errors
try {
  await generateTryOn(image);
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      product: 'ghost-layer',
      brand_id: brandId
    },
    extra: {
      product_id: productId,
      model_used: 'gemini-3-pro'
    }
  });
}
```

### Business Analytics

**PostHog Integration:**
```typescript
// lib/analytics.ts
import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: 'https://app.posthog.com',
  autocapture: false // Manual tracking only
});

export const analytics = {
  track: (event: string, properties?: object) => {
    posthog.capture(event, properties);
  },

  identify: (userId: string, traits?: object) => {
    posthog.identify(userId, traits);
  }
};

// Usage:
analytics.track('tryon_generated', {
  product: 'ghost-layer',
  brand_id: brandId,
  processing_time_ms: 3500,
  model_used: 'gemini-3-pro'
});
```

**Key Metrics to Track:**

**Product Metrics:**
```typescript
// Try-on metrics
- Total try-ons generated
- Try-ons by product (Ghost Layer, Scan & Wear, Digital Mirror)
- Success rate
- Error rate
- Average processing time
- AI model usage (primary vs fallback)

// User engagement
- Try-on completion rate
- Image upload method (camera vs upload)
- Download rate
- Share rate

// Business metrics
- Active brands
- MRR (Monthly Recurring Revenue)
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Churn rate
```

### Alerting

**Critical Alerts:**
```typescript
// Set up alerts for:
1. API error rate > 5%
2. Try-on success rate < 90%
3. Average processing time > 10s
4. Database connection failures
5. Storage quota exceeded
6. API cost spike (>$100/day unexpected)
```

**Slack Integration:**
```typescript
// Send alerts to Slack
async function sendAlert(message: string) {
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: message,
      channel: '#alerts'
    })
  });
}

// Usage:
if (errorRate > 0.05) {
  await sendAlert(`⚠️ High error rate detected: ${errorRate * 100}%`);
}
```

---

# PART 5: EXECUTION

## 17. DEVELOPMENT ROADMAP

### MVP Development (Weeks 1-4)

**Week 1: Foundation**
- [x] Set up repositories (GitHub)
- [ ] Set up Vercel projects
- [ ] Set up Supabase database
- [ ] Set up Google Cloud Storage
- [ ] Create database schema
- [ ] Set up development environment

**Week 2: Ghost Layer MVP**
- [ ] Build widget SDK (core functionality)
- [ ] Implement product detection
- [ ] Implement try-on generation API
- [ ] Test on Shopify test store
- [ ] Test on WooCommerce test store

**Week 3: Scan & Wear + Digital Mirror MVP**
- [ ] Build Scan & Wear web app
- [ ] Build QR code generation system
- [ ] Build Digital Mirror tablet app
- [ ] Test all 3 products

**Week 4: Dashboard + Polish**
- [ ] Build brand dashboard
- [ ] Implement authentication
- [ ] Implement configuration management
- [ ] Implement basic analytics
- [ ] Bug fixes and polish

### Customer Acquisition (Weeks 5-8)

**Week 5: First Customer**
- [ ] Identify 10 target brands
- [ ] Direct outreach (email, LinkedIn)
- [ ] Pitch deck creation
- [ ] Get first demo scheduled
- [ ] Get first customer signed

**Week 6-7: Scale to 3 Customers**
- [ ] Continue outreach
- [ ] Refine product based on feedback
- [ ] Get 2 more customers signed
- [ ] 1,000+ try-ons generated

**Week 8: Iterate**
- [ ] Collect customer feedback
- [ ] Fix bugs and improve UX
- [ ] Create case study
- [ ] Prepare for scale

### Growth (Months 3-6)

**Month 3: 10 Customers**
- Hire part-time sales person
- Build referral program
- Expand outreach
- Target: 10 customers, $20K MRR

**Month 4-5: 25 Customers**
- Refine product features
- Build content marketing (blog, case studies)
- Attend fashion events
- Target: 25 customers, $50K MRR

**Month 6: 50 Customers + Fundraise**
- Apply to Google for Startups
- Apply to Y Combinator
- Prepare pitch deck
- Start fundraising conversations
- Target: 50 customers, $100K MRR

---

## 18. TEAM STRUCTURE

### Current Team

**Fahad Imdad - CEO & Co-Founder**
- Strategy and vision
- Business development and sales
- Fundraising
- Marketing and brand
- Customer relationships

**Danyal Sandeelo - CTO & Co-Founder**
- Product development
- Technical architecture
- Infrastructure management
- Code quality and reviews
- Technical hiring (future)

### Hiring Plan

**Month 3: Part-Time Sales (Contractor)**
- Role: Lead generation, cold outreach
- Compensation: Commission-based (20% of first 3 months revenue)
- Time commitment: 20 hours/week

**Month 6: Full-Time Salesperson**
- Role: Full-cycle sales
- Compensation: Base $30K/year + commission
- Target: Close 10 brands/month

**Month 9: Customer Success Manager**
- Role: Onboarding, support, retention
- Compensation: $35K/year
- Manage 50+ brand relationships

**Month 12: Junior Developer**
- Role: Feature development, bug fixes
- Compensation: $40K/year
- Report to Danyal

### Advisors Needed

1. **Fashion Retail Expert**
   - Know fashion brand decision-making
   - Intro to brands
   - Pricing strategy validation

2. **AI/ML Expert**
   - Model optimization
   - Cost reduction strategies
   - Quality improvements

3. **Go-to-Market Expert**
   - Sales playbook
   - Marketing strategy
   - Channel partnerships

---

## 19. BUDGET & RESOURCES

### Initial Costs (Month 1)

**Infrastructure:**
```
Vercel (Hobby): $0 (free tier)
Supabase (Free tier): $0
Google Cloud Storage: ~$50/month
Domain (tryinstantfit.com): $12/year
Email (Google Workspace): $6/user/month = $12/month
Tools (Figma, Notion, etc.): $20/month

Total Infrastructure: ~$82/month
```

**Development:**
```
Fahad (CEO): $0 (equity)
Danyal (CTO): $0 (equity)

Total Development: $0/month
```

**First Month Total: ~$82**

### Operating Costs (Months 2-6)

**Fixed Costs:**
```
Infrastructure: $100/month (scales with usage)
Tools & Software: $50/month
Marketing: $200/month (events, ads)

Total Fixed: $350/month
```

**Variable Costs:**
```
Google Gemini API: $0.134 per try-on

Assumptions:
- Month 2: 1,000 try-ons = $134
- Month 3: 5,000 try-ons = $670
- Month 4: 15,000 try-ons = $2,010
- Month 5: 30,000 try-ons = $4,020
- Month 6: 50,000 try-ons = $6,700
```

**Total 6-Month Budget: ~$15,000**

### Revenue Projections

**Conservative Scenario:**

```
Month 1: 0 customers, $0 revenue
Month 2: 1 customer, $1,000 revenue
Month 3: 3 customers, $5,000 revenue
Month 4: 6 customers, $12,000 revenue
Month 5: 10 customers, $20,000 revenue
Month 6: 15 customers, $30,000 revenue

6-Month Total: $68,000 revenue
6-Month Costs: $15,000
6-Month Profit: $53,000
```

**Optimistic Scenario:**

```
Month 1: 0 customers, $0 revenue
Month 2: 2 customers, $3,000 revenue
Month 3: 5 customers, $10,000 revenue
Month 4: 10 customers, $20,000 revenue
Month 5: 20 customers, $40,000 revenue
Month 6: 35 customers, $70,000 revenue

6-Month Total: $143,000 revenue
6-Month Costs: $25,000
6-Month Profit: $118,000
```

### Fundraising Strategy

**Bootstrap First:**
- Self-fund initial development
- Get to $20K MRR before raising
- Validate product-market fit

**Pre-Seed Round (Month 6-9):**
- Target: $200K - $500K
- Valuation: $2M - $3M
- Use: Hiring, marketing, product expansion
- Focus: Google for Startups, Pakistani VCs, angel investors

**Seed Round (Month 12-18):**
- Target: $1M - $2M
- Valuation: $8M - $12M
- Use: Team expansion, international expansion
- Focus: Regional VCs, international VCs

---

## 20. SUCCESS METRICS

### Product Metrics

**Try-On Quality:**
```
✅ Success Rate: >95%
✅ Average Processing Time: <7 seconds
✅ AI Cost per Try-On: <$0.15
✅ User Rating: >4.0/5.0
```

**Technical Performance:**
```
✅ API Uptime: >99.9%
✅ Error Rate: <1%
✅ Widget Load Time: <500ms
✅ P95 Latency: <10s
```

### Business Metrics

**Customer Acquisition:**
```
Month 1: 0 brands
Month 2: 1 brand
Month 3: 3 brands
Month 6: 15 brands
Month 12: 50 brands
```

**Revenue:**
```
Month 3: $5K MRR
Month 6: $30K MRR
Month 12: $100K MRR
```

**Unit Economics:**
```
Average Revenue per Brand: $2,000/month
Customer Acquisition Cost (CAC): <$500
Lifetime Value (LTV): >$24,000 (12 months)
LTV:CAC Ratio: >48:1
Gross Margin: >75%
```

**Customer Success:**
```
Churn Rate: <5% monthly
Net Revenue Retention: >100%
Customer Satisfaction (NPS): >50
```

### Milestones

**Month 1:**
- ✅ MVP complete for all 3 products
- ✅ Tested on 3+ e-commerce platforms

**Month 2:**
- ✅ First paying customer
- ✅ 500+ try-ons generated

**Month 3:**
- ✅ 3 paying customers
- ✅ $5K MRR
- ✅ First case study published

**Month 6:**
- ✅ 15 paying customers
- ✅ $30K MRR
- ✅ Product-market fit validated
- ✅ Fundraising started

**Month 12:**
- ✅ 50 paying customers
- ✅ $100K MRR
- ✅ Pre-seed round closed
- ✅ Team of 5 people
- ✅ Ready for international expansion

---

## APPENDIX A: TECHNICAL REFERENCE

### API Documentation

**Complete API documentation:** See `/docs/API.md`

### Database Schema

**Complete schema:** See Section 8 (Database Schema)

### Deployment Guide

**Step-by-step deployment:** See Section 13 (Deployment Strategy)

---

## APPENDIX B: BUSINESS REFERENCE

### Pitch Deck Outline

1. Problem (Fashion returns cost $550B annually; 30-40% are style/appearance mismatches)
2. Solution (AI-powered virtual try-on showing how products LOOK, not sizing/fit)
3. Product (3-product suite for online, QR codes, and in-store)
4. Market (Pakistan first, then global)
5. Business Model (Setup + usage pricing)
6. Traction (Customers, revenue, growth)
7. Team (Fahad + Danyal)
8. Ask (Fundraising amount + use of funds)

### Competitive Analysis

**Competitors:**
1. IDM-VTON (Technology)
2. Virtooal.com (Similar product)
3. Traditional sizing tools

**Our Advantages:**
- Better AI quality (Gemini 3 Pro)
- 3-product suite (not just online)
- Pakistan focus (less competition)
- Competitive pricing

---

## APPENDIX C: CONTACTS & RESOURCES

### Key Resources

**Development:**
- GitHub: github.com/instant-fit
- Vercel: vercel.com/instant-fit
- Supabase: app.supabase.com/project/instantfit

**Business:**
- Email: hello@tryinstantfit.com
- Dashboard: dashboard.tryinstantfit.com
- Website: tryinstantfit.com (TBD)

### Target Brand Contacts

**Pakistan Fashion Brands:**
1. Khaadi - [contact info TBD]
2. Sapphire - [contact info TBD]
3. Maria.B - [contact info TBD]
... (to be filled during outreach)

---

## DOCUMENT VERSION CONTROL

**Version 1.0** - February 15, 2026
- Initial complete specification
- All 3 products documented
- Ready for development

**Next Updates:**
- Version 1.1: After MVP completion
- Version 1.2: After first customer
- Version 2.0: After fundraise

---

**END OF SPECIFICATION**

This complete specification provides everything needed to:
1. ✅ Build all 3 products (Ghost Layer, Scan & Wear, Digital Mirror)
2. ✅ Deploy to production
3. ✅ Acquire customers
4. ✅ Scale the business
5. ✅ Raise funding

**Next Steps:**
1. Danyal: Start with Ghost Layer MVP (Week 1-2)
2. Fahad: Identify first 10 target brands
3. Both: Weekly sync on progress
4. Target: First customer by Week 5

Good luck! 🚀
