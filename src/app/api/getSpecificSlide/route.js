import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('SlideDB');
    
    // Obtém o parâmetro de consulta da URL
    const url = new URL(req.url);
    const search = url.searchParams.get('search');

    if (!search) {
      return new Response(JSON.stringify({ message: 'Parâmetro de busca não fornecido' }), { status: 400 });
    }

    // Usa expressão regular para buscar slides que contenham a palavra fornecida no título ou autor
    const regex = new RegExp(search, 'i'); // 'i' para case-insensitive
    const slides = await db.collection('slides').find({
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } }
      ]
    }).toArray();

    return new Response(JSON.stringify(slides), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar os slides:', error.message);
    return new Response(JSON.stringify({ message: 'Falha ao buscar os slides', error }), { status: 500 });
  }
}
