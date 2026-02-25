"use strict";(()=>{var m="https://backend-psi-peach.vercel.app",b=class{constructor(t){this.config=null;this.overlayRoot=null;this.overlayShadow=null;this.currentProduct=null;this.isImageOverlay=!1;this.cameraStream=null;this.selectedFile=null;this.countdownTimer=null;this.brandId=t,this.init()}async init(){try{if(console.log("[GhostLayer] Initializing for brand:",this.brandId),await this.loadConfiguration(),!this.config?.enabled){console.log("[GhostLayer] Widget disabled");return}if(!this.isProductPage()){console.log("[GhostLayer] Not a product page");return}if(this.currentProduct=this.detectProduct(),!this.currentProduct){console.log("[GhostLayer] No product detected");return}console.log("[GhostLayer] Product:",this.currentProduct.name),this.injectButton(),this.trackEvent("widget_loaded",{product_id:this.currentProduct.id})}catch(t){console.error("[GhostLayer] Init error:",t)}}async loadConfiguration(){try{let t=await fetch(`${m}/api/widget/config/${this.brandId}`,{headers:{Accept:"application/json"}});if(t.ok){this.config=await t.json();return}}catch{}this.config={brandId:this.brandId,apiEndpoint:m,buttonText:"Try It On \u2728",buttonColor:"#1a1a2e",buttonPosition:"bottom-right",enabled:!0}}isProductPage(){for(let s of Array.from(document.querySelectorAll('script[type="application/ld+json"]')))try{let l=JSON.parse(s.textContent||"");if((Array.isArray(l)?l:[l]).some(c=>c["@type"]==="Product"))return!0}catch{}if((document.querySelector('meta[property="og:type"]')?.getAttribute("content")||"").toLowerCase().includes("product"))return!0;let e=window.location.pathname.toLowerCase(),r=window.location.search.toLowerCase();if(["/product/","/products/","/p/","/item/","/shop/","/clothing/","product.html"].some(s=>e.includes(s))||r.includes("id=")&&e.includes("product"))return!0;let n=!!(document.querySelector('[class*="price"]')||document.querySelector('[itemprop="price"]')),i=!!(document.querySelector('[class*="add-to-cart"]')||document.querySelector('[class*="addtocart"]')||document.querySelector('button[name="add"]')),a=!!(document.querySelector('[class*="product-image"]')||document.querySelector('[class*="product-gallery"]'));return n&&(i||a)}detectProduct(){return this.fromSchema()||this.fromOG()||this.fromDOM()}fromSchema(){for(let t of Array.from(document.querySelectorAll('script[type="application/ld+json"]')))try{let e=JSON.parse(t.textContent||""),o=(Array.isArray(e)?e:[e]).find(i=>i["@type"]==="Product");if(!o)continue;let n=Array.isArray(o.image)?o.image[0]:o.image;if(!n)continue;return{id:o.sku||o["@id"]||this.genId(),name:o.name||document.title,imageUrl:n,price:o.offers?.price?.toString(),url:location.href}}catch{}return null}fromOG(){let t=document.querySelector('meta[property="og:image"]')?.getAttribute("content"),e=document.querySelector('meta[property="og:title"]')?.getAttribute("content");return t&&e?{id:this.genId(),name:e,imageUrl:t,url:location.href}:null}fromDOM(){let t=["#pd-main-img","#product-featured-image",".product-image img",".product-gallery img",".product-single__media img",".product-featured-image img",".woocommerce-product-gallery__image img","[data-product-image] img",'[class*="pd-main"] img','[class*="product"] img',"main img"],e="";for(let n of t){let i=document.querySelector(n);if(!i)continue;let a=i.tagName==="IMG"?i:i.querySelector("img");if(a?.src&&!this.isPlaceholder(a.src)){e=a.src;break}}let r=["#pd-name",'h1[class*="product"]','[class*="product-title"]','[class*="product-name"]','[itemprop="name"]',"h1"],o="";for(let n of r){let i=document.querySelector(n)?.textContent?.trim();if(i){o=i;break}}return e&&o?{id:this.genId(),name:o,imageUrl:e,url:location.href}:null}isPlaceholder(t){let e=t.toLowerCase();return e.includes("placeholder")||e.includes("no-image")||e.includes("noimage")||e.includes("icon")||e.includes("logo")}genId(){return btoa(location.pathname).replace(/[^a-zA-Z0-9]/g,"").substring(0,16)}findProductImg(){let t=["#pd-main-img","#product-featured-image",".product-featured-image img",".product-single__media img",".product-image img",".woocommerce-product-gallery__image img",'[class*="product-gallery"] img','[class*="product-image"] img','[class*="product-photo"] img','[class*="product-media"] img'];for(let e of t){let r=document.querySelector(e);if(r instanceof HTMLImageElement&&r.src&&!this.isPlaceholder(r.src))return r}return null}injectButton(){let t=this.config?.buttonColor||"#1a1a2e",e=this.config?.buttonText||"Try It On \u2728",r=document.createElement("div");r.id="ghostlayer-btn-root";let o=this.findProductImg();if(o){this.isImageOverlay=!0;let i=o.parentElement;i?(getComputedStyle(i).position==="static"&&(i.style.position="relative"),Object.assign(r.style,{position:"absolute",bottom:"14px",left:"50%",transform:"translateX(-50%)",zIndex:"100",pointerEvents:"auto"}),i.appendChild(r)):(document.body.appendChild(r),this.isImageOverlay=!1)}else document.body.appendChild(r),this.isImageOverlay=!1;let n=r.attachShadow({mode:"open"});if(this.isImageOverlay)n.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          button {
            display: block;
            background: ${t};
            color: #fff;
            border: none;
            border-radius: 50px;
            padding: 11px 26px;
            font-size: 14px;
            font-weight: 700;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            white-space: nowrap;
            letter-spacing: 0.3px;
            transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          }
          button:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.5); filter: brightness(1.12); }
          button:active { transform: translateY(0); }
        </style>
        <button id="gl-try-btn">${e}</button>
      `;else{let i=this.config?.buttonPosition||"bottom-right",a={"bottom-right":"bottom:24px;right:24px;","bottom-left":"bottom:24px;left:24px;","top-right":"top:24px;right:24px;","top-left":"top:24px;left:24px;"};n.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          button {
            position: fixed;
            ${a[i]||a["bottom-right"]}
            background: ${t};
            color: #fff;
            border: none;
            border-radius: 50px;
            padding: 14px 28px;
            font-size: 15px;
            font-weight: 700;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0,0,0,0.25);
            z-index: 2147483646;
            white-space: nowrap;
            letter-spacing: 0.3px;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          button:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
          button:active { transform: translateY(0); }
        </style>
        <button id="gl-try-btn">${e}</button>
      `}n.getElementById("gl-try-btn")?.addEventListener("click",()=>this.openOverlay()),this.overlayRoot=document.createElement("div"),this.overlayRoot.id="ghostlayer-overlay-root",document.body.appendChild(this.overlayRoot),this.overlayShadow=this.overlayRoot.attachShadow({mode:"open"})}openOverlay(){this.trackEvent("tryon_opened",{product_id:this.currentProduct?.id}),this.selectedFile=null,this.renderOverlay("upload")}renderOverlay(t,e){if(!this.overlayShadow)return;let r=this.overlayShadow.getElementById("gl-overlay");r&&r.remove();let o=document.createElement("div");o.id="gl-overlay",o.innerHTML=this.getOverlayInner(t,e),this.overlayShadow.appendChild(o),this.bindOverlayEvents(t)}getOverlayInner(t,e){let r=this.currentProduct?.name||"this item",o=this.currentProduct?.imageUrl||"",i={upload:`
        <div class="gl-card">
          <div class="gl-header">
            <div class="gl-logo">\u2728 Try It On</div>
            <button class="gl-close" id="gl-close">\u2715</button>
          </div>
          ${o?`<div class="gl-product-preview">
           <img src="${o}" alt="${r}" class="gl-product-img" />
           <div class="gl-product-name">${r}</div>
         </div>
         <div class="gl-divider"></div>`:""}
          <p class="gl-subtitle">Upload your photo or use your camera to see how this looks on you</p>

          <div class="gl-tabs">
            <button class="gl-tab gl-tab-active" id="gl-tab-upload">\u{1F4C1} Upload</button>
            <button class="gl-tab" id="gl-tab-camera">\u{1F4F7} Camera</button>
          </div>

          <!-- Upload Panel -->
          <div id="gl-panel-upload">
            <div class="gl-upload-zone" id="gl-upload-zone">
              <div class="gl-upload-icon">\u{1F4F8}</div>
              <div class="gl-upload-text">Click to upload your photo</div>
              <div class="gl-upload-hint">or drag & drop \xB7 JPG, PNG, WEBP \xB7 Max 10MB</div>
              <input type="file" id="gl-file-input" accept="image/jpeg,image/png,image/webp" hidden />
            </div>
            <div class="gl-preview-wrap" id="gl-upload-preview-wrap" style="display:none">
              <img id="gl-upload-preview-img" class="gl-preview-img" src="" alt="Your photo" />
              <button class="gl-change-btn" id="gl-change-photo">Change photo</button>
            </div>
          </div>

          <!-- Camera Panel -->
          <div id="gl-panel-camera" style="display:none">
            <div class="gl-camera-wrap" id="gl-camera-wrap">
              <video id="gl-camera-video" class="gl-camera-video" autoplay playsinline muted></video>
              <canvas id="gl-camera-canvas" style="display:none" width="640" height="480"></canvas>
              <div class="gl-countdown-overlay" id="gl-countdown-overlay" style="display:none">
                <div class="gl-countdown-num" id="gl-countdown-num">5</div>
              </div>
            </div>
            <div class="gl-camera-controls" id="gl-camera-controls">
              <button class="gl-cam-btn gl-capture-btn" id="gl-capture-now">\u{1F4F8} Capture Now</button>
              <button class="gl-cam-btn gl-timer-btn" id="gl-timer-btn">\u23F1 5s Timer</button>
            </div>
            <div class="gl-camera-error" id="gl-camera-error" style="display:none">
              \u{1F4F5} Camera not available. Allow camera access or use Upload instead.
            </div>
            <div class="gl-preview-wrap" id="gl-camera-preview-wrap" style="display:none">
              <img id="gl-camera-preview-img" class="gl-preview-img" src="" alt="Captured photo" />
              <button class="gl-change-btn" id="gl-retake-btn">\u21A9 Retake</button>
            </div>
          </div>

          <button class="gl-primary-btn" id="gl-generate-btn" disabled>Generate Try-On</button>
          <p class="gl-privacy">\u{1F512} Your photo is never stored. Processed securely and deleted immediately.</p>
        </div>
      `,processing:`
        <div class="gl-card gl-center">
          <div class="gl-spinner"></div>
          <div class="gl-processing-title">Creating your look...</div>
          <div class="gl-processing-sub">Our AI is styling you right now \u2728</div>
          <div class="gl-progress-bar"><div class="gl-progress-fill"></div></div>
        </div>
      `,result:`
        <div class="gl-card">
          <div class="gl-header">
            <div class="gl-logo">\u2728 Your Look</div>
            <button class="gl-close" id="gl-close">\u2715</button>
          </div>
          <img src="${e?.resultUrl||""}" alt="Virtual try-on result" class="gl-result-img" />
          <div class="gl-result-actions">
            <a href="${e?.resultUrl||"#"}" download="my-look.jpg" class="gl-secondary-btn">\u2B07 Download</a>
            <button class="gl-secondary-btn" id="gl-retry">Try Another Photo</button>
            <button class="gl-primary-btn gl-buy-btn" id="gl-buy-btn">Add to Cart</button>
          </div>
          <p class="gl-privacy">Powered by <strong>Try Instant Fit</strong></p>
        </div>
      `,error:`
        <div class="gl-card gl-center">
          <div class="gl-error-icon">\u26A0\uFE0F</div>
          <div class="gl-error-title">Something went wrong</div>
          <div class="gl-error-msg">${e?.errorMsg||"Please try again with a clear, front-facing photo."}</div>
          <button class="gl-primary-btn" id="gl-retry">Try Again</button>
          <button class="gl-ghost-btn" id="gl-close">Close</button>
        </div>
      `};return`<style>${this.css()}</style>${i[t]}`}css(){return`
      * { box-sizing: border-box; margin: 0; padding: 0; }

      #gl-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.72);
        backdrop-filter: blur(4px);
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: gl-fade-in 0.2s ease;
      }
      @keyframes gl-fade-in { from { opacity: 0 } to { opacity: 1 } }

      .gl-card {
        background: #fff;
        border-radius: 20px;
        width: 420px;
        max-width: calc(100vw - 32px);
        max-height: 90vh;
        overflow-y: auto;
        padding: 24px 24px 20px;
        box-shadow: 0 24px 64px rgba(0,0,0,0.32);
        animation: gl-slide-up 0.28s ease;
        scrollbar-width: thin;
      }
      @keyframes gl-slide-up {
        from { transform: translateY(18px); opacity: 0 }
        to   { transform: translateY(0);    opacity: 1 }
      }

      .gl-center { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; }

      .gl-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
      .gl-logo { font-size: 16px; font-weight: 700; color: #1a1a2e; }
      .gl-close {
        background: #f3f4f6; border: none; border-radius: 50%;
        width: 30px; height: 30px; cursor: pointer; font-size: 13px;
        color: #6b7280; display: flex; align-items: center; justify-content: center;
        transition: background 0.2s; flex-shrink: 0;
      }
      .gl-close:hover { background: #e5e7eb; }

      .gl-product-preview { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
      .gl-product-img { width: 52px; height: 66px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb; flex-shrink: 0; }
      .gl-product-name { font-size: 13px; font-weight: 600; color: #111; line-height: 1.4; }
      .gl-divider { height: 1px; background: #f3f4f6; margin: 0 0 14px; }

      .gl-subtitle { font-size: 12px; color: #6b7280; margin-bottom: 12px; line-height: 1.5; }

      /* Tabs */
      .gl-tabs { display: flex; gap: 8px; margin-bottom: 12px; }
      .gl-tab {
        flex: 1; padding: 9px 10px; border: 1.5px solid #e5e7eb; border-radius: 10px;
        background: #fff; font-size: 13px; font-weight: 600; color: #6b7280;
        cursor: pointer; transition: all 0.18s;
      }
      .gl-tab:hover { border-color: #374151; color: #374151; }
      .gl-tab-active { background: #1a1a2e; border-color: #1a1a2e; color: #fff; }

      /* Upload */
      .gl-upload-zone {
        border: 2px dashed #d1d5db; border-radius: 12px; padding: 26px 16px;
        text-align: center; cursor: pointer; transition: border-color 0.2s, background 0.2s;
        margin-bottom: 12px;
      }
      .gl-upload-zone:hover, .gl-upload-zone.gl-drag-over { border-color: #6366f1; background: #f5f3ff; }
      .gl-upload-icon { font-size: 30px; margin-bottom: 8px; }
      .gl-upload-text { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 3px; }
      .gl-upload-hint { font-size: 11px; color: #9ca3af; }

      /* Camera */
      .gl-camera-wrap {
        position: relative; border-radius: 12px; overflow: hidden;
        background: #111; margin-bottom: 10px; aspect-ratio: 4/3;
      }
      .gl-camera-video {
        width: 100%; height: 100%; object-fit: cover; display: block;
        transform: scaleX(-1); /* mirror like a selfie */
      }
      .gl-countdown-overlay {
        position: absolute; inset: 0; background: rgba(0,0,0,0.45);
        display: flex; align-items: center; justify-content: center;
      }
      .gl-countdown-num {
        font-size: 88px; font-weight: 900; color: #fff;
        animation: gl-pulse 1s ease infinite;
        text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        line-height: 1;
      }
      @keyframes gl-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%       { transform: scale(1.08); opacity: 0.9; }
      }
      .gl-camera-controls { display: flex; gap: 8px; margin-bottom: 10px; }
      .gl-cam-btn {
        flex: 1; padding: 11px 8px; border-radius: 10px; border: none;
        font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.18s;
      }
      .gl-cam-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      .gl-capture-btn { background: #1a1a2e; color: #fff; }
      .gl-capture-btn:hover:not(:disabled) { background: #2d2d4e; }
      .gl-timer-btn { background: #f3f4f6; color: #374151; }
      .gl-timer-btn:hover:not(:disabled) { background: #e5e7eb; }
      .gl-camera-error {
        font-size: 12px; color: #ef4444; text-align: center;
        padding: 10px 12px; background: #fef2f2; border-radius: 8px; margin-bottom: 10px;
      }

      /* Preview */
      .gl-preview-wrap { position: relative; margin-bottom: 12px; text-align: center; }
      .gl-preview-img {
        width: 100%; max-height: 210px; object-fit: contain;
        border-radius: 12px; border: 1px solid #e5e7eb;
      }
      .gl-change-btn {
        margin-top: 7px; background: none; border: none;
        color: #6366f1; font-size: 13px; font-weight: 600;
        cursor: pointer; text-decoration: underline;
      }

      /* Buttons */
      .gl-primary-btn {
        width: 100%; padding: 13px; background: #1a1a2e; color: #fff;
        border: none; border-radius: 12px; font-size: 14px; font-weight: 700;
        cursor: pointer; transition: background 0.2s; margin-bottom: 6px;
      }
      .gl-primary-btn:hover:not(:disabled) { background: #2d2d4e; }
      .gl-primary-btn:disabled { opacity: 0.38; cursor: not-allowed; }
      .gl-buy-btn { width: auto; flex: 1; }
      .gl-secondary-btn {
        flex: 1; padding: 11px 12px; background: #f3f4f6; color: #374151;
        border: none; border-radius: 10px; font-size: 13px; font-weight: 600;
        cursor: pointer; text-align: center; text-decoration: none;
        display: inline-block; transition: background 0.2s;
      }
      .gl-secondary-btn:hover { background: #e5e7eb; }
      .gl-ghost-btn {
        width: 100%; padding: 11px; background: none;
        border: 2px solid #e5e7eb; border-radius: 12px;
        font-size: 13px; font-weight: 600; color: #6b7280;
        cursor: pointer; margin-top: 6px;
      }
      .gl-ghost-btn:hover { border-color: #d1d5db; }

      .gl-privacy { font-size: 11px; color: #9ca3af; text-align: center; margin-top: 8px; line-height: 1.4; }

      /* Processing */
      .gl-spinner {
        width: 52px; height: 52px; border: 4px solid #e5e7eb;
        border-top-color: #6366f1; border-radius: 50%;
        animation: gl-spin 0.75s linear infinite;
      }
      @keyframes gl-spin { to { transform: rotate(360deg); } }
      .gl-processing-title { font-size: 17px; font-weight: 700; color: #111; }
      .gl-processing-sub { font-size: 13px; color: #6b7280; }
      .gl-progress-bar { width: 100%; height: 4px; background: #e5e7eb; border-radius: 2px; overflow: hidden; }
      .gl-progress-fill {
        height: 100%; background: linear-gradient(90deg, #6366f1, #8b5cf6);
        animation: gl-progress 4s ease-in-out forwards;
      }
      @keyframes gl-progress {
        0%   { width: 0%; }
        30%  { width: 40%; }
        70%  { width: 72%; }
        90%  { width: 86%; }
        100% { width: 90%; }
      }

      /* Result */
      .gl-result-img { width: 100%; border-radius: 14px; border: 1px solid #e5e7eb; margin-bottom: 14px; }
      .gl-result-actions { display: flex; gap: 8px; margin-bottom: 6px; flex-wrap: wrap; align-items: center; }

      /* Error */
      .gl-error-icon { font-size: 44px; }
      .gl-error-title { font-size: 17px; font-weight: 700; color: #111; }
      .gl-error-msg { font-size: 13px; color: #6b7280; line-height: 1.5; }
    `}bindOverlayEvents(t){let e=this.overlayShadow;if(e){if(e.getElementById("gl-close")?.addEventListener("click",()=>this.closeOverlay()),e.getElementById("gl-overlay")?.addEventListener("click",r=>{r.target.id==="gl-overlay"&&this.closeOverlay()}),t==="upload"){let r=e.getElementById("gl-generate-btn"),o=d=>{this.selectedFile=d,r&&(r.disabled=!1)},n=e.getElementById("gl-tab-upload"),i=e.getElementById("gl-tab-camera"),a=e.getElementById("gl-panel-upload"),s=e.getElementById("gl-panel-camera");n?.addEventListener("click",()=>{this.stopCamera(),n.classList.add("gl-tab-active"),i?.classList.remove("gl-tab-active"),a&&(a.style.display="block"),s&&(s.style.display="none")}),i?.addEventListener("click",async()=>{i.classList.add("gl-tab-active"),n?.classList.remove("gl-tab-active"),a&&(a.style.display="none"),s&&(s.style.display="block"),await this.startCamera(e)});let l=e.getElementById("gl-upload-zone"),g=e.getElementById("gl-file-input"),c=e.getElementById("gl-upload-preview-wrap"),u=e.getElementById("gl-upload-preview-img"),h=d=>{if(!d.type.startsWith("image/"))return;o(d);let p=URL.createObjectURL(d);u&&(u.src=p),l&&(l.style.display="none"),c&&(c.style.display="block")};l?.addEventListener("click",()=>g?.click()),e.getElementById("gl-change-photo")?.addEventListener("click",()=>{this.selectedFile=null,r&&(r.disabled=!0),l&&(l.style.display="block"),c&&(c.style.display="none"),g?.click()}),g?.addEventListener("change",()=>{let d=g.files?.[0];d&&h(d)}),l?.addEventListener("dragover",d=>{d.preventDefault(),l.classList.add("gl-drag-over")}),l?.addEventListener("dragleave",()=>l.classList.remove("gl-drag-over")),l?.addEventListener("drop",d=>{d.preventDefault(),l.classList.remove("gl-drag-over");let p=d.dataTransfer?.files[0];p&&h(p)}),e.getElementById("gl-capture-now")?.addEventListener("click",()=>{this.capturePhoto(e,o)}),e.getElementById("gl-timer-btn")?.addEventListener("click",()=>{this.startCountdown(e,5,o)}),e.getElementById("gl-retake-btn")?.addEventListener("click",async()=>{this.selectedFile=null,r&&(r.disabled=!0);let d=e.getElementById("gl-camera-preview-wrap"),p=e.getElementById("gl-camera-wrap"),f=e.getElementById("gl-camera-controls"),y=e.getElementById("gl-capture-now"),v=e.getElementById("gl-timer-btn");d&&(d.style.display="none"),p&&(p.style.display="block"),f&&(f.style.display="flex"),y&&(y.disabled=!1),v&&(v.disabled=!1),await this.startCamera(e)}),r?.addEventListener("click",async()=>{this.selectedFile&&await this.generateTryOn(this.selectedFile)})}t==="result"&&(e.getElementById("gl-retry")?.addEventListener("click",()=>{this.selectedFile=null,this.renderOverlay("upload")}),e.getElementById("gl-buy-btn")?.addEventListener("click",()=>{this.trackEvent("buy_clicked",{product_id:this.currentProduct?.id}),this.closeOverlay(),(document.querySelector('button[name="add"]')||document.querySelector('[class*="add-to-cart"]'))?.click()})),t==="error"&&e.getElementById("gl-retry")?.addEventListener("click",()=>{this.selectedFile=null,this.renderOverlay("upload")})}}async startCamera(t){let e=t.getElementById("gl-camera-video"),r=t.getElementById("gl-camera-error"),o=t.getElementById("gl-capture-now"),n=t.getElementById("gl-timer-btn"),i=t.getElementById("gl-camera-wrap");this.stopCamera();try{let a=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:{ideal:640},height:{ideal:480}}});this.cameraStream=a,e&&(e.srcObject=a),i&&(i.style.display="block"),r&&(r.style.display="none"),o&&(o.disabled=!1),n&&(n.disabled=!1)}catch{r&&(r.style.display="block"),i&&(i.style.display="none"),o&&(o.disabled=!0),n&&(n.disabled=!0)}}capturePhoto(t,e){let r=t.getElementById("gl-camera-video"),o=t.getElementById("gl-camera-canvas");if(!r||!o||!r.videoWidth)return;o.width=r.videoWidth,o.height=r.videoHeight;let n=o.getContext("2d");n&&(n.drawImage(r,0,0),this.stopCamera(),o.toBlob(i=>{if(!i)return;let a=new File([i],"selfie.jpg",{type:"image/jpeg"}),s=t.getElementById("gl-camera-wrap"),l=t.getElementById("gl-camera-controls"),g=t.getElementById("gl-camera-preview-wrap"),c=t.getElementById("gl-camera-preview-img"),u=URL.createObjectURL(a);c&&(c.src=u),s&&(s.style.display="none"),l&&(l.style.display="none"),g&&(g.style.display="block"),e(a)},"image/jpeg",.92))}startCountdown(t,e,r){let o=t.getElementById("gl-countdown-overlay"),n=t.getElementById("gl-countdown-num"),i=t.getElementById("gl-capture-now"),a=t.getElementById("gl-timer-btn");this.countdownTimer&&(clearInterval(this.countdownTimer),this.countdownTimer=null),o&&(o.style.display="flex"),i&&(i.disabled=!0),a&&(a.disabled=!0);let s=e;n&&(n.textContent=String(s)),this.countdownTimer=window.setInterval(()=>{s--,n&&(n.textContent=String(s)),s<=0&&(clearInterval(this.countdownTimer),this.countdownTimer=null,o&&(o.style.display="none"),i&&(i.disabled=!1),a&&(a.disabled=!1),this.capturePhoto(t,r))},1e3)}stopCamera(){this.countdownTimer&&(clearInterval(this.countdownTimer),this.countdownTimer=null),this.cameraStream&&(this.cameraStream.getTracks().forEach(t=>t.stop()),this.cameraStream=null)}closeOverlay(){this.stopCamera(),this.overlayShadow?.getElementById("gl-overlay")?.remove(),this.trackEvent("tryon_closed",{product_id:this.currentProduct?.id})}async generateTryOn(t){this.stopCamera(),this.renderOverlay("processing"),this.trackEvent("tryon_started",{product_id:this.currentProduct?.id});try{let e=new FormData;e.append("user_photo",t),e.append("product_image_url",this.currentProduct?.imageUrl||""),e.append("product_id",this.currentProduct?.id||""),e.append("product_name",this.currentProduct?.name||""),e.append("brand_id",this.brandId),e.append("source","ghost-layer");let r=this.config?.apiEndpoint||m,o=await fetch(`${r}/api/widget/try-on`,{method:"POST",body:e});if(!o.ok){let a=await o.json().catch(()=>({}));throw new Error(a.error||`Server error: ${o.status}`)}let n=await o.json(),i=n.result_url||n.resultUrl;if(!i)throw new Error("No result image returned");this.trackEvent("tryon_completed",{product_id:this.currentProduct?.id,result_url:i}),this.renderOverlay("result",{resultUrl:i})}catch(e){console.error("[GhostLayer] Try-on failed:",e),this.trackEvent("tryon_failed",{product_id:this.currentProduct?.id,error:String(e)}),this.renderOverlay("error",{errorMsg:e instanceof Error?e.message:"Please try again."})}}async trackEvent(t,e){try{let r=this.config?.apiEndpoint||m;await fetch(`${r}/api/widget/track`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({brand_id:this.brandId,event_name:t,event_data:e,page_url:location.href,timestamp:new Date().toISOString()}),keepalive:!0})}catch{}}};(function(){let t=(document.currentScript||document.querySelector('script[src*="ghostlayer-widget"]'))?.getAttribute("data-brand-id");if(!t){console.warn("[GhostLayer] No data-brand-id found on script tag");return}let e=()=>setTimeout(()=>new b(t),0);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})();})();
