// Append "(≈ PKR X)" next to any element with data-usd="0.50".
// Rate is cached server-side (refreshes daily); we cache in sessionStorage too.
(function () {
  const ENDPOINT = 'https://api.tryinstantfit.com/api/fx?to=PKR';
  const CACHE_KEY = 'tif_fx_pkr_v1';
  const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

  async function getRate() {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.t < CACHE_TTL_MS) return cached.rate;
    } catch (_) {}

    const res = await fetch(ENDPOINT, { cache: 'no-store' });
    if (!res.ok) throw new Error('FX endpoint ' + res.status);
    const data = await res.json();
    if (typeof data.rate !== 'number') throw new Error('Bad FX payload');
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ rate: data.rate, t: Date.now() }));
    } catch (_) {}
    return data.rate;
  }

  function formatPkr(usd, rate) {
    const pkr = Math.round(usd * rate);
    return '≈ PKR ' + pkr.toLocaleString();
  }

  function render(rate) {
    document.querySelectorAll('[data-usd]').forEach(function (el) {
      if (el.dataset.fxRendered) return;
      const usd = parseFloat(el.dataset.usd);
      if (!isFinite(usd) || usd <= 0) return;
      const span = document.createElement('span');
      span.className = 'fx-pkr';
      span.style.cssText = 'font-size:.85em;color:var(--muted, #6b7280);margin-left:.4em;font-weight:400;';
      span.textContent = '(' + formatPkr(usd, rate) + ')';
      el.appendChild(span);
      el.dataset.fxRendered = '1';
    });
  }

  function init() {
    if (!document.querySelector('[data-usd]')) return;
    getRate().then(render).catch(function (err) {
      console.warn('[fx-display] using fallback rate:', err.message);
      render(285);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
