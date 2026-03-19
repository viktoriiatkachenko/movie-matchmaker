import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenisInstance = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    autoRaf: true,
    smoothWheel: true,
    lerp: 0.8
  });

  return lenisInstance;
}