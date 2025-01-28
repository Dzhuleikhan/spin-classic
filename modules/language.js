import { changeModalLanguage } from "./modalLanguage";
import { translations } from "/public/translations";
import { getLocation } from "./geoLocation";
import { setPaymentMethods } from "./footerPayments";
import { paymentCountries } from "../public/payments";
import gsap from "gsap";
import { settingBonusValueAndAmount } from "./settingBonusValue";

let lang;

function updateContent(lang) {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.innerHTML = translations[lang][key];
  });
}

function changeLanguage(lang) {
  updateContent(lang);
  changeModalLanguage(lang);
}

export const availableLang = [
  "en",
  "es",
  "fr",
  "az",
  "uz",
  "ua",
  "ru",
  "bd",
  "tr",
  "id",
  "pt",
  "de",
  "kz",
  "kg",
];

async function determineLanguage() {
  const location = await getLocation();
  const countryLangMap = {
    EN: "en",
    ES: "es",
    FR: "fr",
    AZ: "az",
    UZ: "uz",
    UA: "ua",
    RU: "ru",
    BD: "bd",
    TR: "tr",
    ID: "id",
    PT: "pt",
    DE: "de",
    KZ: "kz",
    KG: "kg",
    // Add more country codes and their corresponding languages as needed
  };
  lang = countryLangMap[location.countryCode] || "en";

  return lang;
}

async function mainFunction() {
  try {
    lang = await determineLanguage();
    changeLanguage(lang);
    gsap.to(".preloader", { opacity: 0, duration: 0.5 });
    document.querySelector(".wrapper").classList.remove("hidden");
    settingBonusValueAndAmount(
      localStorage.getItem("preferredLanguage").toUpperCase(),
    );
  } catch (error) {
    console.error("Error determining language:", error);
  }
}
mainFunction();

document.querySelectorAll(".language-link").forEach((langBtn) => {
  langBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetLang = e.target.getAttribute("data-lang");
    changeLanguage(targetLang);
    changeModalLanguage(targetLang);
    setPaymentMethods(paymentCountries, targetLang);
  });
});
