/* ============================================================
   TNL293107 — portfolio
   Vanilla, no dependencies. Every effect is additive: with this
   file removed the page still reads, expands and navigates.
   ------------------------------------------------------------
   1  reveal + word-split headings
   2  number count-up
   3  scroll progress + active nav
   4  cursor + magnetic buttons
   5  pointer-following work preview
   6  record expansion
   7  stack cloud (canvas physics)
   ============================================================ */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)');
  const fine = () => !coarse.matches && !reduce.matches;

  const raf = requestAnimationFrame;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

  /* ---------- 1. reveal + split ---------- */

  /* Wrap each word so it can slide out from a mask. Done in JS so the
     markup stays clean and a no-JS page is untouched. */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          const parts = child.textContent.split(/(\s+)/);
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const outer = document.createElement('span');
            outer.className = 'w';
            const inner = document.createElement('span');
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    };
    walk(el);

    el.querySelectorAll('.w > span').forEach((s, i) => {
      s.style.transitionDelay = `${Math.min(i * 42, 620)}ms`;
    });
  }

  const splits = document.querySelectorAll('.split');
  const risers = document.querySelectorAll('.reveal, .rec, .kit, .cloud');

  if (!reduce.matches) {
    splits.forEach(splitWords);
    risers.forEach((el) => el.classList.add('rise'));
  }

  const showAll = () => {
    splits.forEach((el) => el.classList.add('in'));
    risers.forEach((el) => el.classList.add('in'));
  };

  /* Registered up front and never gated behind rAF: content must not
     depend on an observer that might never fire. */
  setTimeout(showAll, 2600);

  if ('IntersectionObserver' in window && !reduce.matches) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    [...splits, ...risers].forEach((el, i) => {
      if (el.classList.contains('reveal')) {
        el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
      }
      io.observe(el);
    });
  } else {
    showAll();
  }

  /* ---------- 2. count-up ---------- */
  const counters = document.querySelectorAll('[data-count]');

  if ('IntersectionObserver' in window && !reduce.matches) {
    const cio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        cio.unobserve(e.target);

        const target = Number(e.target.dataset.count);
        const dur = 1100;
        const t0 = performance.now();
        const step = (now) => {
          const t = clamp((now - t0) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          e.target.textContent = String(Math.round(eased * target));
          if (t < 1) raf(step);
          else e.target.textContent = String(target);
        };
        e.target.textContent = '0';
        raf(step);
        /* If frames never come, the real value must still land. */
        setTimeout(() => { e.target.textContent = String(target); }, dur + 500);
      }
    }, { threshold: 0.6 });

    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- 3. progress + active nav ---------- */
  const bar = document.querySelector('.progress i');
  const links = [...document.querySelectorAll('.nav a')];
  const targets = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  let scrollQueued = false;
  const onScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    raf(() => {
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;
      }
      const marker = window.scrollY + window.innerHeight * 0.35;
      let active = -1;
      targets.forEach((s, i) => { if (s.offsetTop <= marker) active = i; });
      links.forEach((a, i) => a.classList.toggle('on', i === active));
      scrollQueued = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 4. cursor + magnets ---------- */
  const cursor = document.querySelector('.cursor');

  if (cursor && fine()) {
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    let running = false;

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) raf(loop);
      else running = false;
    };

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add('on');
      if (!running) { running = true; raf(loop); }
    }, { passive: true });

    document.addEventListener('pointerleave', () => cursor.classList.remove('on'));

    document.querySelectorAll('a, button, summary').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor.classList.add('hot'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('hot'));
    });

    /* magnetic pull */
    document.querySelectorAll('.magnet').forEach((el) => {
      let frame = null;
      el.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        if (frame) cancelAnimationFrame(frame);
        frame = raf(() => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
          el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
        });
      }, { passive: true });
      el.addEventListener('pointerleave', () => {
        if (frame) cancelAnimationFrame(frame);
        el.style.transform = '';
      });
    });
  }

  /* ---------- 5. work preview ---------- */
  const peek = document.querySelector('.peek');

  if (peek && fine()) {
    const inner = peek.querySelector('.peek-inner');
    let px = 0, py = 0, qx = 0, qy = 0, spinning = false;

    const glide = () => {
      qx += (px - qx) * 0.14;
      qy += (py - qy) * 0.14;
      peek.style.transform = `translate3d(${qx}px, ${qy}px, 0) translate(-50%, -50%) scale(1)`;
      if (Math.abs(px - qx) > 0.5 || Math.abs(py - qy) > 0.5) raf(glide);
      else spinning = false;
    };

    document.querySelectorAll('.rec').forEach((rec) => {
      const summary = rec.querySelector('summary');

      summary.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse' || rec.open) return;
        inner.innerHTML = `<span>${rec.dataset.peek || ''}</span>`;
        px = qx = e.clientX; py = qy = e.clientY;
        peek.classList.add('on');
      });

      summary.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || rec.open) return;
        px = e.clientX; py = e.clientY;
        if (!spinning) { spinning = true; raf(glide); }
      }, { passive: true });

      summary.addEventListener('pointerleave', () => peek.classList.remove('on'));
      rec.addEventListener('toggle', () => { if (rec.open) peek.classList.remove('on'); });
    });
  }

  /* ---------- 6. record expansion ---------- */
  if (!reduce.matches) {
    document.querySelectorAll('.rec').forEach((rec) => {
      rec.addEventListener('toggle', () => {
        if (!rec.open) return;
        rec.querySelectorAll('.plate, .rec-detail > *').forEach((el, i) => {
          el.animate(
            [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
            { duration: 460, delay: i * 50, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }
          );
        });
      });
    });
  }

  /* ---------- 7. stack cloud ---------- */
  /* Decorative: technology marks drifting in a field, pushed by the pointer
     and draggable. The <dl class="kit"> underneath carries the same list as
     text for screen readers, search engines and no-JS visitors. */
  const cloud = document.querySelector('[data-cloud]');
  const ICONS = window.TNL_ICONS;

  if (cloud && ICONS && ICONS.length && !reduce.matches) {
    const canvas = cloud.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const nameOut = document.querySelector('.cloud-name');

    const css = getComputedStyle(document.documentElement);
    const INK = css.getPropertyValue('--ink').trim() || '#14110e';
    const RULE = css.getPropertyValue('--rule-2').trim() || '#d2c5b2';
    const PAPER = css.getPropertyValue('--paper').trim() || '#fdf8f3';

    /* Simple Icons ship on a 24x24 grid. */
    const GRID = 24;

    const marks = ICONS.map((ic) => ({ ...ic, path: new Path2D(ic.p) }));

    let W = 0, H = 0, dpr = 1;
    let chips = [];
    let pointer = { x: -9999, y: -9999 };
    let held = null, hot = null;
    let alive = false;

    function build() {
      const rect = cloud.getBoundingClientRect();
      if (!rect.width) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* Fewer, larger marks when there is less room. */
      const narrow = W < 620;
      const set = narrow ? marks.filter((_, i) => i % 2 === 0) : marks;
      const size = narrow ? 46 : Math.min(64, Math.max(50, W / 18));

      chips = set.map((m) => ({
        mark: m,
        s: size,
        r: size / 2,
        x: size + Math.random() * Math.max(1, W - size * 2),
        y: size + Math.random() * Math.max(1, H - size * 2),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        tint: 0
      }));

      draw();
    }

    function step() {
      for (const c of chips) {
        if (c !== held) {
          c.x += c.vx; c.y += c.vy;
          c.vx *= 0.994; c.vy *= 0.994;

          const dx = c.x - pointer.x, dy = c.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          const reach = 140;
          if (d2 < reach * reach && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const push = (1 - d / reach) * 0.85;
            c.vx += (dx / d) * push;
            c.vy += (dy / d) * push;
          }

          const sp = Math.hypot(c.vx, c.vy);
          if (sp > 3) { c.vx = c.vx / sp * 3; c.vy = c.vy / sp * 3; }
          if (sp < 0.05) { c.vx += (Math.random() - 0.5) * 0.05; c.vy += (Math.random() - 0.5) * 0.05; }

          if (c.x - c.r < 0) { c.x = c.r; c.vx = Math.abs(c.vx) * 0.72; }
          if (c.y - c.r < 0) { c.y = c.r; c.vy = Math.abs(c.vy) * 0.72; }
          if (c.x + c.r > W) { c.x = W - c.r; c.vx = -Math.abs(c.vx) * 0.72; }
          if (c.y + c.r > H) { c.y = H - c.r; c.vy = -Math.abs(c.vy) * 0.72; }
        }

        /* brand colour fades in near the pointer, or while dragged */
        const near = Math.hypot(c.x - pointer.x, c.y - pointer.y) < c.r + 26;
        const want = (c === held || near) ? 1 : 0;
        c.tint += (want - c.tint) * 0.12;
      }

      /* circular separation */
      for (let i = 0; i < chips.length; i++) {
        for (let j = i + 1; j < chips.length; j++) {
          const a = chips[i], b = chips[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const min = a.r + b.r;
          let d2 = dx * dx + dy * dy;
          if (d2 >= min * min || d2 === 0) continue;
          const d = Math.sqrt(d2) || 0.01;
          const overlap = (min - d) / 2;
          const nx = dx / d, ny = dy / d;
          if (a !== held) { a.x -= nx * overlap; a.y -= ny * overlap; a.vx -= nx * 0.12; a.vy -= ny * 0.12; }
          if (b !== held) { b.x += nx * overlap; b.y += ny * overlap; b.vx += nx * 0.12; b.vy += ny * 0.12; }
        }
      }
    }

    /* blend a hex toward the ink colour */
    const mix = (hex, t) => {
      const h = hex.replace('#', '');
      const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
      const ir = 20, ig = 17, ib = 14;
      return `rgb(${Math.round(ir + (r - ir) * t)}, ${Math.round(ig + (g - ig) * t)}, ${Math.round(ib + (b - ib) * t)})`;
    };

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const c of chips) {
        const pad = c.s * 0.26;
        const inner = c.s - pad * 2;

        ctx.save();
        ctx.translate(c.x - c.r, c.y - c.r);

        // disc
        ctx.beginPath();
        ctx.arc(c.r, c.r, c.r, 0, Math.PI * 2);
        ctx.fillStyle = PAPER;
        ctx.fill();
        ctx.strokeStyle = c.tint > 0.5 ? mix(c.mark.c, c.tint) : RULE;
        ctx.lineWidth = 1;
        ctx.stroke();

        // mark
        ctx.translate(pad, pad);
        ctx.scale(inner / GRID, inner / GRID);
        ctx.fillStyle = c.tint > 0.02 ? mix(c.mark.c, c.tint) : INK;
        ctx.fill(c.mark.path);

        ctx.restore();
      }
    }

    const frame = () => { if (!alive) return; step(); draw(); raf(frame); };

    const vio = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !alive) { alive = true; raf(frame); }
      else if (!e.isIntersecting) alive = false;
    }, { threshold: 0.05 });
    vio.observe(cloud);

    const local = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const pick = (p) => chips.find((c) => Math.hypot(p.x - c.x, p.y - c.y) <= c.r) || null;

    const setName = (chip) => {
      if (!nameOut) return;
      if (hot === chip) return;
      hot = chip;
      nameOut.innerHTML = chip ? `<b>${chip.mark.n}</b>` : '';
    };

    cloud.addEventListener('pointermove', (e) => {
      const p = local(e);
      pointer.x = p.x; pointer.y = p.y;
      if (held) {
        held.x = clamp(p.x, held.r, W - held.r);
        held.y = clamp(p.y, held.r, H - held.r);
      } else {
        setName(pick(p));
      }
    }, { passive: true });

    cloud.addEventListener('pointerleave', () => {
      pointer.x = pointer.y = -9999;
      setName(null);
    });

    cloud.addEventListener('pointerdown', (e) => {
      const p = local(e);
      const hit = pick(p);
      setName(hit);                      // tapping names it on touch too
      if (e.pointerType !== 'mouse') return;   // never hijack touch scrolling
      held = hit;
      if (held) { held.vx = held.vy = 0; canvas.setPointerCapture?.(e.pointerId); }
    });

    const release = () => {
      if (!held) return;
      held.vx = (Math.random() - 0.5) * 1.4;
      held.vy = (Math.random() - 0.5) * 1.4;
      held = null;
    };
    cloud.addEventListener('pointerup', release);
    cloud.addEventListener('pointercancel', release);

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 180);
    });

    build();
  }
})();
