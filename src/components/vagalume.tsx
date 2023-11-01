import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyB75Ne4dvE_w9f_onvyZ9o8GDGeR6SN_X4";
const CX_CONFIG_ID = "c4adbcc1409844d9e";
const VAGALUME_API_KEY = "76dec6fdc6cf229ed35c04dcbbc97388";

function createUrlToSearch(input: { text: string }): string {
  return `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${CX_CONFIG_ID}&q=${encodeURI(
    input.text
  )}`;
}

function createUrlToGetById(id: string | null): string | null {
  if (id === null) return null;

  const [song, artist] = id.split("#").map((str) => str.trim());

  return `https://api.vagalume.com.br/search.php?art=${encodeURI(
    artist
  )}&mus=${encodeURI(song)}&apikey=${VAGALUME_API_KEY}`;
}

export { createUrlToSearch, createUrlToGetById };
