import { Power4, Circ, gsap, Power1, Power2 } from "gsap";
import { CustomEase } from "gsap/all";
gsap.registerPlugin(CustomEase);

const moneyTl = gsap.timeline();
let mm = gsap.matchMedia();

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
mm.add("(max-width: 576px)", () => {
  // this setup code only runs when viewport is at least 800px wide
  gsap.set(".player", { left: "50%", xPercent: -50 });
});

gsap.fromTo(
  ".ball",
  { x: 20 },
  { x: -20, ease: "none", yoyo: true, duration: 2, yoyo: true, repeat: -1 },
);

const buttonTl = gsap.timeline({ paused: false });
buttonTl.to(".spin-btn-text", {
  scale: 1.2,
  rotate: 5,
  ease: "none",
  repeat: -1,
  yoyo: true,
  duration: 1,
});

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

const firstRotateTl = gsap.timeline();

gsap.set(".main-wheel", {
  left: "50%",
  top: "50%",
  xPercent: -50,
  yPercent: -50,
});

firstRotateTl.fromTo(
  ".main-wheel",
  { rotate: -3 },
  {
    rotate: 3,
    transformOrigin: "center center",
    repeat: -1,
    duration: 1.5,
    yoyo: true,
    ease: "none",
  },
);

const nums = [
  0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5,
  315, 337.5, 360,
];

let currentRotation = 0;
let spinAmount = 0;

const firstClick = new Audio("./audio/first-click.mp3");
const proccessAndWin = new Audio("./audio/proccess-and-win.mp3");

const spinBtn = document.querySelector(".spin-btn");
const spinBtnText = document.querySelector(".spin-btn-text");
const spinBtnLoader = document.querySelector(".spin-btn-loader");

spinBtn.addEventListener("click", () => {
  spinBtn.style.pointerEvents = "none";
  firstClick.play();
  gsap.to(spinBtnText, {
    scale: 0.2,
    opacity: 0,
    ease: "none",
    duration: 0.5,
  });
  gsap.fromTo(
    spinBtnLoader,
    {
      opacity: 0,
      scale: 0,
      visibility: "hidden",
    },
    {
      opacity: 1,
      scale: 1,
      visibility: "visible",
      duration: 0.5,
      ease: "none",
    },
  );
  setTimeout(() => {
    proccessAndWin.play();
  }, 500);
  buttonTl.pause();
  if (spinAmount === 2) return;
  let randomIndex = Math.floor(Math.random() * nums.length);
  let randomRotation = nums[randomIndex];

  gsap.to(".main-wheel", {
    rotate: currentRotation + 360 * 15 - randomRotation,
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.126,0.382 0.138,0.424 0.266,0.624 0.406,0.845 0.818,1.001 1,1 ",
    ),
    delay: 0.5,
    duration: 7,
    onComplete: () => {
      spinBtn.style.pointerEvents = "auto";
      gsap.to(spinBtnText, {
        scale: 1,
        opacity: 1,
        ease: "none",
        duration: 0.5,
      });
      gsap.to(spinBtnLoader, {
        opacity: 0,
        scale: 0,
        visibility: "hidden",
        duration: 0.5,
        ease: "none",
      });
      currentRotation = currentRotation + 360 * 15 - randomRotation; // Update the current rotation position
      gsap.set(".main-wheel", { rotate: currentRotation % 360 }); // Normalize the rotation to keep it within 0-360 degrees
      spinAmount++;
      buttonTl.play();

      if (spinAmount === 2) {
        buttonTl.kill();
        spinBtn.style.pointerEvents = "none";
      }
    },
  });

  if (typeof firstRotateTl !== "undefined") {
    firstRotateTl.kill();
  }
});
