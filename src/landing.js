import { gsap } from "gsap";
import { initLenis } from "./js/lenis.js";

initLenis();

const startBtn = document.getElementById("start-btn");

gsap.timeline({ defaults: { ease: "power3.out" } })
  .from(".hero-badge", { y: 18, opacity: 0, duration: 0.6 })
  .from(".hero-title", { y: 28, opacity: 0, duration: 0.8 }, "-=0.35")
  .from(".hero-text", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
  .fromTo(
    "#start-btn",
    { y: 18, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.55,
      clearProps: "transform,opacity"
    },
    "-=0.35"
  );

startBtn.addEventListener("click", function () {
  window.location.href = "./match.html";
});