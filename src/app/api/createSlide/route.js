import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('SlideDB');

    const body = await req.json();
  
    const { title, author, url } = body;

    const result = await db.collection('slides').insertOne({ title, author, url, createdAt: new Date() });

    return new Response(JSON.stringify({ message: 'Slide salvo com sucesso', slideId: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error('Erro ao criar o slide:', error.message);
    return new Response(JSON.stringify({ message: 'Falha ao criar o slide', error }), { status: 500 });
  }
}
