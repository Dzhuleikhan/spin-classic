import { getLocation } from "./getLocation";
import { countryCurrencyData } from "../public/data";
import { settingGeoLocation } from "./setGeo";

const wheelCurrency = document.querySelectorAll(".wheel-currency");

function setCurrency(icon) {
  const currency = wheelCurrency;
  currency.forEach((cur) => {
    let currencyImg = cur;
    currencyImg.setAttribute("src", icon);
  });
}
export function getCountryCurrencyIcon(inputCountry) {
  for (const data of countryCurrencyData) {
    if (data.countries.includes(inputCountry)) {
      return data.countryCurrencyIcon;
    }
  }
  return "./img/currencies/usd.svg";
}

async function settingWheelCurrency() {
  try {
    let locationData = await getLocation();
    const countryInput = locationData.country;
    const currencyIcon = getCountryCurrencyIcon(countryInput);

    setCurrency(currencyIcon);
    showCurrencyImage(currencyIcon);

    // Setting geo
    settingGeoLocation(countryInput.toLowerCase(), "country-flag");
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
