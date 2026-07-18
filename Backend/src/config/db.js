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
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;