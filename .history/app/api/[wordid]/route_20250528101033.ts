import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionString } from "@/lib/database/db-connection";
import { words } from "@/lib/database/models/word";

type Context = {
    params: {
        wordid: string;
    };
};

export const GET = async (
    req: NextRequest,
    value: Context
) => {
    const wordid = value.params.wordid;
    const id = { _id: wordid };
    await mongoose.connect(connectionString);
    const result = await words.findById(id);
    return NextResponse.json({ result });
};

export const PUT = async (
    req: NextRequest,
    value: Context
) => {
    const wordid = value.params.wordid;
    const id = { _id: wordid };
    const payload = await req.json();
    await mongoose.connect(connectionString);
    const result = await words.findOneAndUpdate(id, payload);
    return NextResponse.json({ result });
}

export async function DELETE(
    _req: NextRequest,
    { params }: string | any) {
    const wordid = params.wordid;
    await mongoose.connect(connectionString);
    const result = await words.deleteOne({ _id: wordid });
    return NextResponse.json({ result });
}