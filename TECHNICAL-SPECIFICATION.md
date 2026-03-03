# VIRTUAL TRY-ON PLATFORM - TECHNICAL SPECIFICATION

**Project:** Virtual Try-On for Fashion Retail
**Lead Developer:** Danyal Sandeelo
**Strategic Lead:** Fahad Imdad
**Document Version:** 1.0
**Last Updated:** February 15, 2026

---

## TABLE OF CONTENTS

1. [Executive Overview](#executive-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Phase 1: MVP (Minimal Viable Product)](#phase-1-mvp)
5. [Phase 2: Production Version](#phase-2-production)
6. [API Integration Guide](#api-integration)
7. [Database Schema](#database-schema)
8. [Security & Best Practices](#security)
9. [Deployment Guide](#deployment)
10. [Testing Strategy](#testing)
11. [Cost Optimization](#cost-optimization)
12. [Monitoring & Analytics](#monitoring)

---

## 1. EXECUTIVE OVERVIEW

### What We're Building

A virtual try-on platform that allows fashion retailers to offer AI-powered virtual fitting to their customers.

**Three Products:**
1. **Ghost Layer** - Website widget for e-commerce (MVP)
2. **Scan & Wear** - QR code system for in-store (Phase 2)
3. **Digital Mirror** - Hardware smart mirror (Phase 3)

**Start with:** Ghost Layer MVP

---

## 2. TECHNOLOGY STACK

### Frontend
```
- Framework: Next.js 14+ (React)
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: Zustand (lightweight)
- UI Components: shadcn/ui
- Image Upload: react-dropzone
- Image Preview: react-image-crop
```

### Backend
```
- Runtime: Node.js 20+
- Framework: Next.js API Routes (serverless)
- AI Model: Google Gemini 3 Pro Image Preview
- Database: PostgreSQL (Supabase)
- File Storage: Google Cloud Storage
- Caching: Redis (Upstash)
- Queue: BullMQ (for async processing)
```

### Infrastructure
```
- Hosting: Vercel (frontend + API routes)
- Database: Supabase (free tier → paid)
- Storage: Google Cloud Storage
- CDN: Vercel Edge Network
- Monitoring: Vercel Analytics + Sentry
- Email: Resend
```

### AI/ML
```
- Primary Model: gemini-3-pro-image-preview
- Fallback Model: gemini-2.5-flash-image
- SDK: @google/generative-ai
```

---

## 3. SYSTEM ARCHITECTURE

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT (Browser)                    │
│  ┌──────────────────────────────────────────────┐   │
│  │         Next.js Frontend App                  │   │
│  │  - Image Upload UI                            │   │
│  │  - Try-On Preview                             │   │
│  │  - Social Share                               │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────┘
                  │ HTTPS/REST
                  ▼
┌─────────────────────────────────────────────────────┐
│              VERCEL (Edge Network)                   │
│  ┌──────────────────────────────────────────────┐   │
│  │         Next.js API Routes                    │   │
│  │  - /api/upload                                │   │
│  │  - /api/try-on                                │   │
│  │  - /api/webhook                               │   │
│  └──────────────────────────────────────────────┘   │
└─────┬───────────────┬────────────────┬──────────────┘
      │               │                │
      ▼               ▼                ▼
┌──────────┐  ┌─────────────┐  ┌──────────────┐
│ Google   │  │  Supabase   │  │   Upstash    │
│ Gemini   │  │ (Postgres)  │  │   (Redis)    │
│ API      │  │             │  │              │
└──────────┘  └─────────────┘  └──────────────┘
```

---

## 4. PHASE 1: MVP (MINIMAL VIABLE PRODUCT)

### MVP Scope (Build in 2 weeks)

**Goal:** Single-page demo that fashion brands can test

**Features:**
1. Upload person photo
2. Upload garment photo
3. Generate virtual try-on
4. Download result
5. Simple analytics

**NOT in MVP:**
- User accounts
- Payment processing
- Widget embed code
- GTM integration
- Social sharing
- Admin dashboard

**Why:** Get customer feedback FIRST, then build features they actually want.

---

### MVP Implementation Guide

#### Step 1: Project Setup (Day 1)

```bash
# Create Next.js project
npx create-next-app@latest virtual-tryon --typescript --tailwind --app

cd virtual-tryon

# Install dependencies
npm install @google/generative-ai
npm install @supabase/supabase-js
npm install react-dropzone
npm install zustand
npm install sharp
npm install date-fns
npm install lucide-react

# Install dev dependencies
npm install -D @types/node
```

#### Step 2: Environment Variables

Create `.env.local`:

```bash
# Google AI
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

#### Step 3: Project Structure

```
virtual-tryon/
├── app/
│   ├── page.tsx                 # Main try-on page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── api/
│       ├── upload/
│       │   └── route.ts         # Image upload endpoint
│       └── try-on/
│           └── route.ts         # Virtual try-on endpoint
├── components/
│   ├── ImageUpload.tsx          # Drag-drop upload
│   ├── TryOnPreview.tsx         # Result display
│   ├── LoadingSpinner.tsx       # Loading state
│   └── ErrorMessage.tsx         # Error handling
├── lib/
│   ├── gemini.ts                # Gemini API wrapper
│   ├── supabase.ts              # Database client
│   ├── storage.ts               # Cloud storage
│   └── utils.ts                 # Helper functions
├── types/
│   └── index.ts                 # TypeScript types
├── public/
│   └── images/
└── .env.local
```

---

### Core Implementation

#### 1. Gemini API Integration (`lib/gemini.ts`)

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

interface TryOnInput {
  personImage: string;  // base64 or buffer
  garmentImage: string; // base64 or buffer
}

interface TryOnResult {
  imageUrl: string;
  success: boolean;
  model: string;
  processingTime: number;
  error?: string;
}

export async function generateVirtualTryOn(
  input: TryOnInput
): Promise<TryOnResult> {
  const startTime = Date.now();

  const prompt = `
INSTRUCTIONS FOR AI TAILOR:
1. Look at the FIRST IMAGE (the Person). This is the model who will be wearing the clothes.
2. Look at the SECOND IMAGE (the Garment). This is the exact piece of clothing to be applied.

TRANSFORMATION STEPS:
- PERFORM A GARMENT TRANSFER: Remove the existing clothing from the Person in the first image.
- APPLY THE NEW GARMENT: Dress the Person in the EXACT garment shown in the second image.
- PRESERVE IDENTITY: Do not change the person's face, hair, skin tone, or body proportions.
- PRESERVE ENVIRONMENT: Keep the background, lighting, and camera angle identical to the first image.
- REALISM: Ensure the fabric folds, shadows, and textures look 100% natural as if they were worn in the original photo.

Output ONLY the transformed image.
  `.trim();

  try {
    // Try gemini-3-pro-image-preview first (best quality)
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-pro-image-preview'
    });

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: input.personImage,
          mimeType: 'image/jpeg'
        }
      },
      {
        inlineData: {
          data: input.garmentImage,
          mimeType: 'image/jpeg'
        }
      }
    ]);

    const response = await result.response;
    const imageData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;

    if (!imageData) {
      throw new Error('No image generated');
    }

    const processingTime = Date.now() - startTime;

    return {
      imageUrl: `data:${imageData.mimeType};base64,${imageData.data}`,
      success: true,
      model: 'gemini-3-pro-image-preview',
      processingTime
    };

  } catch (error) {
    console.error('Gemini 3 Pro failed, trying fallback...', error);

    // Fallback to gemini-2.5-flash-image
    try {
      const fallbackModel = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-image'
      });

      const result = await fallbackModel.generateContent([
        prompt,
        {
          inlineData: {
            data: input.personImage,
            mimeType: 'image/jpeg'
          }
        },
        {
          inlineData: {
            data: input.garmentImage,
            mimeType: 'image/jpeg'
          }
        }
      ]);

      const response = await result.response;
      const imageData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;

      if (!imageData) {
        throw new Error('No image generated from fallback');
      }

      const processingTime = Date.now() - startTime;

      return {
        imageUrl: `data:${imageData.mimeType};base64,${imageData.data}`,
        success: true,
        model: 'gemini-2.5-flash-image',
        processingTime
      };

    } catch (fallbackError) {
      const processingTime = Date.now() - startTime;

      return {
        imageUrl: '',
        success: false,
        model: 'none',
        processingTime,
        error: fallbackError instanceof Error ? fallbackError.message : 'Unknown error'
      };
    }
  }
}

// Helper: Convert File to base64
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

// Helper: Validate image
export function validateImage(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be less than 10MB' };
  }

  return { valid: true };
}
```

#### 2. API Route - Try-On Generation (`app/api/try-on/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { generateVirtualTryOn, fileToBase64, validateImage } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const personFile = formData.get('person') as File;
    const garmentFile = formData.get('garment') as File;

    // Validate inputs
    if (!personFile || !garmentFile) {
      return NextResponse.json(
        { error: 'Both person and garment images are required' },
        { status: 400 }
      );
    }

    // Validate image files
    const personValidation = validateImage(personFile);
    if (!personValidation.valid) {
      return NextResponse.json(
        { error: `Person image: ${personValidation.error}` },
        { status: 400 }
      );
    }

    const garmentValidation = validateImage(garmentFile);
    if (!garmentValidation.valid) {
      return NextResponse.json(
        { error: `Garment image: ${garmentValidation.error}` },
        { status: 400 }
      );
    }

    // Convert to base64
    const personBase64 = await fileToBase64(personFile);
    const garmentBase64 = await fileToBase64(garmentFile);

    // Generate virtual try-on
    const result = await generateVirtualTryOn({
      personImage: personBase64,
      garmentImage: garmentBase64
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to generate try-on' },
        { status: 500 }
      );
    }

    // Return result
    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      model: result.model,
      processingTime: result.processingTime
    });

  } catch (error) {
    console.error('Try-on API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Enable CORS for testing
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

#### 3. Main Page UI (`app/page.tsx`)

```typescript
'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import TryOnPreview from '@/components/TryOnPreview';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const [modelUsed, setModelUsed] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!personImage || !garmentImage) {
      setError('Please upload both person and garment images');
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const formData = new FormData();
      formData.append('person', personImage);
      formData.append('garment', garmentImage);

      const response = await fetch('/api/try-on', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate try-on');
      }

      setResultImage(data.imageUrl);
      setProcessingTime(data.processingTime);
      setModelUsed(data.model);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPersonImage(null);
    setGarmentImage(null);
    setResultImage(null);
    setError(null);
    setProcessingTime(null);
    setModelUsed(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Virtual Try-On Demo
          </h1>
          <p className="text-xl text-slate-600">
            Upload your photo and a garment to see yourself wearing it
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!resultImage ? (
            <>
              {/* Upload Section */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <ImageUpload
                  label="1. Upload Your Photo"
                  onImageSelect={setPersonImage}
                  selectedImage={personImage}
                  accept="image/*"
                  placeholder="Drop your photo here or click to upload"
                />
                <ImageUpload
                  label="2. Upload Garment"
                  onImageSelect={setGarmentImage}
                  selectedImage={garmentImage}
                  accept="image/*"
                  placeholder="Drop garment image here or click to upload"
                />
              </div>

              {/* Error Display */}
              {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={handleGenerate}
                  disabled={!personImage || !garmentImage || loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-4 px-12 rounded-xl text-lg transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <LoadingSpinner />
                      Generating Virtual Try-On...
                    </span>
                  ) : (
                    '3. Generate Virtual Try-On'
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Result Display */}
              <TryOnPreview
                personImage={URL.createObjectURL(personImage!)}
                garmentImage={URL.createObjectURL(garmentImage!)}
                resultImage={resultImage}
                processingTime={processingTime}
                modelUsed={modelUsed}
              />

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center mt-8">
                <button
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
                >
                  Try Another
                </button>
                <a
                  href={resultImage}
                  download="virtual-tryon-result.png"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
                >
                  Download Result
                </a>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-600">
          <p>Powered by Google Gemini 3 Pro Image Preview</p>
          <p className="text-sm mt-2">© 2026 Virtual Try-On Platform</p>
        </div>
      </div>
    </main>
  );
}
```

#### 4. Image Upload Component (`components/ImageUpload.tsx`)

```typescript
'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  label: string;
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
  accept?: string;
  placeholder?: string;
}

export default function ImageUpload({
  label,
  onImageSelect,
  selectedImage,
  accept = 'image/*',
  placeholder = 'Drop image here'
}: ImageUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageSelect(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-lg font-semibold text-slate-700">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8
          transition-all cursor-pointer
          ${isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50'
          }
          ${selectedImage ? 'h-96' : 'h-64'}
        `}
      >
        <input {...getInputProps()} />

        {selectedImage ? (
          <div className="relative h-full">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              fill
              className="object-contain rounded-lg"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Upload className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-slate-600 font-medium mb-2">{placeholder}</p>
            <p className="text-sm text-slate-500">
              JPEG, PNG, WebP (Max 10MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

#### 5. Result Preview Component (`components/TryOnPreview.tsx`)

```typescript
import Image from 'next/image';

interface TryOnPreviewProps {
  personImage: string;
  garmentImage: string;
  resultImage: string;
  processingTime: number | null;
  modelUsed: string | null;
}

export default function TryOnPreview({
  personImage,
  garmentImage,
  resultImage,
  processingTime,
  modelUsed
}: TryOnPreviewProps) {
  return (
    <div>
      {/* Before/After Comparison */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="text-center font-semibold text-slate-700 mb-3">Original Photo</h3>
          <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src={personImage}
              alt="Original"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div>
          <h3 className="text-center font-semibold text-slate-700 mb-3">Garment</h3>
          <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src={garmentImage}
              alt="Garment"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div>
          <h3 className="text-center font-semibold text-slate-700 mb-3">Virtual Try-On Result</h3>
          <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden ring-4 ring-green-500">
            <Image
              src={resultImage}
              alt="Result"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Metadata */}
      {(processingTime || modelUsed) && (
        <div className="flex gap-6 justify-center text-sm text-slate-600">
          {processingTime && (
            <div className="bg-slate-100 px-4 py-2 rounded-lg">
              ⚡ Generated in <strong>{(processingTime / 1000).toFixed(2)}s</strong>
            </div>
          )}
          {modelUsed && (
            <div className="bg-slate-100 px-4 py-2 rounded-lg">
              🤖 Model: <strong>{modelUsed}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 5. DEPLOYMENT GUIDE

### Deploy to Vercel (5 Minutes)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod

# 4. Add environment variables in Vercel dashboard:
# - GOOGLE_AI_API_KEY
# - NEXT_PUBLIC_SUPABASE_URL
# - etc.
```

### Custom Domain Setup

```bash
# In Vercel dashboard:
# 1. Go to your project
# 2. Settings → Domains
# 3. Add your domain (when you buy one)
# 4. Update DNS records
# 5. SSL auto-configured
```

---

## 6. TESTING STRATEGY

### Manual Testing Checklist

```
[ ] Upload person image (JPEG)
[ ] Upload person image (PNG)
[ ] Upload person image (WebP)
[ ] Upload garment image
[ ] Generate try-on
[ ] Verify result quality
[ ] Download result
[ ] Try again with different images
[ ] Test on mobile
[ ] Test on tablet
[ ] Test on desktop
[ ] Test with slow connection
[ ] Test with large images (10MB)
[ ] Test error handling (invalid files)
[ ] Test error handling (API failure)
```

### Load Testing

```bash
# Use Artillery for load testing
npm install -g artillery

# Create artillery.yml
artillery quick --count 10 --num 2 https://your-app.vercel.app/api/try-on
```

---

## 7. COST OPTIMIZATION

### Current Costs (gemini-3-pro-image-preview)

```
Per 1,000 try-ons:
- AI costs: $134 (0.134 × 1000)
- Vercel: $0 (hobby) or $20/month (pro)
- Supabase: $0 (free tier) or $25/month
- Total: ~$134-179 per 1,000 try-ons

Revenue per 1,000 try-ons: $800-1,200
Profit: $621-1,066 per 1,000 try-ons
Margin: 77-89%
```

### Optimization Strategies

1. **Image Compression**
```typescript
// Compress before sending to API
import sharp from 'sharp';

async function compressImage(file: File): Promise<Buffer> {
  const buffer = await file.arrayBuffer();
  return await sharp(Buffer.from(buffer))
    .resize(1024, 1024, { fit: 'inside' })
    .jpeg({ quality: 85 })
    .toBuffer();
}
```

2. **Caching Results**
```typescript
// Cache identical requests for 24 hours
import { createHash } from 'crypto';

function getCacheKey(personHash: string, garmentHash: string): string {
  return createHash('md5')
    .update(`${personHash}-${garmentHash}`)
    .digest('hex');
}
```

3. **Batch Processing**
```typescript
// Queue non-urgent requests
// Process during off-peak hours
// Use Batch API for 50% discount
```

---

## 8. MONITORING & ANALYTICS

### Key Metrics to Track

```typescript
// Track in database
interface TryOnEvent {
  id: string;
  timestamp: Date;
  model_used: string;
  processing_time: number;
  success: boolean;
  error?: string;
  user_agent: string;
  ip_hash: string;
}

// Dashboard metrics:
- Total try-ons generated
- Success rate
- Average processing time
- Model usage (3-pro vs 2.5-flash)
- Error rate by type
- Cost per try-on
- Daily active users
```

---

## 9. SECURITY CHECKLIST

```
[ ] Environment variables secured
[ ] API routes have rate limiting
[ ] File upload validation
[ ] File size limits enforced (10MB)
[ ] CORS configured properly
[ ] No sensitive data in client
[ ] HTTPS only
[ ] Input sanitization
[ ] Error messages don't leak info
[ ] Logging configured (no PII)
```

---

## 10. PHASE 2: PRODUCTION VERSION

**After MVP validation, add:**

1. **User Accounts**
   - Supabase Auth
   - Customer dashboard
   - Usage analytics

2. **Payment Integration**
   - Stripe integration
   - Usage-based billing
   - Invoice generation

3. **Widget Embed**
   - GTM integration code
   - Customizable widget
   - Brand customization

4. **Admin Dashboard**
   - Customer management
   - Analytics
   - API key management

5. **Advanced Features**
   - Batch uploads
   - Social sharing
   - Multiple try-ons
   - Save favorites

---

## 11. TIMELINE

### Week 1: MVP Build
- Day 1-2: Setup + API integration
- Day 3-4: UI components
- Day 5: Testing + fixes
- Day 6-7: Deploy + polish

### Week 2: Customer Validation
- Day 1-3: Show to 10 brands
- Day 4-5: Collect feedback
- Day 6-7: Iterate based on feedback

### Week 3-4: Production Build
- If validated: Build Phase 2 features
- If not: Pivot based on feedback

---

## 12. SUPPORT & RESOURCES

### Documentation
- Next.js: https://nextjs.org/docs
- Gemini API: https://ai.google.dev/gemini-api/docs
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs

### Getting Help
- Fahad (Strategy): fahad@email.com
- Stack Overflow: next.js, gemini-api tags
- Gemini API Discord: (if exists)

---

## APPENDIX A: COMPLETE CODE REPOSITORY STRUCTURE

```
virtual-tryon/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── try-on/
│           └── route.ts
├── components/
│   ├── ImageUpload.tsx
│   ├── TryOnPreview.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── lib/
│   ├── gemini.ts
│   ├── supabase.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── public/
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

---

## APPENDIX B: ERROR HANDLING GUIDE

```typescript
// Common errors and solutions

// 1. Rate Limit Error
// Solution: Implement exponential backoff

// 2. Timeout Error
// Solution: Increase timeout, use fallback model

// 3. Invalid Image Error
// Solution: Better validation, image preprocessing

// 4. Out of Memory
// Solution: Compress images, reduce resolution

// 5. API Key Invalid
// Solution: Check environment variables
```

---

## CONCLUSION

This specification provides everything needed to build the MVP virtual try-on platform in 2 weeks.

**Next Steps for Danyal:**
1. Read this entire document
2. Set up development environment
3. Start with Step 1 (Project Setup)
4. Build incrementally
5. Test continuously
6. Deploy to Vercel
7. Share demo link with Fahad

**Success Criteria:**
- ✅ MVP deployed and accessible
- ✅ Can upload 2 images
- ✅ Generates virtual try-on in <10 seconds
- ✅ Quality good enough for customer demos
- ✅ Works on mobile and desktop

---

**Document Owner:** Fahad Imdad
**Implementation Lead:** Danyal Sandeelo
**Questions:** Contact Fahad on WhatsApp

**Good luck building! 🚀**
