"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { africaPoint } from "./africa-map";

/**
 * Nuage de particules 3D (fond fixe de tout le site).
 * Il se place automatiquement sur l'élément [data-cloud] le plus proche du
 * centre de l'écran et prend la forme indiquée par son attribut data-mix :
 * 0 = carte de l'Afrique, 1 = sphère, 2 = goutte, 3 = anneau (boutique, recettes).
 * data-shape="ring" : l'échelle suit la largeur de l'ancre au lieu de sa hauteur.
 * data-still : le nuage cesse de tourner et reste de face (carte cliquable).
 * L'événement window "nuage:explode" (detail 0 ou 1) disperse les particules
 * pendant les transitions de page.
 */

const VERT = /* glsl */ `
attribute vec3 t0; attribute vec3 t1; attribute vec3 t2; attribute vec3 t3; attribute float aRand;
uniform float uMix, uTime, uExplode, uPR, uForce; uniform vec3 uMouse; varying vec3 vCol; varying float vA;
void main(){
  float m = uMix; float d = aRand * .35;
  vec3 p = mix(t0, t1, smoothstep(0. + d, .65 + d, m));
  p = mix(p, t2, smoothstep(1. + d, 1.65 + d, m));
  p = mix(p, t3, smoothstep(2. + d, 2.65 + d, m));
  p += .035 * sin(uTime * 1.4 + aRand * 6.283 + p.yzx * 3.);
  p += normalize(p + vec3(.001)) * uExplode * (0.6 + aRand * 3.5);
  vec3 dm = p - uMouse; float f = smoothstep(1.3, 0., length(dm.xy)); p += normalize(dm + vec3(.001)) * f * .55 * uForce;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.4 + aRand * 2.2) * uPR * (9. / -mv.z);
  vec3 a = vec3(1., .35, .15), b = vec3(1., .82, .45), c = vec3(1., .95, .9);
  vCol = mix(a, b, smoothstep(-1.6, 1.8, p.y + sin(p.x * 1.5) * .4));
  vCol = mix(vCol, c, step(.94, aRand) * .8);
  vA = .55 + .45 * aRand;
}`;

const FRAG = /* glsl */ `
uniform float uAlpha; varying vec3 vCol; varying float vA;
void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, .0, d); gl_FragColor = vec4(vCol, a * vA * uAlpha * .85); }`;

function buildTargets(N: number) {
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  const T = [0, 1, 2, 3].map(() => new Float32Array(N * 3));
  const rand = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    rand[i] = Math.random();
    const [x, y] = africaPoint();
    T[0].set([x, y, rnd(-0.06, 0.06)], i * 3);
    let dx = rnd(-1, 1), dy = rnd(-1, 1), dz = rnd(-1, 1);
    const dl = Math.hypot(dx, dy, dz) || 1; dx /= dl; dy /= dl; dz /= dl;
    const rr = (1.35 + 0.22 * Math.sin(dx * 5) * Math.cos(dy * 4) + 0.12 * Math.sin(dz * 9)) * (Math.random() < 0.8 ? 1 : Math.cbrt(Math.random()));
    T[1].set([dx * rr, dy * rr * 0.92, dz * rr], i * 3);
    let ex = dx, ey = dy, ez = dz;
    if (ey > 0) { const f = 1 - Math.pow(ey, 0.9); ex *= f; ez *= f; ey *= 1.9; }
    T[2].set([ex * 1.3, ey * 1.3 - 0.35, ez * 1.3], i * 3);
    const ang = Math.random() * Math.PI * 2, rad = 1.2 + Math.pow(Math.random(), 2) * 1.6, arm = Math.floor(Math.random() * 3) * 2.094;
    T[3].set([Math.cos(ang + arm + rad * 1.4) * rad, rnd(-0.12, 0.12) * (3 - rad), Math.sin(ang + arm + rad * 1.4) * rad], i * 3);
  }
  return { T, rand };
}

export function NuageCloud() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let raf = 0, explode = 0, mx = 0, my = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Sans WebGL (vieux appareil, mode économie…), on se passe simplement du nuage.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    const PR = Math.min(2, window.devicePixelRatio);
    renderer.setPixelRatio(PR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;

    const N = window.innerWidth < 700 ? 9000 : 16000;
    const { T, rand } = buildTargets(N);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(T[0].slice(), 3));
    T.forEach((a, i) => geo.setAttribute("t" + i, new THREE.BufferAttribute(a, 3)));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    const uni = {
      uMix: { value: 0 }, uTime: { value: 0 }, uExplode: { value: 1 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) }, uForce: { value: 1 }, uPR: { value: PR }, uAlpha: { value: 1 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: uni, vertexShader: VERT, fragmentShader: FRAG,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const cloud = new THREE.Points(geo, mat);
    scene.add(cloud);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    const onMove = (e: MouseEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    const onExplode = (e: Event) => { explode = Number((e as CustomEvent<number>).detail) || 0; };
    window.addEventListener("resize", onResize);
    // Souris : les particules fuient le curseur en permanence. Écran tactile : seulement
    // pendant que le doigt touche ou glisse, puis elles reviennent en douceur.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let touching = false, tx = 0, ty = 0, force = finePointer ? 1 : 0;
    const onTouch = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (e.type === "pointerup" || e.type === "pointercancel") { touching = false; return; }
      touching = true;
      tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5;
    };
    if (finePointer) window.addEventListener("mousemove", onMove);
    else for (const t of ["pointerdown", "pointermove", "pointerup", "pointercancel"]) window.addEventListener(t, onTouch as EventListener, { passive: true });
    window.addEventListener("nuage:explode", onExplode);

    const clock = new THREE.Clock();
    const cur = { x: 2, y: 0, s: 1, mix: 0, ex: 1, al: 1 };
    const sm = { x: 0, y: 0 };
    let spin = 0, last = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime() * (reduced ? 0.3 : 1);
      const W = window.innerWidth, H = window.innerHeight;
      const hh = Math.tan((35 * Math.PI) / 360) * 9, hw = hh * camera.aspect;

      let best: DOMRect | null = null, bestEl: HTMLElement | null = null, bd = 1e9;
      document.querySelectorAll<HTMLElement>("[data-cloud]").forEach((a) => {
        const r = a.getBoundingClientRect();
        if (r.width < 10) return;
        const d = Math.hypot(r.left + r.width / 2 - W / 2, r.top + r.height / 2 - H / 2);
        if (d < bd) { bd = d; best = r; bestEl = a; }
      });

      const tg = { x: hw * 0.55, y: 0, s: 1, mix: 0, ex: explode, al: 0.25 };
      let still = false;
      if (best && bestEl) {
        const r = best as DOMRect, a = bestEl as HTMLElement;
        const ring = a.dataset.shape === "ring";
        tg.x = ((r.left + r.width / 2) / W * 2 - 1) * hw;
        tg.y = -((r.top + r.height / 2) / H * 2 - 1) * hh;
        tg.s = ring ? (r.width / W) * 2 * hw / 5.8 : (r.height / H) * 2 * hh / 3.7;
        tg.mix = parseFloat(a.dataset.mix ?? "0") || 0;
        tg.al = bd < H * 0.9 ? (ring ? 0.7 : 1) : 0.15;
        still = a.dataset.still !== undefined && bd < H * 0.9;
      }
      // Sur une carte immobile, position et taille collent à l'ancre (sinon, au défilement,
      // le nuage traîne derrière les points des pays) ; ailleurs, elles glissent en douceur.
      (Object.keys(tg) as (keyof typeof tg)[]).forEach((k) => {
        const rate = k === "ex" ? 0.06 : k === "mix" ? 0.08 : k === "al" ? 0.1 : still ? 1 : 0.1;
        cur[k] += (tg[k] - cur[k]) * rate;
      });
      sm.x += (mx - sm.x) * 0.08; sm.y += (my - sm.y) * 0.08;

      const ringView = cur.mix > 2.5 ? 0.9 : 0;
      cloud.position.set(cur.x, cur.y + (still ? 0 : Math.sin(t * 0.8) * 0.05), 0);
      cloud.scale.setScalar(Math.max(0.2, cur.s));
      // Rotation continue, sauf sur une carte « immobile » : on revient alors de face (tour complet le plus proche).
      const dt = Math.min(0.1, t - last); last = t;
      if (still) spin += (Math.round(spin / (Math.PI * 2)) * Math.PI * 2 - spin) * 0.06;
      else spin += dt * 0.12;
      const wobble = still ? 0.15 : 1;
      cloud.rotation.set((sm.y * 0.35 + ringView) * wobble, spin + sm.x * 0.6 * wobble, 0);
      if (finePointer) uni.uMouse.value.set((sm.x * 2 * hw - cur.x) / cur.s, (-sm.y * 2 * hh - cur.y) / cur.s, 0);
      else {
        // Le point de contact suit le doigt ; au relâchement, il reste en place et la force retombe.
        if (touching) uni.uMouse.value.set((tx * 2 * hw - cur.x) / cur.s, (-ty * 2 * hh - cur.y) / cur.s, 0);
        force += ((touching ? 1 : 0) - force) * (touching ? 0.25 : 0.06);
      }
      uni.uForce.value = force;
      uni.uMix.value = cur.mix; uni.uTime.value = t; uni.uExplode.value = cur.ex; uni.uAlpha.value = cur.al;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      for (const t of ["pointerdown", "pointermove", "pointerup", "pointercancel"]) window.removeEventListener(t, onTouch as EventListener);
      window.removeEventListener("nuage:explode", onExplode);
      geo.dispose(); mat.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} aria-hidden className="pointer-events-none fixed inset-0 z-[1]" />;
}
