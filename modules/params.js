// Function to get a URL parameter by name
export function getUrlParameter(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Function to add or update a URL parameter
export function setUrlParameter(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({ path: url.href }, "", url.href);
}

function showSocialsMethod(method) {
  document.querySelectorAll(".form-type-btn").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".form-group").forEach((inputs) => {
    inputs.classList.remove("active");
  });
  document
    .querySelector(`.form-type-buttons div[data-tab='${method}']`)
    .classList.add("active");
  document.querySelector(`.form-group-${method}`).classList.add("active");
}

// Ensure 'modal' parameter is set to 'sign-up-2-steps' by default
let modal = getUrlParameter("modal") || "socials";
setUrlParameter("modal", modal);

// Ensure 'method' parameter is set to 'google,fb' by default
let method = getUrlParameter("method") || "google,fb";
setUrlParameter("method", method);

if (modal === "socials") {
  if (!getUrlParameter("method-type")) {
    addUrlParameter("method-type", "email");
  }
  const method = getUrlParameter("method-type");
  if (method === "phone") {
    showSocialsMethod("phone");
  } else {
    showSocialsMethod("email");
  }
}

// Ensure 'mode' parameter is set to 'fixed' by default
let mode = getUrlParameter("mode") || "fixed";
setUrlParameter("mode", mode);

// Check if 'bonus' parameter exists and do something if it does
let bonus = getUrlParameter("bonus");
const bonusWrapper = document.querySelector(".bonus-wrapper");
const bonusWrapperInput = document.querySelector(".bonus-input");

// Function to update the URL with a new parameter and value
export function updateUrl(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({ path: url.href }, "", url.href);
}

// Function to add a parameter to the URL
function addUrlParameter(key, value) {
  var url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({ path: url.href }, "", url.href);
}
