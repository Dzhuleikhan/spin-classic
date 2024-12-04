const modalOpenBtn = document.querySelectorAll(".modal-open-btn");
const formOverlay = document.querySelector(".form-overlay");
const formModalClosebtn = document.querySelector(".form-modal-close-btn");
const tryToCloseWindow = document.querySelector(".try-to-close");

modalOpenBtn.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", (e) => {
      let modalTab = e.target.getAttribute("data-modal");
      formOverlay.classList.add("is-open");
    });
  }
});

if (formModalClosebtn) {
  formModalClosebtn.addEventListener("click", () => {
    tryToCloseWindow.classList.remove("hidden");
  });
}

if (tryToCloseWindow) {
  tryToCloseWindow.addEventListener("click", (e) => {
    if (e.target.classList.contains("keep-registering")) {
      tryToCloseWindow.classList.add("hidden");
    } else if (e.target.classList.contains("return-to-website")) {
      tryToCloseWindow.classList.add("hidden");
      formOverlay.classList.remove("is-open");
    }
  });
}
