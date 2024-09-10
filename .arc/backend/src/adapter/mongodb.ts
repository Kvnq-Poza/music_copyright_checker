import mongoose from "mongoose";

class MongoDBAdapter {
    private mongoUri: string;

    constructor(mongoUri: string) {
        this.mongoUri = mongoUri;
    }

    async connect(): Promise<void> {
        try {
            await mongoose.connect(this.mongoUri);
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection failed:', error);
            throw new Error('Failed to connect to MongoDB');
        }
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
}

export default MongoDBAdapter;
