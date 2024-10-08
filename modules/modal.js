import gsap from "gsap";

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalRays = document.querySelector(".modal-rays");

gsap.set(modal, { scale: 0, opacity: 0, visibility: "hidden" });
// gsap.set(modalRays, { left: "50%", top: "50%", xPercent: -50, yPercent: -50 });
// gsap.to(modalRays, {
//   rotate: -360,
//   ease: "none",
//   duration: 10,
//   repeat: -1,
//   transformOrigin: "center center",
// });
export function showModal() {
  document.body.style.overflow = "hidden";
  overlay.classList.add("is-open");
  gsap.to(modal, {
    scale: 1,
    opacity: 1,
    visibility: "visible",
    duration: 0.3,
    ease: "none",
  });

  localStorage.setItem("modal", "open");
}

let modalMemory = localStorage.getItem("modal");

if (modalMemory) {
  showModal();
}
