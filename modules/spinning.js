import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { mm } from "./animations";

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

gsap.set(modal, { scale: 0, opacity: 0, visibility: "hidden" });

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
const proccessAndLose = new Audio("./audio/proccess-and-lose.mp3");
const proccessAndWin = new Audio("./audio/proccess-and-win.mp3");

const spinBtn = document.querySelector(".spin-btn");
const spinBtnText = document.querySelector(".spin-btn-text");
const spinBtnLoader = document.querySelector(".spin-btn-loader");

function showModal(modal) {
  document.body.style.overflow = "hidden";
  overlay.classList.add("is-open");
  document.querySelectorAll(".modal").forEach((m) => {
    m.classList.add("hidden");
  });
  document.querySelector(`.${modal}`).classList.remove("hidden");
  gsap.to(`.${modal}`, {
    scale: 1,
    opacity: 1,
    visibility: "visible",
    duration: 0.3,
    ease: "none",
  });
}

function hideModal() {
  document.body.style.overflow = "visible";
  overlay.classList.remove("is-open");
  document.querySelectorAll(".modal").forEach((m) => {
    m.classList.add("hidden");
  });
  gsap.set(".modal", {
    scale: 0,
    opacity: 0,
    visibility: "hidden",
    duration: 0.3,
    ease: "none",
  });
}

let spinAmount = parseInt(localStorage.getItem("spinAmount")) || 0;
let currentRotation = parseInt(localStorage.getItem("currentRotation")) || 0;
let modalMemory = localStorage.getItem("modal");

if (spinAmount >= 1) {
  gsap.set(".wheel-action-text", { display: "none" });
}

if (modalMemory === "lose") {
  showModal("modal-lose");
} else if (modalMemory === "win") {
  showModal("modal-win");
  buttonTl.pause();
  spinBtn.style.pointerEvents = "none";
}
if (currentRotation !== 0) {
  // Restore the wheel rotation if there's a saved state
  gsap.set(".wheel", { rotate: currentRotation });
}

const Spinning = () => {
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
  buttonTl.pause();
  setTimeout(() => {
    if (spinAmount < 1) {
      proccessAndLose.play();
    } else {
      proccessAndWin.play();
    }
  }, 500);
  const targetRotationLose = currentRotation + (360 * 15 - nums[0]);
  const targetRotationWin = currentRotation + (360 * 15 - nums[3]);

  gsap.to(".main-wheel", {
    rotate: spinAmount >= 1 ? targetRotationWin + 45 : targetRotationLose,
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.126,0.382 0.138,0.424 0.266,0.624 0.406,0.845 0.818,1.001 1,1 ",
    ),
    delay: 0.5,
    duration: 7,
    onComplete: () => {
      firstRotateTl.kill();
      setTimeout(() => {
        spinAmount++;
        currentRotation = targetRotationLose - nums[0];
        localStorage.setItem("spinAmount", spinAmount);
        localStorage.setItem("currentRotation", currentRotation);
        if (spinAmount > 1) {
          showModal("modal-win");
          localStorage.setItem("modal", "win");
          buttonTl.pause();
          spinBtn.style.pointerEvents = "none";
        } else {
          showModal("modal-lose");
          localStorage.setItem("modal", "lose");
        }
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
      buttonTl.play();
    },
  });
};

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
  mm.add("(max-width: 480px) and (max-height: 800px)", () => {
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
  mm.add("(max-width: 480px) and (min-height: 800px)", () => {
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
  Spinning();
});

const firstModalCloseBtn = document.querySelector(".modal-lose-btn");
firstModalCloseBtn.addEventListener("click", () => {
  hideModal();
});
