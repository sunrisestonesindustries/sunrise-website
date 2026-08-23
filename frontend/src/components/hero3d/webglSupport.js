// Capability detection for the 3D hero.
// Decides whether a visitor gets the full WebGL experience or the static
// fallback. Errs on the side of the fallback: the homepage must always render
// fast and correctly, even on old phones, locked-down browsers, or when WebGL
// is disabled entirely.

export function hasWebGL() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl && typeof gl.getParameter === 'function');
  } catch (_error) {
    return false;
  }
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Coarse pointer + narrow viewport is a strong signal for a phone. We keep the
// full 3D scene for desktops/laptops and hand phones the static hero so we never
// pay the WebGL cost on the most battery- and bandwidth-constrained devices.
export function isLikelyMobile() {
  if (typeof window === 'undefined') {
    return false;
  }
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 820;
  return Boolean(coarse && narrow);
}

// Very rough "is this machine weak" heuristic. deviceMemory / hardwareConcurrency
// are advisory and not present everywhere, so missing values are treated as "fine".
export function isLowPowerDevice() {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const memory = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;
  if (typeof memory === 'number' && memory > 0 && memory <= 3) {
    return true;
  }
  if (typeof cores === 'number' && cores > 0 && cores <= 2) {
    return true;
  }
  return false;
}

// Single source of truth used by Hero3D. Returns true only when we're confident
// the device can show the immersive scene comfortably.
export function shouldRender3D() {
  if (typeof window === 'undefined') {
    return false; // never during prerender/SSR
  }
  if (prefersReducedMotion()) {
    return false;
  }
  if (isLikelyMobile()) {
    return false;
  }
  if (isLowPowerDevice()) {
    return false;
  }
  return hasWebGL();
}
