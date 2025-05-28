import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
    word: String,
    definition: String,
    imageUrl: String,
    videoUrl: String,
}, { timestamps: true });

export default mongoose.models.Word || mongoose.model('Word', WordSchema);