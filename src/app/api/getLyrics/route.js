export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "ID da música é obrigatório" }), { status: 400 });
    }

    const apiUrl = `https://lrclib.net/api/get/${id}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || "Erro ao buscar a letra" }), { status: response.status });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar a letra da música:", error.message);
    return new Response(JSON.stringify({ message: "Erro interno do servidor", error }), { status: 500 });
  }
}
