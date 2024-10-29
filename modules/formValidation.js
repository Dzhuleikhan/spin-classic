import { iti } from "./formModal";
import { getUrlParameter } from "./params.js";

export let formStepCount = 1;
const formSteps = document.querySelectorAll(".form-step");

export const changingFormSteps = (stepCount) => {
  formSteps.forEach((step) => {
    if (step) {
      formSteps.forEach((el) => {
        el.classList.add("hidden");
      });
      document
        .querySelector(`.form-step-${stepCount}`)
        .classList.remove("hidden");
    }
  });
};
changingFormSteps(formStepCount);

const formModals = document.querySelectorAll(".form-modal");
let formTab = "email";

formModals.forEach((modal) => {
  if (modal) {
    const formTypeBtns = document.querySelectorAll(".form-type-btn");
    const formGroups = document.querySelectorAll(".form-group");

    const formStep1 = modal.querySelector(".form-step-1");
    const formStep2 = modal.querySelector(".form-step-2");
    const formStepBtnPrev = document.querySelector(".form-step-btn-prev");

    // STEP 1
    if (formStep1) {
      const formStepBtnNext = formStep1.querySelector(".form-step-btn-next");

      // Validating Email input
      const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const formGroupEmail = formStep1.querySelector(".form-group-email");
      const emalInput = formGroupEmail.querySelector(".email-input");

      emalInput.addEventListener("focusout", () => {
        if (emalInput.value === "") {
          formGroupEmail
            .querySelector(".not-valid-icon")
            .classList.add("hidden");
          formGroupEmail.classList.remove("not-valid");
        } else if (emalInput.value.match(emailRegEx)) {
          formStepBtnNext.disabled = false;
          formGroupEmail
            .querySelector(".not-valid-icon")
            .classList.add("hidden");
          formGroupEmail.classList.remove("not-valid");
        } else {
          formGroupEmail.classList.add("not-valid");
          formGroupEmail
            .querySelector(".not-valid-icon")
            .classList.remove("hidden");
          formStepBtnNext.disabled = true;
        }
      });

      emalInput.addEventListener("input", () => {
        if (emalInput.value.match(emailRegEx)) {
          formStepBtnNext.disabled = false;
        }
      });

      // Phone validation
      const formGroupPhone = formStep1.querySelector(".form-group-phone");
      const phoneInput = formGroupPhone.querySelector(".phone-input");

      function validatePhoneNumber() {
        if (phoneInput.value === "") {
          formGroupPhone.classList.remove("not-valid");
          formGroupPhone
            .querySelector(".not-valid-icon")
            .classList.add("hidden");
        } else if (!phoneInput.value.trim()) {
          formGroupPhone.classList.add("not-valid");
          formGroupPhone
            .querySelector(".not-valid-icon")
            .classList.remove("hidden");
          formStepBtnNext.disabled = true;
          return false;
        } else if (iti.isValidNumber()) {
          formGroupPhone.classList.remove("not-valid");
          formGroupPhone
            .querySelector(".not-valid-icon")
            .classList.add("hidden");
          formStepBtnNext.disabled = false;
          return true;
        } else {
          formGroupPhone.classList.add("not-valid");
          formGroupPhone
            .querySelector(".not-valid-icon")
            .classList.remove("hidden");
          formStepBtnNext.disabled = true;
          return false;
        }
      }

      // Validating Phone input
      phoneInput.addEventListener("focusout", validatePhoneNumber);

      formStepBtnNext.addEventListener("click", (e) => {
        e.preventDefault();
        formStepCount++;
        changingFormSteps(formStepCount);
        formStepBtnPrev.classList.remove("hidden");
      });
      if (formStepBtnPrev) {
        formStepBtnPrev.addEventListener("click", () => {
          formStepCount--;
          changingFormSteps(formStepCount);
          formStepBtnPrev.classList.add("hidden");
        });
      }

      // Changing tabs in step 1
      formTypeBtns.forEach((btn) => {
        if (btn) {
          btn.addEventListener("click", (e) => {
            let tab = e.target.getAttribute("data-tab");
            formTypeBtns.forEach((el) => {
              el.classList.remove("active");
            });
            btn.classList.add("active");
            formTab = tab;

            if (tab === "email") {
              if (emalInput.value != "" && emalInput.value.match(emailRegEx)) {
                formStepBtnNext.disabled = false;
              } else {
                formStepBtnNext.disabled = true;
              }
            }
            if (tab === "phone") {
              if (phoneInput.value != "" && iti.isValidNumber()) {
                formStepBtnNext.disabled = false;
              } else {
                formStepBtnNext.disabled = true;
              }
            }

            formGroups.forEach((group) => {
              group.classList.remove("active");
            });
            document
              .querySelector(`.form-group-${tab}`)
              .classList.add("active");
          });
        }
      });
    }

    // STEP 2
    if (formStep2) {
      const formStepBtnNext = formStep2.querySelector(".form-step-btn-next");

      // Password validation
      const formGroupPassword = formStep2.querySelector(".form-group-password");
      const passwordInput = formGroupPassword.querySelector(".password-input");
      const passwordShowIcon =
        formGroupPassword.querySelector(".show-password-btn");

      if (formGroupPassword) {
        passwordShowIcon.addEventListener("click", () => {
          if (passwordInput.type === "password") {
            passwordInput.setAttribute("type", "text");
            passwordShowIcon.src = "./img/password-visible.svg";
          } else {
            passwordInput.setAttribute("type", "password");
            passwordShowIcon.src = "./img/password-invisible.svg";
          }
        });
      }

      const validatePassword = () => {
        if (passwordInput.value.length > 6) {
          formStepBtnNext.disabled = false;
          formGroupPassword.classList.remove("not-valid");
          formGroupPassword
            .querySelector(".not-valid-icon")
            .classList.add("hidden");
        } else {
          formStepBtnNext.disabled = true;
          formGroupPassword.classList.add("not-valid");
          formGroupPassword
            .querySelector(".not-valid-icon")
            .classList.remove("hidden");
        }
      };

      // CHECKBOX VALIDATION
      const checkboxInput = formStep2.querySelector(".checkbox-input");

      passwordInput.addEventListener("focusout", validatePassword);
      passwordInput.addEventListener("input", () => {
        if (passwordInput.value.length >= 6) {
          formStepBtnNext.disabled = false;
        } else {
          formStepBtnNext.disabled = true;
        }
      });

      checkboxInput.addEventListener("change", () => {
        if (formTab === "email") {
          if (
            checkboxInput.checked === true &&
            passwordInput.value.length > 6
          ) {
            formStepBtnNext.disabled = false;
          } else {
            formStepBtnNext.disabled = true;
          }
        }
        if (formTab === "phone") {
          if (checkboxInput.checked === true) {
            formStepBtnNext.disabled = false;
          } else {
            formStepBtnNext.disabled = true;
          }
        }
      });
    }
  }
});

const mainForm = document.querySelector("form");
const lang = localStorage.getItem("preferredLanguage");

function disableFormWhileSubmitting() {
  mainForm.classList.add("loading");
  mainForm.querySelector(".main-form-submit-btn").disabled = true;
}

let cid = getUrlParameter("cid");

// Hidden select
// const hiddenSelect = document.getElementById("hidden-select");

// document.addEventListener("keydown", function (event) {
//   if ((event.ctrlKey || event.metaKey) && event.key === "k") {
//     event.preventDefault();
//     if (hiddenSelect.classList.contains("hidden")) {
//       hiddenSelect.classList.remove("hidden");
//       hiddenSelect.focus();
//     } else {
//       hiddenSelect.classList.add("hidden");
//     }
//   }
// });

// let pressTimer;

// // Mobile touch support
// document.addEventListener("touchstart", function () {
//   pressTimer = setTimeout(function () {
//     if (hiddenSelect.classList.contains("hidden")) {
//       hiddenSelect.classList.remove("hidden");
//       hiddenSelect.focus();
//     } else {
//       hiddenSelect.classList.add("hidden");
//     }
//   }, 1000);
// });

// document.addEventListener("touchend", function () {
//   clearTimeout(pressTimer);
// });

if (mainForm) {
  mainForm.addEventListener("keydown", (e) => {
    const step1btn = mainForm.querySelector(".form-step-btn-1");
    const submitBtn = mainForm.querySelector("button[type='submit']");
    const formStepBtnPrev = document.querySelector(".form-step-btn-prev");

    const email = mainForm.querySelector(".email-input");
    const phone = mainForm.querySelector(".phone-input");
    const password = mainForm.querySelector(".password-input");
    const currency = mainForm.querySelector(".currency-input");
    const bonus = mainForm
      .querySelector(".bonus-input")
      .getAttribute("data-bonus");

    let formData = {};
    formData.email = email.value;
    formData.phone = phone.value;
    formData.password = password.value;
    formData.currency = currency.value;
    formData.bonus = bonus;
    formData.lang = lang;

    let code = iti.getSelectedCountryData().dialCode;
    let phoneNumber = phone.value.trim();
    if (code && phoneNumber) {
      let sanitizedPhoneNumber = phoneNumber.replace(/\D/g, "");
      let fullPhoneNumber = `${code}${sanitizedPhoneNumber}`;
      if (iti.isValidNumber()) {
        formData.phone = fullPhoneNumber;
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (formStepCount === 1) {
        if (!step1btn.disabled) {
          formStepCount++;
          changingFormSteps(formStepCount);
          formStepBtnPrev.classList.remove("hidden");
        }
      }
      if (formStepCount === 2) {
        if (!submitBtn.disabled) {
          if (formTab === "email") {
            disableFormWhileSubmitting();
            window.location.href = `https://gbetauth.com/api/register?env=prod&type=${formTab}&currency=${formData.currency}&email=${formData.email}&password=${formData.password}${formData.bonus === "" ? "" : "&bonus=" + formData.bonus}&lang=${formData.lang}${cid ? "&cid=" + cid : ""}`;
          } else if (formTab === "phone") {
            disableFormWhileSubmitting();
            window.location.href = `https://gbetauth.com/api/register?env=prod&type=${formTab}&currency=${formData.currency}&phone=${formData.phone}&password=${formData.password}${formData.bonus === "" ? "" : "&bonus=" + formData.bonus}&lang=${formData.lang}${cid ? "&cid=" + cid : ""}`;
          }
        }
      }
    }
  });

  mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const step1btn = mainForm.querySelector(".form-step-btn-1");

    const email = mainForm.querySelector(".email-input");
    const phone = mainForm.querySelector(".phone-input");
    const password = mainForm.querySelector(".password-input");
    const currency = mainForm.querySelector(".currency-input");
    const bonus = mainForm
      .querySelector(".bonus-input")
      .getAttribute("data-bonus");

    let formData = {};
    formData.email = email.value;
    formData.phone = phone.value;
    formData.password = password.value;
    formData.currency = currency.value;
    formData.bonus = bonus;
    formData.lang = lang;

    let code = iti.getSelectedCountryData().dialCode;
    let phoneNumber = phone.value.trim();
    if (code && phoneNumber) {
      let sanitizedPhoneNumber = phoneNumber.replace(/\D/g, "");
      let fullPhoneNumber = `${code}${sanitizedPhoneNumber}`;
      if (iti.isValidNumber()) {
        formData.phone = fullPhoneNumber;
      }
    }

    if (formStepCount === 1) {
      if (!step1btn.disabled) {
        formStepCount++;
        changingFormSteps(formStepCount);
      }
    }

    if (formTab === "email") {
      disableFormWhileSubmitting();
      window.location.href = `https://gbetauth.com/api/register?env=prod&type=${formTab}&currency=${formData.currency}&email=${formData.email}&password=${formData.password}${formData.bonus === "" ? "" : "&bonus=" + formData.bonus}&lang=${formData.lang}${cid ? "&cid=" + cid : ""}`;
    } else if (formTab === "phone") {
      disableFormWhileSubmitting();
      window.location.href = `https://gbetauth.com/api/register?env=prod&type=${formTab}&currency=${formData.currency}&phone=${formData.phone}&password=${formData.password}${formData.bonus === "" ? "" : "&bonus=" + formData.bonus}&lang=${formData.lang}${cid ? "&cid=" + cid : ""}`;
    }
  });
}

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});

const formSocialLinks = document.querySelectorAll(".form-social-link");

formSocialLinks.forEach((link) => {
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const type = e.target.getAttribute("data-reg-type");
      const bonus = mainForm
        .querySelector(".bonus-input")
        .getAttribute("data-bonus");
      const lang = localStorage.getItem("preferredLanguage");

      let currencyStoredData = localStorage.getItem("currencyData");
      let currencyData = JSON.parse(currencyStoredData);
      let currency = currencyData.abbr;
      window.location.href = `https://gbetauth.com/api/register?env=prod&type=${type}&currency=${currency}${bonus === "" ? "" : "&bonus=" + bonus}&lang=${lang}${cid ? "&cid=" + cid : ""}`;
    });
  }
});
