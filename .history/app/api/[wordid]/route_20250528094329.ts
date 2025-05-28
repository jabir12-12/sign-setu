import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionString } from "@/lib/database/db-connection";
import { words } from "@/lib/database/models/word";

interface RouteContext {
    params: { wordid: string };
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
    const wordId = params.wordid;
    await mongoose.connect(connectionString);
    const result = await words.findById(wordId);
    return NextResponse.json({ result });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
    const wordId = params.wordid;
    const payload = await req.json();
    await mongoose.connect(connectionString);
    const result = await words.findOneAndUpdate({ _id: wordId }, payload);
    return NextResponse.json({ result });
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
    const wordId = params.wordid;
    await mongoose.connect(connectionString);
    const result = await words.deleteOne({ _id: wordId });
    return NextResponse.json({ result });
}