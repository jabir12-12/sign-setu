import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionString } from "@/lib/database/db-connection";
import { words } from "@/lib/database/models/word";

// Remove the RouteContext import

export const GET = async (
    _req: NextRequest,
    context: { params: { wordid: string } }
) => {
    const wordid = context.params.wordid;
    await mongoose.connect(connectionString);
    const result = await words.findById({ _id: wordid });
    return NextResponse.json({ result });
};

export const PUT = async (
    req: NextRequest,
    context: { params: { wordid: string } }
) => {
    const wordid = context.params.wordid;
    const payload = await req.json();
    await mongoose.connect(connectionString);
    const result = await words.findOneAndUpdate({ _id: wordid }, payload);
    return NextResponse.json({ result });
};

export const DELETE = async (
    _req: NextRequest,
    context: { params: { wordid: string } }
) => {
    const wordid = context.params.wordid;
    await mongoose.connect(connectionString);
    const result = await words.deleteOne({ _id: wordid });
    return NextResponse.json({ result });
};