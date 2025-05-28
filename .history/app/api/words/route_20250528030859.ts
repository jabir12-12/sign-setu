import { connectionString } from "@/lib/database/db-connection";
import { words } from "@/lib/database/models/word";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export const GET = async () => {
    await mongoose.connect(connectionString);
    const allWords = await words.find();
    return NextResponse.json({ result: allWords });
};


export const POST = async (req: NextRequest) => {
    console.log("POST /api/words was called");

    try {
        const { word, definition, imageUrl, videoUrl } = await req.json();
        await mongoose.connect(connectionString);

        const wordsdata = new words({
            word,
            definition,
            imageUrl,
            videoUrl,
        });

        const response = await wordsdata.save();
        return NextResponse.json({ result: response });
    } catch (error) {
        console.error("Error saving word:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};
