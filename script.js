/* ============================================================
   TNL293107 — portfolio interactions
   No dependencies. Every effect degrades to a static page.
   ============================================================ */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isCoarse = window.matchMedia('(pointer: coarse)');

  const revealTargets = document.querySelectorAll('.reveal, .stagger, h1, .terminal');
  const show = (el) => el.classList.add('in');
  const showAll = () => revealTargets.forEach(show);

  /* Hard backstop, registered before anything else and never gated behind
     requestAnimationFrame — rAF is deferred indefinitely for pages opened in a
     background tab, and content must not wait on a decoration. */
  setTimeout(showAll, 2500);

  /* Two frames, so a class that triggers a transition never lands in the same
     frame as a visibility flip — otherwise the transition latches at its start
     value and the element stays invisible. */
  const afterPaint = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

  /* ---------- reveal on scroll ---------- */
  function startReveals() {
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      showAll();
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        io.unobserve(entry.target);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach((el) => io.observe(el));
  }

  /* Hero animates on load rather than on scroll. */
  function playHero() {
    document.querySelectorAll('.hero .stagger, .hero h1, .terminal').forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 90, 450)}ms`;
      show(el);
    });
  }

  document.querySelectorAll('.terminal .t-line').forEach((line, i) => {
    line.style.transitionDelay = `${400 + i * 70}ms`;
  });

  /* ---------- intro counter ---------- */
  const loader = document.getElementById('loader');

  if (root.classList.contains('loading') && loader) {
    const num = document.getElementById('loader-num');
    const bar = document.getElementById('loader-bar');
    const status = document.getElementById('loader-status');

    const DURATION = 900; // long enough to read, short enough to forgive
    const start = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem('tnl-intro', '1'); } catch (e) { /* private mode */ }

      if (status) status.textContent = 'ready';
      root.classList.add('revealing');   // page becomes visible
      loader.classList.add('done');      // curtain lifts

      afterPaint(() => { playHero(); startReveals(); });

      const cleanup = () => {
        root.classList.remove('loading', 'revealing');
        loader.remove();
      };
      loader.addEventListener('transitionend', cleanup, { once: true });
      setTimeout(cleanup, 1200); // guard if transitionend never fires
    };

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const pct = Math.round(eased * 100);

      if (num) num.textContent = String(pct);
      if (bar) bar.style.transform = `scaleX(${eased})`;
      if (status && pct > 60) status.textContent = 'mounting';

      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(finish, 140);
    };

    requestAnimationFrame(tick);

    /* rAF is paused in background / non-compositing tabs, which would leave the
       curtain up over the whole page. setTimeout still fires, so it is the
       backstop: the intro can never trap content. */
    setTimeout(finish, DURATION + 700);

    loader.addEventListener('click', finish);
    document.addEventListener('keydown', finish, { once: true });
  } else {
    if (loader) loader.remove();
    afterPaint(() => { playHero(); startReveals(); });
  }

  /* ---------- scroll progress + active section ---------- */
  const progress = document.querySelector('.scroll-progress i');
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setCurrent = () => {
    const marker = window.scrollY + window.innerHeight * 0.35;
    let active = -1;
    sections.forEach((section, i) => {
      if (section.offsetTop <= marker) active = i;
    });
    navLinks.forEach((a, i) => a.classList.toggle('current', i === active));
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
      setCurrent();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- cursor glow ---------- */
  const glow = document.querySelector('.cursor-glow');

  if (glow && !reduceMotion.matches && !isCoarse.matches) {
    let x = 0, y = 0, pending = false;

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      glow.classList.add('on');
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        pending = false;
      });
    }, { passive: true });

    document.addEventListener('pointerleave', () => glow.classList.remove('on'));
  }

  /* ---------- card tilt ---------- */
  if (!reduceMotion.matches && !isCoarse.matches) {
    const MAX_TILT = 1.8; // degrees — deliberately small

    document.querySelectorAll('.tilt').forEach((card) => {
      let frame = null;

      card.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || window.innerWidth < 1024) return;
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const dx = (e.clientX - r.left) / r.width - 0.5;
          const dy = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            `perspective(1200px) rotateX(${(-dy * MAX_TILT).toFixed(3)}deg) ` +
            `rotateY(${(dx * MAX_TILT).toFixed(3)}deg) translateY(-3px)`;
        });
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        if (frame) cancelAnimationFrame(frame);
        card.style.transform = '';
      });
    });
  }

  /* ---------- mobile navigation ---------- */
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
      setOpen(false);
      toggle.focus();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) setOpen(false);
    });
  }
})();
