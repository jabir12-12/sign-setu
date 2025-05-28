import connectMongo from '@/lib/server';
import Word from '@/models/word';

export async function GET() {
    await connectMongo();
    const words = await Word.find();
    return Response.json(words);
}

export async function POST(req: { json: () => any; }) {
    await connectMongo();
    const data = await req.json();
    const newWord = await Word.create(data);
    return Response.json(newWord);
}