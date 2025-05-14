import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${connectionDB.connection.host}`);      
    } catch (err){
        console.error(err);
        process.exit(1);
    }
};

export default connectDB;