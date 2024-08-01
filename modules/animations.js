import gsap from "gsap";
import { CustomEase } from "gsap/all";
gsap.registerPlugin(CustomEase);

const moneyTl = gsap.timeline();
let mm = gsap.matchMedia();

gsap.set(".star-odd", { opacity: 0.5 });
gsap.to(".star-odd", {
  opacity: 1,
  duration: 0.5,
  ease: "none",
  repeat: -1,
  yoyo: true,
});
gsap.to(".star-even", {
  opacity: 0.5,
  duration: 0.5,
  ease: "none",
  repeat: -1,
  yoyo: true,
});

moneyTl
  .fromTo(
    ".dollar-pack",
    { yPercent: 150 },
    {
      yPercent: -100,
      rotate: 360,
      ease: "none",
      duration: 7,
      repeat: -1,
    },
  )
  .fromTo(
    ".earl-coin",
    { yPercent: 150 },
    {
      yPercent: -200,
      rotate: 360,
      ease: "none",
      duration: 7,
      repeat: -1,
    },
    "<+0.5",
  )
  .fromTo(
    ".pound-pack",
    { yPercent: 200 },
    {
      yPercent: -200,
      rotate: -360,
      ease: "none",
      duration: 10,
      repeat: -1,
    },
    "<-1",
  )
  .fromTo(
    ".euro-pack",
    { yPercent: 150 },
    {
      yPercent: -200,
      rotate: -360,
      ease: "none",
      duration: 10,
      repeat: -1,
    },
    "<+1",
  )
  .fromTo(
    ".yuan-pack",
    { yPercent: 100 },
    {
      yPercent: -300,
      rotate: 360,
      ease: "none",
      duration: 8,
      repeat: -1,
    },
    "<+1",
  );

gsap.to(".rays", {
  rotate: 360,
  ease: "none",
  duration: 15,
  repeat: -1,
  transformOrigin: "center center",
});

/**
 * Cursor animation
 */

gsap.fromTo(
  ".player",
  { x: -10 },
  { x: 10, ease: "none", yoyo: true, duration: 2, yoyo: true, repeat: -1 },
);
mm.add("(max-width: 992px)", () => {
  // this setup code only runs when viewport is at least 800px wide
  gsap.set(".player", { left: "50%", xPercent: -50 });
});

gsap.fromTo(
  ".ball",
  { x: 20 },
  { x: -20, ease: "none", yoyo: true, duration: 2, yoyo: true, repeat: -1 },
);

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
