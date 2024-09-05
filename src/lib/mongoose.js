import mongoose, { Connection } from 'mongoose';

export async function mongooseConnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    } else {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI undefined");
        }
        await mongoose.connect(uri);
        return mongoose.connection;
    }
}
