import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionString } from "@/lib/database/db-connection";
import { words } from "@/lib/database/models/word";

export async function GET(
    _req: NextRequest,
    { params }: string | any) {
    const wordid = params.wordid;
    await mongoose.connect(connectionString);
    const result = await words.findById(wordid);
    return NextResponse.json({ result });
}

export async function PUT(
    req: NextRequest,
    { params }: string | any) {
    const wordid = params.wordid;
    const payload = await req.json();
    await mongoose.connect(connectionString);
    const result = await words.findOneAndUpdate({ _id: wordid }, payload);
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