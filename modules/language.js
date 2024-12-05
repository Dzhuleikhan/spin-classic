import { changeModalLanguage } from "./modalLanguage";
import { countryCurrencyData } from "../public/data";
import { translations } from "/public/translations";
import { geoData, getLocation } from "./geoLocation";
import { setPaymentMethods } from "./footerPayments";
import { paymentCountries } from "../public/payments";
import gsap from "gsap";

const bonusBoxes = document.querySelectorAll(".form-bonus");

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
  settingBonusValueAndAmount(geoData.countryCode);
}

function setActiveLanguageBtn(currentLang) {
  document.querySelectorAll(".language-link").forEach((el) => {
    if (el.getAttribute("data-lang") === currentLang) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function updateButtonText(lang) {
  const headerLangBtn = document.querySelector(".header-lang-btn img");
  const headerLangName = document.querySelector(".header-lang-btn span");

  const languageNames = {
    en: "English",
    es: "Español",
    fr: "Français",
    az: "Azərbaycan dili",
    uz: "Oʻzbekcha",
    ua: "Українська",
    ru: "Русский",
    bd: "বাংলা",
    tr: "Türkçe",
    id: "Bahasa Indonesia",
    pt: "Português",
    de: "Deutsch",
    cn: "中文",
    kz: "Қазақ",
    kg: "Кыргыз тили",
  };
  headerLangBtn.setAttribute(
    "src",
    `./img/flags/${lang}.svg` || `./img/flags/en.svg`,
  );
  headerLangName.innerHTML = languageNames[lang];
  document.querySelector("html").setAttribute("lang", lang);
}

bonusBoxes.forEach((bonusBox) => {
  bonusBox.classList.add("hidden");
});

function settingBonusValueAndAmount(countryCode) {
  let detectedCountry = countryCode.toUpperCase();

  if (detectedCountry === "RU") {
    detectedCountry = "US";
  }
  // Find the matching entry in countryCurrencyData
  const matchingCurrencyData = countryCurrencyData.find((currency) =>
    currency.countries.includes(detectedCountry),
  );

  if (matchingCurrencyData) {
    const bonusCurrency = document.querySelectorAll(".bonus-currency");
    const bonusValue = document.querySelectorAll(".bonus-value");

    // Update the bonus amount and currency on the page
    bonusValue.forEach((amount) => {
      amount.innerHTML = matchingCurrencyData.amount;
    });
    bonusCurrency.forEach((cur) => {
      cur.innerHTML = matchingCurrencyData.countryCurrencySymbol;
    });
    bonusBoxes.forEach((bonusBox) => {
      bonusBox.classList.remove("hidden");
    });
  } else {
    console.log("No matching country found in the data.");
  }
}

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
    localStorage.setItem("preferredLanguage", lang);
    gsap.to(".preloader", { opacity: 0, duration: 0.5 });
    document.querySelector(".wrapper").classList.remove("hidden");
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
    settingBonusValueAndAmount(geoData.countryCode);
    setPaymentMethods(paymentCountries, targetLang);
  });
});
