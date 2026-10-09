'use client';

import { useEffect, useRef } from 'react';

/**
 * 3D field of tiles (three.js). The orange piece floats above the one empty slot and
 * lands as the visitor scrolls (or clicks). three.js is loaded only in the browser,
 * after the page is interactive, so it never slows down the first paint.
 */
export default function HeroScene({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import('three');
      if (disposed) return;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return; // no WebGL: the static logo stays visible
      }

      const css = (name: string, fallback: string) =>
        getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
      const small = window.innerWidth < 820;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 15);
      scene.add(new THREE.AmbientLight(0xffffff, 0.62));
      const key = new THREE.DirectionalLight(0xffffff, 0.9);
      key.position.set(-6, 8, 12);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffffff, 0.35);
      rim.position.set(8, -4, 6);
      scene.add(rim);
      const glow = new THREE.PointLight(0xff5b1f, 0, 6);
      scene.add(glow);

      const rounded = (s: number, r: number) => {
        const h = s / 2;
        const sh = new THREE.Shape();
        sh.moveTo(-h + r, -h);
        sh.lineTo(h - r, -h);
        sh.quadraticCurveTo(h, -h, h, -h + r);
        sh.lineTo(h, h - r);
        sh.quadraticCurveTo(h, h, h - r, h);
        sh.lineTo(-h + r, h);
        sh.quadraticCurveTo(-h, h, -h, h - r);
        sh.lineTo(-h, -h + r);
        sh.quadraticCurveTo(-h, -h, -h + r, -h);
        return sh;
      };
      const geo = new THREE.ExtrudeGeometry(rounded(0.9, 0.2), {
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: small ? 3 : 5,
        curveSegments: small ? 8 : 12,
      });
      geo.center();

      const matInk = new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.08 });
      const matSoft = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0 });
      const matOrange = new THREE.MeshStandardMaterial({ roughness: 0.32, metalness: 0.05, emissiveIntensity: 0.18 });
      const paint = () => {
        matInk.color.set(css('--tile', '#12141C'));
        matSoft.color.set(css('--tile-soft', '#D9D3C7'));
        matOrange.color.set(css('--orange', '#FF5B1F'));
        matOrange.emissive.set(css('--orange', '#FF5B1F'));
      };
      paint();
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkQuery.addEventListener('change', paint);

      const group = new THREE.Group();
      scene.add(group);
      const N = 5;
      const gap = 1.1;
      const slot = { c: 3, r: 3 };
      const tiles: { mesh: import('three').Mesh; phase: number; d: number }[] = [];
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          if (c === slot.c && r === slot.r) continue;
          const soft = (c * 3 + r * 7) % 5 === 0 || (c + r) % 4 === 1;
          const mesh = new THREE.Mesh(geo, soft ? matSoft : matInk);
          mesh.position.set((c - (N - 1) / 2) * gap, (r - (N - 1) / 2) * gap, 0);
          group.add(mesh);
          tiles.push({ mesh, phase: c * 0.7 + r * 0.45, d: Math.hypot(c - slot.c, r - slot.r) });
        }
      }
      const sx = (slot.c - (N - 1) / 2) * gap;
      const sy = (slot.r - (N - 1) / 2) * gap;
      const piece = new THREE.Mesh(geo, matOrange);
      group.add(piece);
      const outlineMat = new THREE.LineDashedMaterial({ color: 0x9a948a, dashSize: 0.06, gapSize: 0.05, transparent: true });
      const outline = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.92, 0.92)), outlineMat);
      outline.computeLineDistances();
      outline.position.set(sx, sy, -0.12);
      group.add(outline);

      const base = { x: -0.55, y: 0.42, z: 0.06 };
      const ptr = { x: 0, y: 0 };
      const rot = { x: 0, y: 0 };
      let progress = 0;
      let clicked = 0;
      let landedAt = -1;
      const t0 = performance.now();

      const layout = () => {
        const w = hero.clientWidth;
        const h = hero.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const a = w / h;
        const halfW = 4.02 * a;
        if (a > 1.05) {
          const s = Math.min(1, halfW / 9.5);
          group.scale.setScalar(s);
          group.position.set(halfW - 4.1 * s, -0.1, 0);
        } else {
          group.scale.setScalar(0.72);
          group.position.set(0.3, 2.3, 0);
        }
      };
      layout();

      const onMove = (e: PointerEvent) => {
        const b = hero.getBoundingClientRect();
        ptr.x = ((e.clientX - b.left) / b.width - 0.5) * 2;
        ptr.y = ((e.clientY - b.top) / b.height - 0.5) * 2;
      };
      const onLeave = () => {
        ptr.x = 0;
        ptr.y = 0;
      };
      const onClick = () => {
        clicked = 1;
      };
      window.addEventListener('resize', layout);
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('click', onClick);

      let visible = true;
      let running = false;
      let raf = 0;
      const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
      const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

      const frame = (now: number) => {
        if (!visible || document.hidden || disposed) {
          running = false;
          return;
        }
        const t = (now - t0) / 1000;
        const b = hero.getBoundingClientRect();
        const target = Math.max(clamp(-b.top / (b.height * 0.5), 0, 1), clicked);
        progress += (target - progress) * 0.06;
        const p = ease(clamp(progress, 0, 1));

        rot.x += (ptr.y * 0.14 - rot.x) * 0.05;
        rot.y += (ptr.x * 0.22 - rot.y) * 0.05;
        group.rotation.set(base.x + rot.x, base.y + rot.y, base.z);

        if (p > 0.985 && landedAt < 0) landedAt = t;
        if (p < 0.5) landedAt = -1;
        for (const tile of tiles) {
          let z = Math.sin(t * 0.9 + tile.phase) * 0.05;
          if (landedAt >= 0) {
            const k = (t - landedAt) * 4 - tile.d;
            z += Math.exp(-k * k * 1.6) * 0.32 * Math.exp(-(t - landedAt) * 0.9);
          }
          tile.mesh.position.z = z;
        }

        const hover = Math.sin(t * 1.4) * 0.12 * (1 - p);
        piece.position.set(sx + (1 - p) * 0.35, sy + (1 - p) * 1.05 + hover, (1 - p) * 2.2);
        piece.rotation.set((1 - p) * 0.55, (1 - p) * -0.5, (1 - p) * 0.7);
        outlineMat.opacity = 1 - p;
        glow.position.copy(piece.position).applyMatrix4(group.matrixWorld);
        glow.position.z += 1.2;
        glow.intensity = 0.6 * (1 - p) + 0.25;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };
      const kick = () => {
        if (!running && visible && !document.hidden && !disposed) {
          running = true;
          raf = requestAnimationFrame(frame);
        }
      };
      const io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        kick();
      });
      io.observe(hero);
      document.addEventListener('visibilitychange', kick);

      hero.classList.add('gl-ready');
      kick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        document.removeEventListener('visibilitychange', kick);
        darkQuery.removeEventListener('change', paint);
        window.removeEventListener('resize', layout);
        hero.removeEventListener('pointermove', onMove);
        hero.removeEventListener('pointerleave', onLeave);
        canvas.removeEventListener('click', onClick);
        hero.classList.remove('gl-ready');
        geo.dispose();
        matInk.dispose();
        matSoft.dispose();
        matOrange.dispose();
        outlineMat.dispose();
        renderer.dispose();
      };
    };

    // Wait until the browser is idle so text and layout come first.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const timer = w.requestIdleCallback ? w.requestIdleCallback(() => void start()) : window.setTimeout(() => void start(), 200);

    return () => {
      disposed = true;
      if (!w.requestIdleCallback) window.clearTimeout(timer);
      cleanup();
    };
  }, []);

  return <canvas id="gl" ref={canvasRef} role="img" aria-label={label} data-cursor="drop" />;
}
