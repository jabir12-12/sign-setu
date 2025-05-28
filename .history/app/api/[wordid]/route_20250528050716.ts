import { connectionString } from "@/lib/database/db-connection";
import { words } from "@/lib/database/models/word";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export const PUT = async (
    req: Request,
    value: { params: { wordid: string } }
) => {
    const wordId = value.params.wordid;
    const id = { _id: wordId };
    const payload = await req.json();
    await mongoose.connect(connectionString);
    const updateword = await words.findOneAndUpdate(id, payload);
    return NextResponse.json({ result: updateword });
};

export const GET = async (
    req: Request,
    value: { params: { wordid: string } }
) => {
    const wordId = value.params.wordid;
    const id = { _id: wordId };
    await mongoose.connect(connectionString);
    const updateword = await words.findById(id);
    return NextResponse.json({ result: updateword });
};

export const DELETE = async (
    req: Request,
    value: { params: { wordid: string } }
) => {
    const wordId = value.params.wordid;
    const id = { _id: wordId };
    await mongoose.connect(connectionString);
    const deleteword = await words.deleteOne(id);
    return NextResponse.json({ result: deleteword });
};
