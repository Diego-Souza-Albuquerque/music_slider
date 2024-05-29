// src/app/api/test/route.js

import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('SlideDB');
    const result = await db.admin().ping();
    const collections = await db.collections();
    console.log('Collections:', collections.map(col => col.collectionName));

    if (result.ok === 1) {
      return new Response(JSON.stringify({ message: 'Connected to MongoDB successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Failed to connect to MongoDB' }), { status: 500 });
    }
  } catch (error) {
    console.error('Connection test failed', error);
    return new Response(JSON.stringify({ message: 'Failed to connect to MongoDB', error }), { status: 500 });
  }
}
