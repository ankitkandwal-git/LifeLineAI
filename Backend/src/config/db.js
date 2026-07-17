import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

        if (!mongoUri) {
            console.warn('MongoDB connection skipped: no MONGO_URI, MONGODB_URI, or MONGO_URL was configured.');
            return null;
        }

        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Removing process.exit(1) to allow the server to attempt to start even if DB connection fails.
        // This can help in debugging but ensure your application handles missing DB connections gracefully.
    }
}

export default connectDB;