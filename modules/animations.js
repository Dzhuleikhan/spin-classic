import gsap from "gsap";
import { CustomEase } from "gsap/all";
gsap.registerPlugin(CustomEase);

export let mm = gsap.matchMedia();

/**
 * Cursor animation
 */

gsap.to(".dot-odd", {
  opacity: 1,
  boxShadow: "0 0 10px 0 #fff",
  duration: 0.5,
  ease: "none",
  repeat: -1,
  yoyo: true,
});
gsap.to(".dot-even", {
  opacity: 1,
  boxShadow: "0 0 10px 0 #fff",
  duration: 0.5,
  ease: "none",
  repeat: -1,
  yoyo: true,
  delay: 0.5,
});

document.addEventListener("DOMContentLoaded", () => {
  mm.add("(min-width: 768px)", () => {
    gsap.fromTo(
      ".spin-flags",
      { scale: 0 },
      { scale: 1, transformOrigin: "bottom center", duration: 1, delay: 1.3 },
    );
    gsap.fromTo(
      ".wheel-action-text",
      { y: 40, alpha: 0 },
      { y: 0, alpha: 1, duration: 0.5, delay: 1.3 },
    );
    gsap.fromTo(
      ".camel-img",
      { x: -100, alpha: 0 },
      { x: 0, alpha: 1, duration: 0.5, delay: 1.3 },
    );
    gsap.fromTo(
      ".plov-img",
      { y: 40, alpha: 0 },
      { y: 0, alpha: 1, duration: 0.5, delay: 1.3 },
    );
    gsap.fromTo(
      ".money-img",
      { y: -40, alpha: 0 },
      { y: 0, alpha: 1, duration: 0.5, delay: 1.3 },
    );
  });

  mm.add("(max-width: 360px) and (max-height: 600px)", () => {
    gsap.fromTo(
      ".camel-img",
      { y: 100, alpha: 0 },
      { y: 0, alpha: 1, duration: 0.5, delay: 1.3 },
    );
  });
});

gsap.to(".money-img", {
  rotate: Math.random() * 20 - 10,
  duration: 2,
  yoyo: true,
  repeat: -1,
});

gsap.fromTo(
  ".spin-flags",
  { scale: 1 },
  {
    scale: 0.95,
    transformOrigin: "bottom center",
    duration: 1,
    delay: 1.3,
    yoyo: true,
    repeat: -1,
  },
);
