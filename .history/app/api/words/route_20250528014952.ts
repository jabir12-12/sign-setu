import { connectionString } from "@/lib/database/db-connection";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const GET = async () => {
    await mongoose.connect(connectionString)
    return NextResponse.json({ message: "Connected to MongoDB Successfully" })


}
export const Post = async () => {
    await mongoose.connect(connectionString);
    const words = new word({
        word: "",
        defination: "",
        imageurl: "",
        videourl: ""
    })
}