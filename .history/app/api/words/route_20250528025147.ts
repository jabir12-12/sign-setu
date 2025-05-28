import { connectionString } from "@/lib/database/db-connection";
import { Word } from "@/lib/database/models/word";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async () => {
    console.log("POST /api/words was called");

    await mongoose.connect(connectionString);

    const wordData = new Word({
        word: "got",
        definition: "I have got a car",
        imageUrl: "yes",
        videoUrl: "no"
    });

    const response = await wordData.save();
    return NextResponse.json({ result: response });
};
