import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
    word: String,
    definition: String,
    imageUrl: String,
    videoUrl: String,
})

export const Word = mongoose.models.words || mongoose.model('Word', WordSchema);