import { connectionString } from "@/lib/database/db-connection";
import { words } from "@/lib/database/models/word";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async () => {
    console.log("POST /api/words was called");

    await mongoose.connect(connectionString);
    const wordsdata = new words({
        word: "got",
        definition: "I have got a car",
        imageUrl: "yes",
        videoUrl: "no"
    });

    const response = await wordsdata.save();
    return NextResponse.json({ result: response });
};

export const GET = async () => {
    await mongoose.connect(connectionString);
    const allWords = await words.find();
    return NextResponse.json({ result: allWords });
};
