# GHOST LAYER - COMPLETE TECHNICAL SPECIFICATION

**Product:** Ghost Layer - Virtual Try-On Widget for E-Commerce
**Lead Developer:** Danyal Sandeelo
**Strategic Lead:** Fahad Imdad
**Document Version:** 2.0
**Last Updated:** February 15, 2026

---

## TABLE OF CONTENTS

1. [Product Overview](#1-product-overview)
2. [System Architecture](#2-system-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Component Breakdown](#4-component-breakdown)
5. [Implementation Guide](#5-implementation-guide)
6. [Widget SDK Development](#6-widget-sdk-development)
7. [Brand Dashboard](#7-brand-dashboard)
8. [Backend API](#8-backend-api)
9. [GTM Integration](#9-gtm-integration)
10. [Deployment Strategy](#10-deployment-strategy)
11. [Testing & QA](#11-testing-qa)
12. [Security & Performance](#12-security-performance)

---

## 1. PRODUCT OVERVIEW

### What is Ghost Layer?

**Ghost Layer** is a JavaScript widget that fashion retailers install on their e-commerce websites via Google Tag Manager. It adds virtual try-on capability to any product page with zero code changes required from the brand.

### User Journey

#### For Fashion Brands (B2B Customer):
```
1. Sign up at ghostlayer.com
2. Get unique GTM code snippet
3. Add code to Google Tag Manager (5 minutes)
4. Publish GTM changes
5. Widget automatically appears on product pages
6. Customize widget appearance in dashboard
7. Track analytics and usage
```

#### For End Customers (B2C User):
```
1. Visit brand's product page (e.g., www.brandx.com/blue-kurta)
2. See "Try It On" button on product image
3. Click button → Widget overlay opens
4. Upload selfie or take photo
5. Wait 3-5 seconds → See virtual try-on
6. Download, share on social, or proceed to buy
```

### Key Features

**For Brands:**
- ✅ 5-minute GTM installation
- ✅ No developer required
- ✅ Works on ANY e-commerce platform (Shopify, WooCommerce, custom)
- ✅ Automatic product detection
- ✅ Customizable widget styling
- ✅ Usage analytics dashboard
- ✅ Pay-per-use pricing

**For End Customers:**
- ✅ Try on products directly on brand's site
- ✅ Upload photo or use camera
- ✅ Realistic virtual try-on in 3-5 seconds
- ✅ Download results
- ✅ Share on social media (with brand watermark)
- ✅ Works on mobile and desktop

---

## 2. SYSTEM ARCHITECTURE

### High-Level Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    BRAND'S WEBSITE                          │
│  (e.g., www.brandx.com/products/blue-kurta)                │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Product Page HTML                                  │    │
│  │  - Product images                                   │    │
│  │  - Product details                                  │    │
│  │  - Buy button                                       │    │
│  └────────────────────────────────────────────────────┘    │
│                          ▲                                   │
│                          │                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Google Tag Manager (GTM)                           │    │
│  │  Loads: ghostlayer-widget.js                        │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │  GHOST LAYER WIDGET (Shadow DOM)                    │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │ "Try It On" Button (injected)                │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │ Widget Overlay (when clicked)                │  │    │
│  │  │ - Camera/Upload interface                    │  │    │
│  │  │ - Try-on result display                      │  │    │
│  │  │ - Share/download options                     │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬─────────────────────────────────────┘
                       │ HTTPS API Calls
                       ▼
┌────────────────────────────────────────────────────────────┐
│              GHOST LAYER BACKEND (Vercel)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Routes                                           │  │
│  │  - POST /api/widget/init (load widget config)        │  │
│  │  - POST /api/detect-product (detect product image)   │  │
│  │  - POST /api/try-on (generate virtual try-on)        │  │
│  │  - POST /api/track (analytics)                       │  │
│  │  - GET  /api/widget/config/:brandId                  │  │
│  └──────────────────────────────────────────────────────┘  │
└───────┬────────────┬────────────┬──────────────────────────┘
        │            │            │
        ▼            ▼            ▼
┌──────────┐  ┌─────────────┐  ┌──────────────┐
│ Google   │  │  Supabase   │  │ Google Cloud │
│ Gemini   │  │ (Postgres)  │  │   Storage    │
│ API      │  │  Database   │  │ (CDN/Images) │
└──────────┘  └─────────────┘  └──────────────┘

┌────────────────────────────────────────────────────────────┐
│         BRAND DASHBOARD (dashboard.ghostlayer.com)          │
│  - Account management                                       │
│  - GTM code snippet                                         │
│  - Widget customization                                     │
│  - Analytics & reporting                                    │
│  - Billing & usage                                          │
└────────────────────────────────────────────────────────────┘
```

### System Components

**1. Widget SDK** (`ghostlayer-widget.js`)
- JavaScript library loaded on brand's site
- Detects product pages
- Injects "Try It On" button
- Handles widget overlay UI
- Communicates with backend API

**2. Backend API** (Next.js on Vercel)
- Authenticates brands
- Detects products from URLs
- Generates virtual try-ons (Gemini API)
- Tracks usage/analytics
- Serves widget configurations

**3. Brand Dashboard** (Next.js app)
- Brand signup/login
- GTM code generation
- Widget customization
- Analytics viewing
- Billing management

**4. Database** (Supabase PostgreSQL)
- Brands table
- Products table
- Try-ons table (usage tracking)
- Widget configurations

**5. Storage** (Google Cloud Storage)
- Uploaded customer photos (temporary)
- Generated try-on images
- Brand assets

---

## 3. TECHNOLOGY STACK

### Widget SDK (Client-Side JavaScript)
```
- Language: TypeScript
- Build: esbuild (for tiny bundle size)
- Bundle size target: <50KB gzipped
- Shadow DOM: For style isolation
- No dependencies: Pure vanilla JS/TS
```

### Backend (Server-Side)
```
- Runtime: Node.js 20+
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- API: REST (Next.js API Routes)
- AI: Google Gemini 3 Pro Image Preview
```

### Brand Dashboard (Web App)
```
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Auth: Supabase Auth
- Charts: Recharts
```

### Database & Storage
```
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Storage: Google Cloud Storage
- Cache: Redis (Upstash)
```

### Infrastructure
```
- Hosting: Vercel
- CDN: Vercel Edge Network
- DNS: Cloudflare
- Monitoring: Vercel Analytics + Sentry
- Email: Resend
```

---

## 4. COMPONENT BREAKDOWN

### 4.1 Widget SDK Architecture

The widget must:
1. Load asynchronously (not block page load)
2. Detect product pages automatically
3. Extract product images
4. Inject "Try It On" button
5. Open overlay when clicked
6. Handle camera/upload
7. Generate try-on
8. Display result
9. Track analytics
10. NOT conflict with brand's site styles/scripts

**Implementation Pattern:**

```typescript
// Widget lifecycle
class GhostLayerWidget {
  private brandId: string;
  private config: WidgetConfig;
  private shadowRoot: ShadowRoot;

  constructor(brandId: string) {
    this.brandId = brandId;
    this.init();
  }

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
    // Detect product page based on:
    // - URL patterns
    // - Page structure
    // - Schema.org Product markup
    // - Common e-commerce patterns
  }

  private detectProduct(): Product {
    // Extract product data:
    // - Product image URLs
    // - Product name
    // - Product ID
    // From: schema.org, OpenGraph, or DOM
  }

  private injectButton(product: Product) {
    // Create shadow DOM
    // Inject styled button
    // Position near product image
  }

  private openOverlay() {
    // Create full-screen overlay
    // Show camera/upload UI
    // Handle try-on generation
  }
}

// Initialize when script loads
(function() {
  const brandId = document.currentScript?.getAttribute('data-brand-id');
  if (brandId) {
    new GhostLayerWidget(brandId);
  }
})();
```

---

## 5. IMPLEMENTATION GUIDE

### Phase 1: Core Widget SDK

#### Project Setup & Product Detection

**1. Create Widget Project:**

```bash
mkdir ghost-layer-widget
cd ghost-layer-widget
npm init -y

# Install dependencies
npm install -D typescript esbuild @types/node

# Create tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"]
}
```

**2. Create Widget Core (`src/index.ts`):**

```typescript
// src/index.ts

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
  private overlayElement: HTMLElement | null = null;

  constructor(brandId: string) {
    this.brandId = brandId;
    console.log('[GhostLayer] Initializing widget for brand:', brandId);
    this.init();
  }

  private async init(): Promise<void> {
    try {
      // 1. Load configuration
      await this.loadConfiguration();

      // 2. Check if enabled
      if (!this.config?.enabled) {
        console.log('[GhostLayer] Widget disabled for this brand');
        return;
      }

      // 3. Detect product page
      if (!this.isProductPage()) {
        console.log('[GhostLayer] Not a product page');
        return;
      }

      // 4. Extract product information
      this.currentProduct = this.detectProduct();

      if (!this.currentProduct) {
        console.log('[GhostLayer] Could not detect product');
        return;
      }

      console.log('[GhostLayer] Product detected:', this.currentProduct);

      // 5. Inject "Try It On" button
      this.injectTryOnButton();

      // 6. Track page view
      this.trackEvent('widget_loaded', {
        product_id: this.currentProduct.id,
        product_url: this.currentProduct.url
      });

    } catch (error) {
      console.error('[GhostLayer] Initialization error:', error);
    }
  }

  private async loadConfiguration(): Promise<void> {
    const apiEndpoint = 'https://api.ghostlayer.com';

    try {
      const response = await fetch(
        `${apiEndpoint}/api/widget/config/${this.brandId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load configuration');
      }

      this.config = await response.json();
      console.log('[GhostLayer] Configuration loaded:', this.config);

    } catch (error) {
      console.error('[GhostLayer] Failed to load config:', error);

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
    // Strategy 1: Check for Schema.org Product markup
    const productSchema = document.querySelector(
      'script[type="application/ld+json"]'
    );

    if (productSchema) {
      try {
        const schema = JSON.parse(productSchema.textContent || '');
        if (schema['@type'] === 'Product' ||
            (Array.isArray(schema) && schema.some(s => s['@type'] === 'Product'))) {
          return true;
        }
      } catch (e) {
        // Invalid JSON, continue to other strategies
      }
    }

    // Strategy 2: Check OpenGraph product tags
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType?.getAttribute('content')?.includes('product')) {
      return true;
    }

    // Strategy 3: Check URL patterns
    const url = window.location.href.toLowerCase();
    const productPatterns = [
      '/product/',
      '/products/',
      '/p/',
      '/item/',
      '/items/',
      '/shop/',
      '-p-',
      '/pd/'
    ];

    if (productPatterns.some(pattern => url.includes(pattern))) {
      return true;
    }

    // Strategy 4: Check for common product page elements
    const hasProductImage = !!document.querySelector(
      '.product-image, .product-gallery, [data-product-image], .product-main-image'
    );
    const hasAddToCart = !!document.querySelector(
      'button[type="submit"][name="add"], .add-to-cart, [data-add-to-cart], button:contains("Add to Cart")'
    );
    const hasPrice = !!document.querySelector(
      '.price, .product-price, [data-product-price], .amount'
    );

    return hasProductImage && (hasAddToCart || hasPrice);
  }

  private detectProduct(): Product | null {
    // Try multiple strategies to extract product data

    // Strategy 1: Schema.org Product markup
    const product = this.extractFromSchema();
    if (product) return product;

    // Strategy 2: OpenGraph meta tags
    const ogProduct = this.extractFromOpenGraph();
    if (ogProduct) return ogProduct;

    // Strategy 3: Common e-commerce patterns (Shopify, WooCommerce, etc.)
    const domProduct = this.extractFromDOM();
    if (domProduct) return domProduct;

    return null;
  }

  private extractFromSchema(): Product | null {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');

    for (const script of Array.from(scripts)) {
      try {
        const data = JSON.parse(script.textContent || '');
        const products = Array.isArray(data) ? data : [data];

        const productData = products.find(item => item['@type'] === 'Product');

        if (productData) {
          return {
            id: productData.sku || productData.productID || this.generateProductId(),
            name: productData.name || '',
            imageUrl: productData.image?.[0] || productData.image || '',
            price: productData.offers?.price?.toString() || productData.offers?.[0]?.price?.toString(),
            url: window.location.href
          };
        }
      } catch (e) {
        continue;
      }
    }

    return null;
  }

  private extractFromOpenGraph(): Product | null {
    const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const price = document.querySelector('meta[property="product:price:amount"]')?.getAttribute('content');

    if (image && title) {
      return {
        id: this.generateProductId(),
        name: title,
        imageUrl: image,
        price: price || undefined,
        url: window.location.href
      };
    }

    return null;
  }

  private extractFromDOM(): Product | null {
    // Try to find product image
    const imageSelectors = [
      '.product-image img',
      '.product-gallery img',
      '[data-product-image]',
      '.product-main-image img',
      '.product-featured-image img',
      '.woocommerce-product-gallery__image img',
      '.product-single__media img'
    ];

    let imageUrl = '';
    for (const selector of imageSelectors) {
      const img = document.querySelector(selector) as HTMLImageElement;
      if (img?.src) {
        imageUrl = img.src;
        break;
      }
    }

    // Try to find product name
    const nameSelectors = [
      'h1.product-title',
      'h1.product-name',
      '.product-title',
      '.product-name',
      '[data-product-title]',
      'h1[itemprop="name"]'
    ];

    let name = '';
    for (const selector of nameSelectors) {
      const element = document.querySelector(selector);
      if (element?.textContent) {
        name = element.textContent.trim();
        break;
      }
    }

    // Try to find price
    const priceSelectors = [
      '.price',
      '.product-price',
      '[data-product-price]',
      '[itemprop="price"]',
      '.amount'
    ];

    let price = '';
    for (const selector of priceSelectors) {
      const element = document.querySelector(selector);
      if (element?.textContent) {
        price = element.textContent.trim();
        break;
      }
    }

    if (imageUrl && name) {
      return {
        id: this.generateProductId(),
        name,
        imageUrl,
        price: price || undefined,
        url: window.location.href
      };
    }

    return null;
  }

  private generateProductId(): string {
    // Generate ID from URL
    const url = window.location.pathname;
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  }

  private injectTryOnButton(): void {
    // Create shadow DOM container
    const container = document.createElement('div');
    container.id = 'ghostlayer-widget-root';
    document.body.appendChild(container);

    this.shadowRoot = container.attachShadow({ mode: 'open' });

    // Inject styles
    const styles = document.createElement('style');
    styles.textContent = this.getWidgetStyles();
    this.shadowRoot.appendChild(styles);

    // Create button
    const button = document.createElement('button');
    button.className = 'ghostlayer-tryon-btn';
    button.textContent = this.config?.buttonText || 'Try It On';
    button.style.backgroundColor = this.config?.buttonColor || '#2563eb';

    // Position button based on config
    this.positionButton(button);

    // Add click handler
    button.addEventListener('click', () => this.openTryOnOverlay());

    this.shadowRoot.appendChild(button);

    console.log('[GhostLayer] Try-on button injected');
  }

  private positionButton(button: HTMLElement): void {
    const position = this.config?.buttonPosition || 'bottom-right';

    button.style.position = 'fixed';
    button.style.zIndex = '999999';

    switch (position) {
      case 'bottom-right':
        button.style.bottom = '20px';
        button.style.right = '20px';
        break;
      case 'bottom-left':
        button.style.bottom = '20px';
        button.style.left = '20px';
        break;
      case 'top-right':
        button.style.top = '20px';
        button.style.right = '20px';
        break;
      case 'top-left':
        button.style.top = '20px';
        button.style.left = '20px';
        break;
    }
  }

  private getWidgetStyles(): string {
    return `
      .ghostlayer-tryon-btn {
        padding: 12px 24px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .ghostlayer-tryon-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }

      .ghostlayer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .ghostlayer-modal {
        background: white;
        border-radius: 16px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 32px;
        position: relative;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .ghostlayer-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
        line-height: 1;
        padding: 8px;
      }

      .ghostlayer-close:hover {
        color: #000;
      }

      .ghostlayer-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 8px;
        color: #1f2937;
      }

      .ghostlayer-subtitle {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 24px;
      }

      .ghostlayer-upload-area {
        border: 2px dashed #d1d5db;
        border-radius: 12px;
        padding: 48px 24px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .ghostlayer-upload-area:hover {
        border-color: #2563eb;
        background: #eff6ff;
      }

      .ghostlayer-upload-icon {
        font-size: 48px;
        margin-bottom: 16px;
        color: #9ca3af;
      }

      .ghostlayer-upload-text {
        font-size: 16px;
        color: #374151;
        margin-bottom: 8px;
      }

      .ghostlayer-upload-hint {
        font-size: 14px;
        color: #6b7280;
      }

      .ghostlayer-preview-image {
        width: 100%;
        max-height: 400px;
        object-fit: contain;
        border-radius: 8px;
        margin-bottom: 16px;
      }

      .ghostlayer-button {
        width: 100%;
        padding: 14px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .ghostlayer-button-primary {
        background: #2563eb;
        color: white;
      }

      .ghostlayer-button-primary:hover {
        background: #1d4ed8;
      }

      .ghostlayer-button-primary:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }

      .ghostlayer-loading {
        text-align: center;
        padding: 32px;
      }

      .ghostlayer-spinner {
        border: 4px solid #f3f4f6;
        border-top: 4px solid #2563eb;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .ghostlayer-loading-text {
        font-size: 16px;
        color: #374151;
        margin-bottom: 4px;
      }

      .ghostlayer-loading-hint {
        font-size: 14px;
        color: #6b7280;
      }

      .ghostlayer-result-actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
      }

      .ghostlayer-button-secondary {
        background: #e5e7eb;
        color: #374151;
      }

      .ghostlayer-button-secondary:hover {
        background: #d1d5db;
      }
    `;
  }

  private openTryOnOverlay(): void {
    if (!this.shadowRoot || !this.currentProduct) return;

    // Track button click
    this.trackEvent('tryon_button_clicked', {
      product_id: this.currentProduct.id
    });

    // Create overlay
    this.overlayElement = document.createElement('div');
    this.overlayElement.className = 'ghostlayer-overlay';

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'ghostlayer-modal';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'ghostlayer-close';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', () => this.closeOverlay());

    // Content
    const content = this.createUploadUI();

    modal.appendChild(closeBtn);
    modal.appendChild(content);
    this.overlayElement.appendChild(modal);

    // Add to shadow DOM
    this.shadowRoot.appendChild(this.overlayElement);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  private createUploadUI(): HTMLElement {
    const container = document.createElement('div');

    const title = document.createElement('h2');
    title.className = 'ghostlayer-title';
    title.textContent = 'Try It On Virtually';

    const subtitle = document.createElement('p');
    subtitle.className = 'ghostlayer-subtitle';
    subtitle.textContent = 'Upload your photo to see how this looks on you';

    const uploadArea = document.createElement('div');
    uploadArea.className = 'ghostlayer-upload-area';

    const uploadIcon = document.createElement('div');
    uploadIcon.className = 'ghostlayer-upload-icon';
    uploadIcon.textContent = '📸';

    const uploadText = document.createElement('div');
    uploadText.className = 'ghostlayer-upload-text';
    uploadText.textContent = 'Click to upload or drag and drop';

    const uploadHint = document.createElement('div');
    uploadHint.className = 'ghostlayer-upload-hint';
    uploadHint.textContent = 'JPEG, PNG up to 10MB';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        this.handleImageUpload(file, container);
      }
    });

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.appendChild(uploadIcon);
    uploadArea.appendChild(uploadText);
    uploadArea.appendChild(uploadHint);

    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(uploadArea);
    container.appendChild(fileInput);

    return container;
  }

  private async handleImageUpload(file: File, container: HTMLElement): Promise<void> {
    // Show preview
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'ghostlayer-title';
    title.textContent = 'Your Photo';

    const preview = document.createElement('img');
    preview.className = 'ghostlayer-preview-image';
    preview.src = URL.createObjectURL(file);

    const generateBtn = document.createElement('button');
    generateBtn.className = 'ghostlayer-button ghostlayer-button-primary';
    generateBtn.textContent = 'Generate Try-On';

    generateBtn.addEventListener('click', async () => {
      await this.generateTryOn(file, container);
    });

    container.appendChild(title);
    container.appendChild(preview);
    container.appendChild(generateBtn);
  }

  private async generateTryOn(personImage: File, container: HTMLElement): Promise<void> {
    if (!this.currentProduct) return;

    // Show loading state
    container.innerHTML = '';

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ghostlayer-loading';

    const spinner = document.createElement('div');
    spinner.className = 'ghostlayer-spinner';

    const loadingText = document.createElement('div');
    loadingText.className = 'ghostlayer-loading-text';
    loadingText.textContent = 'Creating your virtual try-on...';

    const loadingHint = document.createElement('div');
    loadingHint.className = 'ghostlayer-loading-hint';
    loadingHint.textContent = 'This usually takes 3-5 seconds';

    loadingDiv.appendChild(spinner);
    loadingDiv.appendChild(loadingText);
    loadingDiv.appendChild(loadingHint);
    container.appendChild(loadingDiv);

    try {
      // Track generation start
      this.trackEvent('tryon_generation_started', {
        product_id: this.currentProduct.id
      });

      // Call API
      const formData = new FormData();
      formData.append('person', personImage);
      formData.append('product_url', this.currentProduct.imageUrl);
      formData.append('product_id', this.currentProduct.id);
      formData.append('brand_id', this.brandId);

      const apiEndpoint = this.config?.apiEndpoint || 'https://api.ghostlayer.com';
      const response = await fetch(`${apiEndpoint}/api/widget/try-on`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to generate try-on');
      }

      const result = await response.json();

      // Track success
      this.trackEvent('tryon_generation_success', {
        product_id: this.currentProduct.id,
        processing_time: result.processingTime
      });

      // Show result
      this.showTryOnResult(result.imageUrl, container);

    } catch (error) {
      console.error('[GhostLayer] Try-on generation error:', error);

      // Track error
      this.trackEvent('tryon_generation_error', {
        product_id: this.currentProduct.id,
        error: (error as Error).message
      });

      // Show error message
      this.showError(container);
    }
  }

  private showTryOnResult(imageUrl: string, container: HTMLElement): void {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'ghostlayer-title';
    title.textContent = 'Your Virtual Try-On';

    const subtitle = document.createElement('p');
    subtitle.className = 'ghostlayer-subtitle';
    subtitle.textContent = 'See how it looks on you!';

    const result = document.createElement('img');
    result.className = 'ghostlayer-preview-image';
    result.src = imageUrl;

    const actions = document.createElement('div');
    actions.className = 'ghostlayer-result-actions';

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'ghostlayer-button ghostlayer-button-primary';
    downloadBtn.textContent = 'Download';
    downloadBtn.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = 'virtual-tryon.png';
      a.click();
      this.trackEvent('tryon_downloaded', { product_id: this.currentProduct?.id });
    });

    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.className = 'ghostlayer-button ghostlayer-button-secondary';
    tryAgainBtn.textContent = 'Try Another';
    tryAgainBtn.addEventListener('click', () => {
      container.innerHTML = '';
      container.appendChild(this.createUploadUI());
    });

    actions.appendChild(downloadBtn);
    actions.appendChild(tryAgainBtn);

    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(result);
    container.appendChild(actions);
  }

  private showError(container: HTMLElement): void {
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'ghostlayer-title';
    title.textContent = 'Oops! Something went wrong';

    const subtitle = document.createElement('p');
    subtitle.className = 'ghostlayer-subtitle';
    subtitle.textContent = 'We couldn\'t generate your try-on. Please try again.';

    const retryBtn = document.createElement('button');
    retryBtn.className = 'ghostlayer-button ghostlayer-button-primary';
    retryBtn.textContent = 'Try Again';
    retryBtn.addEventListener('click', () => {
      container.innerHTML = '';
      container.appendChild(this.createUploadUI());
    });

    container.appendChild(title);
    container.appendChild(subtitle);
    container.appendChild(retryBtn);
  }

  private closeOverlay(): void {
    if (this.overlayElement && this.shadowRoot) {
      this.shadowRoot.removeChild(this.overlayElement);
      this.overlayElement = null;
      document.body.style.overflow = '';

      this.trackEvent('overlay_closed', {
        product_id: this.currentProduct?.id
      });
    }
  }

  private async trackEvent(eventName: string, data: Record<string, any>): Promise<void> {
    try {
      const apiEndpoint = this.config?.apiEndpoint || 'https://api.ghostlayer.com';

      await fetch(`${apiEndpoint}/api/widget/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brand_id: this.brandId,
          event_name: eventName,
          event_data: data,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          user_agent: navigator.userAgent
        })
      });
    } catch (error) {
      // Silent fail - don't disrupt user experience
      console.error('[GhostLayer] Tracking error:', error);
    }
  }
}

// Auto-initialize
(function() {
  const script = document.currentScript as HTMLScriptElement;
  const brandId = script?.getAttribute('data-brand-id');

  if (brandId) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        new GhostLayerWidget(brandId);
      });
    } else {
      new GhostLayerWidget(brandId);
    }
  } else {
    console.error('[GhostLayer] No brand ID provided');
  }
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GhostLayerWidget };
}
```

**3. Build Script (`package.json`):**

```json
{
  "name": "ghostlayer-widget",
  "version": "1.0.0",
  "scripts": {
    "build": "esbuild src/index.ts --bundle --minify --outfile=dist/ghostlayer-widget.js --target=es2020",
    "build:watch": "npm run build -- --watch",
    "dev": "npm run build:watch"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "esbuild": "^0.19.0",
    "@types/node": "^20.0.0"
  }
}
```

**4. Build the widget:**

```bash
npm run build
# Output: dist/ghostlayer-widget.js (small bundle ~30-50KB)
```

---

---

## 6. WIDGET SDK DEVELOPMENT

### Build Configuration

The widget must be built to a single, optimized JavaScript file that brands can load via GTM.

**Build Script (`build.js`):**

```javascript
// build.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'es2020',
  outfile: 'dist/ghostlayer-widget.js',
  format: 'iife',
  globalName: 'GhostLayer',
  banner: {
    js: '/* Ghost Layer Widget v1.0.0 | https://ghostlayer.com */'
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}).catch(() => process.exit(1));
```

**Expected Bundle Size:**
- Uncompressed: ~120KB
- Gzipped: ~35KB
- Target: <50KB gzipped

### CDN Hosting

Widget must be hosted on a fast, global CDN:

```
Production: https://cdn.ghostlayer.com/widget/v1/ghostlayer-widget.js
Development: https://cdn.ghostlayer.com/widget/dev/ghostlayer-widget.js
```

**CDN Setup (Vercel Edge Network):**
```bash
# Deploy to Vercel
vercel --prod

# Output URL: https://ghostlayer.vercel.app/widget/v1/ghostlayer-widget.js
# Custom domain: https://cdn.ghostlayer.com/widget/v1/ghostlayer-widget.js
```

### Widget Versioning

Brands should always load the latest stable version, but we maintain version control:

```
/widget/v1/ghostlayer-widget.js   (Latest stable v1.x.x)
/widget/v2/ghostlayer-widget.js   (Future v2.x.x)
/widget/dev/ghostlayer-widget.js  (Development/testing)
```

---

## 7. BRAND DASHBOARD

### Dashboard Architecture

**URL:** `https://dashboard.ghostlayer.com`

**Pages:**
1. `/login` - Brand login page
2. `/signup` - Brand signup page
3. `/dashboard` - Main dashboard (analytics overview)
4. `/dashboard/settings` - Widget configuration
5. `/dashboard/analytics` - Detailed analytics
6. `/dashboard/billing` - Billing & usage
7. `/dashboard/integration` - GTM integration guide

### Database Schema

**Supabase PostgreSQL Schema:**

```sql
-- Brands table
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- Brand info
  brand_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  contact_email TEXT NOT NULL,

  -- Auth (handled by Supabase Auth)
  user_id UUID REFERENCES auth.users(id),

  -- Status
  status TEXT DEFAULT 'trial', -- trial, active, paused, cancelled
  plan TEXT DEFAULT 'starter', -- starter, growth, enterprise

  -- Subscription
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,

  UNIQUE(user_id)
);

-- Widget configurations
CREATE TABLE widget_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,

  -- Widget settings
  enabled BOOLEAN DEFAULT true,
  button_text TEXT DEFAULT 'Try It On',
  button_color TEXT DEFAULT '#2563eb',
  button_position TEXT DEFAULT 'bottom-right',

  -- Advanced settings
  api_endpoint TEXT DEFAULT 'https://api.ghostlayer.com',
  custom_css TEXT,

  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(brand_id)
);

-- Products (auto-detected from brand's website)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,

  -- Product info
  product_id TEXT NOT NULL, -- From brand's website
  product_name TEXT,
  product_url TEXT NOT NULL,
  image_url TEXT NOT NULL,

  -- Metadata
  first_detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(brand_id, product_id)
);

-- Try-ons (usage tracking)
CREATE TABLE tryons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,

  -- Try-on data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  person_image_url TEXT, -- Temporary storage URL
  result_image_url TEXT, -- Generated result URL

  -- AI model used
  ai_model TEXT DEFAULT 'gemini-3-pro-image-preview',
  processing_time_ms INTEGER,

  -- Analytics
  session_id TEXT,
  user_agent TEXT,
  ip_address INET,

  -- Billing
  cost_usd DECIMAL(10, 4), -- Cost for this try-on
  billed BOOLEAN DEFAULT false
);

-- Analytics events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,

  -- Event data
  event_name TEXT NOT NULL, -- widget_loaded, tryon_button_clicked, etc.
  event_data JSONB,

  -- Context
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  product_url TEXT,
  session_id TEXT,
  user_agent TEXT,

  -- Indexes
  INDEX idx_events_brand_created (brand_id, created_at DESC),
  INDEX idx_events_name (event_name)
);

-- Billing records
CREATE TABLE billing_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,

  -- Billing period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Usage
  tryons_count INTEGER DEFAULT 0,
  total_cost_usd DECIMAL(10, 2),

  -- Payment
  status TEXT DEFAULT 'pending', -- pending, paid, overdue
  paid_at TIMESTAMP WITH TIME ZONE,
  stripe_invoice_id TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(brand_id, period_start)
);
```

### Dashboard Implementation

**Tech Stack:**
- Next.js 14+ App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Supabase Auth
- Recharts for analytics

**Key Pages:**

#### 1. Dashboard Home (`/dashboard`)

```typescript
// app/dashboard/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();

  // Get brand
  const { data: brand } = await supabase
    .from('brands')
    .select('*')
    .eq('user_id', user?.id)
    .single();

  // Get stats for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { count: tryonsCount } = await supabase
    .from('tryons')
    .select('*', { count: 'exact', head: true })
    .eq('brand_id', brand.id)
    .gte('created_at', thirtyDaysAgo.toISOString());

  const { count: productsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('brand_id', brand.id);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Try-Ons (Last 30 Days)"
          value={tryonsCount || 0}
          icon="👥"
        />
        <StatCard
          title="Products Detected"
          value={productsCount || 0}
          icon="👕"
        />
        <StatCard
          title="Conversion Rate"
          value="12.5%"
          icon="📈"
        />
      </div>

      {/* Charts, recent activity, etc. */}
    </div>
  );
}
```

#### 2. Widget Settings (`/dashboard/settings`)

```typescript
// app/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SettingsPage() {
  const [config, setConfig] = useState({
    enabled: true,
    buttonText: 'Try It On',
    buttonColor: '#2563eb',
    buttonPosition: 'bottom-right'
  });

  const supabase = createClientComponentClient();

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    // Get brand ID
    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('user_id', user?.id)
      .single();

    // Update config
    await supabase
      .from('widget_configs')
      .upsert({
        brand_id: brand.id,
        ...config,
        updated_at: new Date().toISOString()
      });

    alert('Settings saved!');
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Widget Settings</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Widget Enabled
          </label>
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Button Text
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={config.buttonText}
            onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Button Color
          </label>
          <input
            type="color"
            value={config.buttonColor}
            onChange={(e) => setConfig({ ...config, buttonColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Button Position
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={config.buttonPosition}
            onChange={(e) => setConfig({ ...config, buttonPosition: e.target.value })}
          >
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
          </select>
        </div>

        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
```

#### 3. Integration Guide (`/dashboard/integration`)

```typescript
// app/dashboard/integration/page.tsx
export default async function IntegrationPage() {
  const brandId = await getBrandId(); // Helper function

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">GTM Integration</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="font-semibold">Your Brand ID:</p>
        <code className="text-sm bg-white px-2 py-1 rounded">{brandId}</code>
      </div>

      <div className="space-y-8">
        <Step number={1} title="Open Google Tag Manager">
          <p>Go to <a href="https://tagmanager.google.com" className="text-blue-600 underline">tagmanager.google.com</a></p>
          <p>Select your container for your website</p>
        </Step>

        <Step number={2} title="Create New Tag">
          <p>Click "New Tag" in the Tags section</p>
          <p>Name it "Ghost Layer Widget"</p>
        </Step>

        <Step number={3} title="Configure Tag">
          <p>Choose "Custom HTML" as tag type</p>
          <p>Paste this code:</p>
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
{`<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.ghostlayer.com/widget/v1/ghostlayer-widget.js';
    script.setAttribute('data-brand-id', '${brandId}');
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`}
          </pre>
        </Step>

        <Step number={4} title="Set Trigger">
          <p>Add trigger: "All Pages"</p>
          <p>This will load the widget on every page</p>
        </Step>

        <Step number={5} title="Publish">
          <p>Click "Submit" and publish your changes</p>
          <p>Widget will appear on your site within 5 minutes</p>
        </Step>
      </div>
    </div>
  );
}
```

---

## 8. BACKEND API

### API Routes (Next.js App Router)

**Base URL:** `https://api.ghostlayer.com`

#### 1. Widget Configuration (`/api/widget/config/[brandId]`)

```typescript
// app/api/widget/config/[brandId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { brandId: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    // Get brand
    const { data: brand } = await supabase
      .from('brands')
      .select('id, status')
      .eq('id', params.brandId)
      .single();

    if (!brand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      );
    }

    // Check if brand is active
    if (brand.status !== 'active' && brand.status !== 'trial') {
      return NextResponse.json({
        brandId: params.brandId,
        enabled: false,
        buttonText: 'Try It On',
        buttonColor: '#2563eb',
        buttonPosition: 'bottom-right',
        apiEndpoint: 'https://api.ghostlayer.com'
      });
    }

    // Get widget config
    const { data: config } = await supabase
      .from('widget_configs')
      .select('*')
      .eq('brand_id', params.brandId)
      .single();

    if (!config) {
      // Return default config
      return NextResponse.json({
        brandId: params.brandId,
        enabled: true,
        buttonText: 'Try It On',
        buttonColor: '#2563eb',
        buttonPosition: 'bottom-right',
        apiEndpoint: 'https://api.ghostlayer.com'
      });
    }

    return NextResponse.json({
      brandId: params.brandId,
      enabled: config.enabled,
      buttonText: config.button_text,
      buttonColor: config.button_color,
      buttonPosition: config.button_position,
      apiEndpoint: config.api_endpoint
    });

  } catch (error) {
    console.error('Config fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### 2. Virtual Try-On Generation (`/api/widget/try-on`)

```typescript
// app/api/widget/try-on/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Storage } from '@google-cloud/storage';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS!)
});

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const startTime = Date.now();

  try {
    // Parse form data
    const formData = await request.formData();
    const personImage = formData.get('person') as File;
    const productUrl = formData.get('product_url') as string;
    const productId = formData.get('product_id') as string;
    const brandId = formData.get('brand_id') as string;

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

    // Convert File to Buffer
    const personBuffer = Buffer.from(await personImage.arrayBuffer());

    // Fetch product image
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
        text: 'Generate a realistic virtual try-on image showing this person wearing this clothing item. Maintain the person\'s pose, background, and facial features. Only change the clothing to match the product. Output should be photorealistic.'
      }
    ]);

    const response = await result.response;
    const imageData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!imageData) {
      // Fallback to gemini-2.5-flash-image
      console.log('Primary model failed, trying fallback...');

      const fallbackModel = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-image'
      });

      const fallbackResult = await fallbackModel.generateContent([
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
          text: 'Generate a realistic virtual try-on image showing this person wearing this clothing item.'
        }
      ]);

      const fallbackResponse = await fallbackResult.response;
      const fallbackImageData = fallbackResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!fallbackImageData) {
        throw new Error('Both models failed to generate image');
      }

      // Use fallback result...
    }

    // Upload result to Google Cloud Storage
    const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME!);
    const fileName = `tryons/${brandId}/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const file = bucket.file(fileName);

    await file.save(Buffer.from(imageData, 'base64'), {
      contentType: 'image/jpeg',
      public: true
    });

    const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`;

    const processingTime = Date.now() - startTime;

    // Save to database
    const { data: product } = await supabase
      .from('products')
      .select('id')
      .eq('brand_id', brandId)
      .eq('product_id', productId)
      .single();

    await supabase.from('tryons').insert({
      brand_id: brandId,
      product_id: product?.id,
      result_image_url: publicUrl,
      ai_model: 'gemini-3-pro-image-preview',
      processing_time_ms: processingTime,
      cost_usd: 0.134,
      user_agent: request.headers.get('user-agent'),
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    });

    return NextResponse.json({
      imageUrl: publicUrl,
      processingTime
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
  }
};
```

#### 3. Analytics Tracking (`/api/widget/track`)

```typescript
// app/api/widget/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const body = await request.json();
    const { brand_id, event_name, event_data, url, user_agent } = body;

    if (!brand_id || !event_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save event
    await supabase.from('analytics_events').insert({
      brand_id,
      event_name,
      event_data,
      product_url: url,
      user_agent,
      created_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 9. GTM INTEGRATION

### Installation Steps for Brands

**Step 1: Get Your Brand ID**
- Sign up at dashboard.ghostlayer.com
- Copy your unique brand ID from the Integration page

**Step 2: Open Google Tag Manager**
- Go to tagmanager.google.com
- Select your website container

**Step 3: Create New Tag**
- Click "New Tag"
- Name it "Ghost Layer Widget"
- Choose "Custom HTML" as tag type

**Step 4: Add Widget Code**

```html
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.ghostlayer.com/widget/v1/ghostlayer-widget.js';
    script.setAttribute('data-brand-id', 'YOUR_BRAND_ID_HERE');
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
```

**Step 5: Set Trigger**
- Add trigger: "All Pages"
- This ensures the widget loads on every page

**Step 6: Publish**
- Click "Submit"
- Add version name: "Added Ghost Layer widget"
- Click "Publish"

**Verification:**
- Visit your website
- Check browser console for: `[GhostLayer] Initializing widget for brand: YOUR_BRAND_ID`
- Visit a product page
- See "Try It On" button appear

---

## 10. DEPLOYMENT STRATEGY

### Infrastructure Setup

#### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend API
cd backend
vercel --prod

# Deploy dashboard
cd dashboard
vercel --prod

# Deploy widget CDN
cd widget
vercel --prod
```

#### 2. Environment Variables

**Backend API (`.env.production`):**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Google AI
GOOGLE_AI_API_KEY=AIza...

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=ghostlayer-prod
GOOGLE_CLOUD_BUCKET_NAME=ghostlayer-tryons
GOOGLE_CLOUD_CREDENTIALS={"type":"service_account",...}

# App
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.ghostlayer.com
```

**Dashboard (`.env.production`):**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# API
NEXT_PUBLIC_API_URL=https://api.ghostlayer.com

# App
NODE_ENV=production
```

#### 3. Custom Domains

```bash
# API domain
vercel domains add api.ghostlayer.com

# Dashboard domain
vercel domains add dashboard.ghostlayer.com

# CDN domain
vercel domains add cdn.ghostlayer.com
```

#### 4. Google Cloud Storage Setup

```bash
# Create bucket
gsutil mb -p ghostlayer-prod gs://ghostlayer-tryons

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://ghostlayer-tryons

# Set CORS
echo '[{"origin": ["*"], "method": ["GET"], "maxAgeSeconds": 3600}]' > cors.json
gsutil cors set cors.json gs://ghostlayer-tryons

# Enable CDN
gcloud compute backend-buckets create ghostlayer-cdn \
  --gcs-bucket-name=ghostlayer-tryons \
  --enable-cdn
```

---

## 11. TESTING & QA

### Widget Testing Checklist

#### 1. Cross-Browser Testing

Test widget on:
- ✅ Chrome (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Mobile Chrome (Android)

#### 2. E-Commerce Platform Testing

Test widget integration on:
- ✅ Shopify store
- ✅ WooCommerce (WordPress)
- ✅ Custom Next.js e-commerce site
- ✅ Custom React e-commerce site
- ✅ Plain HTML e-commerce site

#### 3. Product Detection Testing

Verify product detection works on:
- ✅ Pages with Schema.org markup
- ✅ Pages with OpenGraph tags
- ✅ Pages with neither (DOM-based detection)
- ✅ Multiple products on same page
- ✅ Product variations (size, color)

#### 4. Widget Functionality Testing

Test all widget features:
- ✅ Button injection and positioning
- ✅ Overlay open/close
- ✅ Image upload (file picker)
- ✅ Camera capture (mobile)
- ✅ Try-on generation
- ✅ Result display
- ✅ Download functionality
- ✅ Error handling
- ✅ Loading states

#### 5. Performance Testing

- ✅ Widget bundle size < 50KB gzipped
- ✅ Widget load time < 500ms
- ✅ Try-on generation time 3-7 seconds
- ✅ No blocking of page load
- ✅ No memory leaks
- ✅ Works on slow 3G connection

#### 6. Compatibility Testing

- ✅ No CSS conflicts with brand site
- ✅ No JavaScript errors
- ✅ Shadow DOM isolation working
- ✅ Works with common frameworks (React, Vue, Angular)
- ✅ Works with common builders (Shopify, Webflow, Squarespace)

#### 7. Load Testing

Use Artillery or k6:

```yaml
# load-test.yml
config:
  target: 'https://api.ghostlayer.com'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120
      arrivalRate: 50
    - duration: 60
      arrivalRate: 100

scenarios:
  - name: 'Try-on generation'
    flow:
      - post:
          url: '/api/widget/try-on'
          formData:
            brand_id: 'test-brand-id'
            product_url: 'https://example.com/product.jpg'
            product_id: 'test-product'
            person: '@person.jpg'
```

Run test:
```bash
artillery run load-test.yml
```

Expected results:
- ✅ 95th percentile latency < 10 seconds
- ✅ Error rate < 1%
- ✅ Supports 100 concurrent try-ons

---

## 12. SECURITY & PERFORMANCE

### Security Measures

#### 1. Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

// 10 try-ons per minute per IP
export const tryonRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true
});

// Usage in API route:
const ip = request.headers.get('x-forwarded-for') || 'unknown';
const { success } = await tryonRateLimit.limit(ip);

if (!success) {
  return NextResponse.json(
    { error: 'Rate limit exceeded' },
    { status: 429 }
  );
}
```

#### 2. Image Validation

```typescript
// lib/image-validation.ts
import sharp from 'sharp';

export async function validateImage(buffer: Buffer): Promise<boolean> {
  try {
    const metadata = await sharp(buffer).metadata();

    // Check format
    if (!['jpeg', 'png', 'webp'].includes(metadata.format || '')) {
      return false;
    }

    // Check dimensions (reasonable limits)
    if (!metadata.width || !metadata.height) return false;
    if (metadata.width > 4096 || metadata.height > 4096) return false;
    if (metadata.width < 200 || metadata.height < 200) return false;

    return true;
  } catch {
    return false;
  }
}
```

#### 3. CORS Configuration

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow widget to be loaded from any domain
  if (request.nextUrl.pathname.startsWith('/widget/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }

  // Restrict API to known domains
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    // Only allow API calls from widgets with valid brand IDs
    // Validation happens in route handlers
  }

  return response;
}
```

#### 4. API Authentication

```typescript
// lib/auth.ts
export async function validateBrandAccess(
  brandId: string,
  userToken: string
): Promise<boolean> {
  const supabase = createRouteHandlerClient({ cookies });

  // Verify user token
  const { data: { user }, error } = await supabase.auth.getUser(userToken);
  if (error || !user) return false;

  // Check if user owns this brand
  const { data: brand } = await supabase
    .from('brands')
    .select('id')
    .eq('id', brandId)
    .eq('user_id', user.id)
    .single();

  return !!brand;
}
```

### Performance Optimizations

#### 1. Bundle Size Optimization

```javascript
// build.js - Advanced minification
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  treeShaking: true,
  target: 'es2020',
  outfile: 'dist/ghostlayer-widget.js',
  format: 'iife',

  // Advanced optimizations
  pure: ['console.log'], // Remove console.logs
  drop: ['debugger'],     // Remove debugger statements
  legalComments: 'none',  // Remove comments

  // Code splitting (future enhancement)
  splitting: false,

  // Compression
  charset: 'utf8',
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true
}).catch(() => process.exit(1));
```

#### 2. Image Optimization

```typescript
// Optimize images before sending to AI
const optimizedBuffer = await sharp(originalBuffer)
  .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 85 })
  .toBuffer();
```

#### 3. Caching Strategy

```typescript
// Cache widget configs (Redis)
const CACHE_TTL = 300; // 5 minutes

export async function getWidgetConfig(brandId: string) {
  const cacheKey = `widget:config:${brandId}`;

  // Check cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Fetch from database
  const config = await fetchConfigFromDB(brandId);

  // Store in cache
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(config));

  return config;
}
```

#### 4. CDN Configuration

```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/widget/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

---

## FINAL NOTES FOR DANYAL

### Development Priorities

1. **Start with Widget SDK** (Section 5)
   - Build and test product detection
   - Implement button injection
   - Create overlay UI
   - Test on multiple sites

2. **Build Backend API** (Section 8)
   - Set up Supabase database
   - Implement config endpoint
   - Implement try-on endpoint
   - Test with Gemini API

3. **Create Dashboard** (Section 7)
   - Implement auth (Supabase)
   - Build settings page
   - Build integration guide
   - Add basic analytics

4. **Deploy Everything** (Section 10)
   - Deploy to Vercel
   - Set up custom domains
   - Configure Google Cloud Storage
   - Test production environment

5. **Polish & Test** (Section 11-12)
   - Cross-browser testing
   - Security hardening
   - Performance optimization
   - Load testing

### Key Technologies

- **Widget:** TypeScript + esbuild + Shadow DOM
- **Backend:** Next.js 14 + TypeScript
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini 3 Pro Image Preview
- **Storage:** Google Cloud Storage
- **Hosting:** Vercel
- **Auth:** Supabase Auth

### Success Metrics

- Widget bundle < 50KB gzipped ✅
- Try-on generation < 7 seconds ✅
- Works on 95% of e-commerce sites ✅
- Zero conflicts with brand sites ✅

---

**SPECIFICATION COMPLETE**

All sections (1-12) are now fully documented. This specification provides everything needed to build the Ghost Layer widget from scratch.

