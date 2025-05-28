import connectMongo from '@/lib/server';
import Word from '@/models/word';

export async function PUT(req: { json: () => any; }, { params }: any) {
    await connectMongo();
    const id = params.id;
    const data = await req.json();
    const updated = await Word.findByIdAndUpdate(id, data, { new: true });
    return Response.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await connectMongo();
    await Word.findByIdAndDelete(params.id);
    return Response.json({ message: 'Deleted successfully' });
}