import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('SlideDB');
    
    // Busca todos os slides na coleção 'slides'
    const slides = await db.collection('slides').find({}).toArray();

    return new Response(JSON.stringify(slides), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar os slides:', error.message);
    return new Response(JSON.stringify({ message: 'Falha ao buscar os slides', error }), { status: 500 });
  }
}