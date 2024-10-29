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

// Ensure 'modal' parameter is set to 'sign-up-2-steps' by default
let modal = getUrlParameter("modal") || "socials";
setUrlParameter("modal", modal);

// Ensure 'method' parameter is set to 'google,fb' by default
let method = getUrlParameter("method") || "google,fb";
setUrlParameter("method", method);

// Ensure 'mode' parameter is set to 'fixed' by default
let mode = getUrlParameter("mode") || "fixed";
setUrlParameter("mode", mode);

// Check if 'bonus' parameter exists and do something if it does
let bonus = getUrlParameter("bonus");
const bonusWrapper = document.querySelector(".bonus-wrapper");
const bonusWrapperInput = document.querySelector(".bonus-input");

// if (bonus) {
//   bonusWrapper.classList.remove("hidden");
//   bonusWrapperInput.setAttribute("data-bonus", bonus);
// } else {
//   console.log("No Bonuse");
//   bonusWrapper.classList.add("hidden");
//   bonusWrapperInput.setAttribute("data-bonus", "");
// }

// Function to update the URL with a new parameter and value
export function updateUrl(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({ path: url.href }, "", url.href);
}
