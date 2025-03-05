import { hidePreloader } from "./phoneRotate";

export async function getLocation() {
  let url =
    "https://apiip.net/api/check?accessKey=0439ba6e-6092-46c2-9aeb-8662065bc43c";
  let response = await fetch(url);
  let data = await response.json();
  localStorage.setItem("preferredLanguage", "az");
  hidePreloader();

  return data;
}

export const geoData = await getLocation();
