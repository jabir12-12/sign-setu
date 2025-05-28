import { connectionString } from "@/lib/database/db-connection";
import { word } from "@/lib/database/models/word";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const GET = async () => {
    await mongoose.connect(connectionString)
    // this has all the data you take from the database to showcasein the frontend
    const wordsdata = await word.find();
    return NextResponse.json({ message: wordsdata })


}
// export const Post = async () => {
//     await mongoose.connect(connectionString);
//     const word = new words({
//         word: "",
//         defination: "",
//         imageurl: "",
//         videourl: ""
//     })
// }