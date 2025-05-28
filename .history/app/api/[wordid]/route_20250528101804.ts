import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionString } from "@/lib/database/db-connection";
import { words } from "@/lib/database/models/word";

interface RouteContext {
    params: Promise<{ wordid: string }>;
}

export const GET = async (
    _req: NextRequest,
    context: RouteContext
) => {
    const { wordid } = await context.params;
    await mongoose.connect(connectionString);
    const result = await words.findById({ _id: wordid });
    return NextResponse.json({ result });
};

export const PUT = async (
    req: NextRequest,
    context: RouteContext
) => {
    const { wordid } = await context.params;
    const payload = await req.json();
    await mongoose.connect(connectionString);
    const result = await words.findOneAndUpdate({ _id: wordid }, payload);
    return NextResponse.json({ result });
};

export const DELETE = async (
    _req: NextRequest,
    context: RouteContext
) => {
    const { wordid } = await context.params;
    await mongoose.connect(connectionString);
    const result = await words.deleteOne({ _id: wordid });
    return NextResponse.json({ result });
};