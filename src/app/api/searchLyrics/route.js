export async function POST(req) {
  try {
    const { query, track_name, artist_name } = await req.json();

    if (!query && !track_name) {
      return new Response(JSON.stringify({ error: "Forneça um nome de música ou artista" }), { status: 400 });
    }

    const apiUrl = `https://lrclib.net/api/search?${
      query ? `q=${encodeURIComponent(query)}` : `track_name=${encodeURIComponent(track_name)}`
    }${artist_name ? `&artist_name=${encodeURIComponent(artist_name)}` : ""}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || "Erro ao buscar músicas" }), { status: response.status });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar músicas:", error.message);
    return new Response(JSON.stringify({ message: "Erro interno do servidor", error }), { status: 500 });
  }
}
