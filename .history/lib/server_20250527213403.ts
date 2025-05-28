import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        if (mongoose.connections[0].readyState) return;
        if (!process.env.MONGO_URI) throw new Error('MONGO_URI environment variable is not defined');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        throw error;
    }
};

export default connectMongo;