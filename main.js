/* ═══════════════════════════════════════════════════════
   AstroPhonia — Main JS
   Starfield · Navbar · Reveal · Cookie · Compatibilità ancore
   ═══════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const reduceMotion = (() => {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch (e) { return false; }
  })();

  /* ─────────────────────────────────────────────
     STARFIELD
     Densità proporzionale all'area, pausa quando la
     scheda non è visibile, statico se l'utente ha
     chiesto meno animazioni.
  ───────────────────────────────────────────── */
  (function starfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, stars = [], raf = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const count = Math.round(Math.min(190, Math.max(60, (W * H) / 11000)));
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.1 + 0.25,
          alpha: Math.random() * 0.65 + 0.2,
          speed: Math.random() * 0.13 + 0.015,
          tw: Math.random() * 0.016 + 0.004,
          dir: Math.random() > 0.5 ? 1 : -1
        });
      }
    }

    function paint(animate) {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        if (animate) {
          s.alpha += s.tw * s.dir;
          if (s.alpha >= 0.88 || s.alpha <= 0.12) s.dir *= -1;
          s.y += s.speed;
          if (s.y > H) { s.y = -2; s.x = Math.random() * W; }
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(197,160,105,' + (s.alpha * 0.6).toFixed(3) + ')';
        ctx.fill();
      }
    }

    function loop() {
      paint(true);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (reduceMotion) { paint(false); return; }
      if (raf === null) raf = requestAnimationFrame(loop);
    }
    function stop() {
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); if (reduceMotion) paint(false); }, 180);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    resize();
    start();
  })();

  /* ─────────────────────────────────────────────
     NAVBAR
  ───────────────────────────────────────────── */
  (function navbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const apply = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', apply, { passive: true });
    apply();
  })();

  /* ─────────────────────────────────────────────
     COMPATIBILITÀ ANCORE VECCHIE
     I vecchi id (#therapy, #audios) sono stati
     rinominati. Chi arriva con un link salvato
     viene portato nel punto giusto.
  ───────────────────────────────────────────── */
  (function legacyAnchors() {
    const map = { '#therapy': '#method', '#audios': '#journeys' };
    const target = map[window.location.hash];
    if (!target) return;
    window.addEventListener('load', () => {
      const el = document.querySelector(target);
      if (el) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: 'auto' });
        history.replaceState(null, '', target);
      }
    });
  })();

  /* ─────────────────────────────────────────────
     SCROLL FLUIDO
  ───────────────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  });

})();

/* ═══════════════════════════════════════════════════════
   FUNZIONI GLOBALI (usate dagli attributi onclick)
   ═══════════════════════════════════════════════════════ */

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const ham = document.getElementById('hamburger');
  if (!nav) return;
  const open = nav.classList.toggle('open');
  if (ham) ham.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function closeMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const ham = document.getElementById('hamburger');
  if (nav) nav.classList.remove('open');
  if (ham) ham.setAttribute('aria-expanded', 'false');
}

function revealOnScroll() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => observer.observe(el));
}

function acceptCookies() {
  try { localStorage.setItem('ap_cookies', '1'); } catch (e) { /* storage non disponibile */ }
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.add('hidden');
}

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  let accepted = null;
  try { accepted = localStorage.getItem('ap_cookies'); } catch (e) { /* storage non disponibile */ }
  if (accepted) return;
  setTimeout(() => banner.classList.remove('hidden'), 2000);
}

/* ═══════════════════════════════════════════════════════
   AVVIO
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const splash  = document.getElementById('splash');
  const wrapper = document.getElementById('site-wrapper');
  const saved   = typeof getSavedLang === 'function' ? getSavedLang() : null;

  if (saved) {
    // lingua già scelta: si entra direttamente nel sito
    applyTranslations(saved);
    if (splash) { splash.classList.add('hidden'); splash.style.display = 'none'; }
    if (wrapper) wrapper.hidden = false;
  } else {
    applyTranslations('en');
    if (wrapper && !splash) wrapper.hidden = false;
  }

  revealOnScroll();
  initCookieBanner();
});
