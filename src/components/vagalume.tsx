
function createUrlToSearch(input: { text: string }): string {
  return `https://www.googleapis.com/customsearch/v1?key=${
    process.env.GOOGLE_API_KEY
  }&cx=${process.env.CX_CONFIG_ID}&q=${encodeURI(input.text)}`;
}

function createUrlToGetById(id: string | null): string | null {
  if (id === null) return null;

  const [song, artist] = id.split("#").map((str) => str.trim());

  return `https://api.vagalume.com.br/search.php?art=${encodeURI(
    artist
  )}&mus=${encodeURI(song)}&apikey=${process.env.VAGALUME_API_KEY}`;
}

export { createUrlToSearch, createUrlToGetById };
