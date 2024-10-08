import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { showModal } from "./modal";
import { mm } from "./animations";

const nums = [
  22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5,
  315, 337.5, 360,
];

const buttonTl = gsap.timeline({ paused: false });
const firstRotateTl = gsap.timeline();

buttonTl.to(".spin-btn-text", {
  scale: 1.2,
  rotate: 5,
  ease: "none",
  repeat: -1,
  yoyo: true,
  duration: 0.5,
});

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

const firstClick = new Audio("./audio/first-click.mp3");
const proccessAndWin = new Audio("./audio/proccess-and-win.mp3");
const proccessAndLose = new Audio("./audio/proccess-and-lose.mp3");

const spinBtn = document.querySelector(".spin-btn");
const spinBtnText = document.querySelector(".spin-btn-text");
const spinBtnLoader = document.querySelector(".spin-btn-loader");

let spinAmount = 0;

spinBtn.addEventListener("click", () => {
  document.querySelectorAll(".dark-overlay").forEach((el) => {
    el.classList.add("is-hidden");
  });
  // Desktop
  mm.add("(min-width: 768px)", () => {
    gsap.to(".camel-img", {
      duration: 0.5,
      filter: "brightness(1)",
    });
    gsap.to(".wheel-action-text", {
      y: 60,
      alpha: 0,
      duration: 0.5,
      delay: 0.2,
    });
  });
  // Mobile
  mm.add("(max-width: 480px) and (max-height: 700px)", () => {
    gsap.to(".camel-img", {
      y: 100,
      duration: 0.5,
      filter: "brightness(1)",
    });
    gsap.to(".wheel-action-text", {
      y: 60,
      alpha: 0,
      duration: 0.5,
      delay: 0.2,
    });
  });
  mm.add("(max-width: 480px) and (min-height: 600px)", () => {
    gsap.to(".camel-img", {
      duration: 0.5,
      filter: "brightness(1)",
    });
    gsap.to(".wheel-action-text", {
      y: 60,
      alpha: 0,
      duration: 0.5,
      delay: 0.2,
    });
  });
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
    proccessAndLose.play();
  }, 500);
  buttonTl.pause();
  gsap.to(".main-wheel", {
    rotate: 360 * 15 - nums[8],
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.126,0.382 0.138,0.424 0.266,0.624 0.406,0.845 0.818,1.001 1,1 ",
    ),
    delay: 0.5,
    duration: 7,
    onComplete: () => {
      setTimeout(() => {
        showModal();
      }, 500);
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
      spinAmount++;
      buttonTl.play();

      if (spinAmount === 1) {
        buttonTl.kill();
        spinBtn.style.pointerEvents = "none";
      }
    },
  });

  if (typeof firstRotateTl !== "undefined") {
    firstRotateTl.kill();
  }
});
