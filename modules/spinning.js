import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { mm } from "./animations";

const overlay = document.querySelector(".overlay");

const modal = gsap.utils.toArray(".modal");

modal.forEach((modal) => {
  gsap.set(modal, { scale: 0, opacity: 0, visibility: "hidden" });
});

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

function showModal(mod) {
  document.body.style.overflow = "hidden";
  overlay.classList.add("is-open");
  document.querySelectorAll(".modal").forEach((m) => {
    m.classList.add("hidden");
  });
  document.querySelector(`.${mod}`).classList.remove("hidden");
  modal.forEach((modal) => {
    gsap.to(modal, {
      scale: 1,
      opacity: 1,
      visibility: "visible",
      duration: 0.3,
      ease: "none",
    });
  });
}

function hideModal() {
  document.body.style.overflow = "visible";
  overlay.classList.remove("is-open");
  modal.forEach((modal) => {
    gsap.set(modal, {
      scale: 0,
      opacity: 0,
      visibility: "hidden",
      duration: 0.3,
      ease: "none",
    });
  });
}

let spinAmount = parseInt(localStorage.getItem("spinAmount")) || 0;
let currentRotation = parseInt(localStorage.getItem("currentRotation")) || 0;
let modalMemory = localStorage.getItem("modal");

gsap.set(".win-rays", {
  left: "50%",
  top: "50%",
  xPercent: -50,
  yPercent: -50,
});

const modalTL = gsap.timeline();
modalTL
  .to(".win-rays", {
    rotate: 360,
    ease: "none",
    duration: 10,
    repeat: -1,
  })
  .to(
    ".modal-cup",
    {
      scale: 1.1,
      rotate: 10,
      ease: "none",
      yoyo: true,
      repeat: -1,
    },
    "<",
  )
  .to(
    ".modal-money",
    {
      rotate: 10,
      ease: "none",
      duration: 5,
      yoyo: true,
      repeat: -1,
    },
    "<",
  )
  .to(
    ".modal-camel-img",
    {
      x: 30,
      ease: "none",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
    },
    "<",
  )
  .to(
    ".star-1",
    {
      scale: 0.5,
      ease: "none",
      duration: 0.7,
      yoyo: true,
      repeat: -1,
    },
    "<",
  )
  .to(
    ".star-2",
    {
      scale: 1.5,
      ease: "none",
      duration: 0.7,
      yoyo: true,
      repeat: -1,
    },
    "<",
  )
  .to(
    ".star-3",
    {
      scale: 1.5,
      ease: "none",
      duration: 0.7,
      yoyo: true,
      repeat: -1,
    },
    "<",
  )
  .to(
    ".star-4",
    {
      scale: 1.5,
      ease: "none",
      duration: 0.7,
      yoyo: true,
      repeat: -1,
    },
    "<",
  );

let timeoutId;

if (modalMemory) {
  if (modalMemory === "lose") {
    showModal("modal-lose");
    buttonTl.pause();
    spinBtn.style.pointerEvents = "none";
  } else if (modalMemory === "win") {
    showModal("modal-win");
    timeoutId = setTimeout(() => {
      hideModal();
      document.querySelector(".form-overlay").classList.add("is-open");
    }, 5000);
    modalTL.play();
  }
}

if (currentRotation !== 0) {
  // Restore the wheel rotation if there's a saved state
  gsap.set(".main-wheel", { rotate: currentRotation });
}

document.querySelectorAll(".win-amount").forEach((win) => {
  win.innerHTML = localStorage.getItem("lastWinAmount");
});

const Spinning = () => {
  document.querySelectorAll(".dark-overlay").forEach((el) => {
    el.classList.add("is-hidden");
  });
  // Desktop
  mm.add("(min-width: 768px)", () => {
    gsap.to(".horse-img", {
      duration: 0.5,
      filter: "brightness(1)",
    });
  });
  // Mobile
  mm.add("(max-width: 480px) and (max-height: 800px)", () => {
    gsap.to(".horse-img", {
      y: 100,
      duration: 0.5,
      filter: "brightness(1)",
    });
  });
  mm.add("(max-width: 480px) and (min-height: 800px)", () => {
    gsap.to(".horse-img", {
      y: 100,
      duration: 0.5,
      filter: "brightness(1)",
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
  buttonTl.pause();
  setTimeout(() => {
    if (spinAmount < 1) {
      proccessAndLose.play();
    } else {
      proccessAndWin.play();
    }
  }, 500);

  const winRandoms = {
    1: "8.000",
    3: "500",
    5: "2.000",
    7: "4.500",
    9: "10.000",
    11: "7.500",
    13: "13.000",
    15: "17.000",
  };

  const keys = Object.keys(winRandoms);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const randomValue = winRandoms[randomKey];

  const targetRotationLose = currentRotation + (360 * 15 - nums[0]);
  const targetRotationWin = currentRotation + (360 * 15 - nums[randomKey]);

  gsap.to(".main-wheel", {
    rotate: spinAmount >= 1 ? targetRotationWin + 45 : targetRotationLose,
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.126,0.382 0.138,0.424 0.266,0.624 0.406,0.845 0.818,1.001 1,1 ",
    ),
    delay: 0.5,
    duration: 7,
    onComplete: () => {
      firstRotateTl.pause();
      setTimeout(() => {
        saveDataToLocalStorage();
        spinAmount++;
        currentRotation = targetRotationLose - nums[0];
        localStorage.setItem("spinAmount", spinAmount);
        localStorage.setItem("currentRotation", currentRotation);
        buttonTl.pause();
        spinBtn.style.pointerEvents = "none";
        if (spinAmount > 1) {
          document.querySelectorAll(".win-amount").forEach((win) => {
            win.innerHTML = randomValue;
          });
          localStorage.setItem("lastWinAmount", randomValue);
          showModal("modal-win");
          localStorage.setItem("modal", "win");
          setTimeout(() => {
            hideModal();
            modalTL.play();
            document.querySelector(".form-overlay").classList.add("is-open");
          }, 5000);
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
  Spinning();
});

const firstModalCloseBtn = document.querySelector(".modal-lose-btn");
firstModalCloseBtn.addEventListener("click", () => {
  Spinning();
  hideModal();
});
const claimPrizeBtn = document.querySelector(".claim-prize-btn");

if (claimPrizeBtn) {
  claimPrizeBtn.addEventListener("click", () => {
    hideModal();
    document.querySelector(".form-overlay").classList.add("is-open");
  });
}

function saveDataToLocalStorage() {
  const now = new Date().getTime(); // Get the current time in milliseconds

  localStorage.setItem("saveTime", now.toString()); // Store time as a string
}

function checkDataExpiry() {
  const now = new Date().getTime(); // Get the current time
  const saveTime = localStorage.getItem("saveTime"); // Get saved time from localStorage

  if (saveTime) {
    const timeDifference = now - parseInt(saveTime); // Calculate time difference in milliseconds
    const hoursPassed = timeDifference / (1000 * 60 * 60); // Convert to minutes

    // Check if 1 minute has passed
    if (hoursPassed >= 12) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      localStorage.clear();
      hideModal();
      document.querySelector(".form-overlay").classList.remove("is-open");
      firstRotateTl.play();
      spinBtn.style.pointerEvents = "auto";
      location.reload();
    } else {
      console.log("Data is still valid.");
    }
  } else {
    console.log("No data found in localStorage.");
  }
}

// Example usage to check:
checkDataExpiry();
