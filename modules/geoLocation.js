import { hidePreloader } from "./phoneRotate";

export async function getLocation() {
  let url = "https://cdndigitaloceanspaces.cloud/geoip";
  let response = await fetch(url);
  let data = await response.json();
  localStorage.setItem("preferredLanguage", data.countryCode.toLowerCase());
  hidePreloader();

  return data;
}

export const geoData = await getLocation();
