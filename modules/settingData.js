import { geoData } from "./geoLocation";
import { countryCurrencyData } from "../public/data";

const wheelCurrency = document.querySelectorAll(".wheel-currency");

function setCurrency(icon, className) {
  const currency = document.querySelectorAll(`.${className}`);
  currency.forEach((cur) => {
    let currencyImg = cur;
    currencyImg.setAttribute("src", icon);
  });
}
export function getCountryCurrencyIcon(inputCountry) {
  for (const data of countryCurrencyData) {
    if (data.countryCurrency.includes(inputCountry)) {
      return data.countryCurrencyIcon;
    }
  }
  return "./img/currencies/eur.svg";
}

async function settingWheelCurrency() {
  try {
    let locationData = geoData;
    let countryInput = locationData.currency.code;
    if (countryInput === "CHE") {
      countryInput = "CHF";
    }
    const currencyIcon = getCountryCurrencyIcon(countryInput);

    setCurrency(currencyIcon, "wheel-currency");
    setCurrency(currencyIcon, "modal-currency");
    showCurrencyImage(currencyIcon);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}

function showCurrencyImage(currencyIcon) {
  wheelCurrency.forEach((el) => {
    el.src = currencyIcon;
    el.style.opacity = 1;
  });
}

settingWheelCurrency();
