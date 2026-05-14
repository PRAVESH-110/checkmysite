import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

async function connectDB() {
    try {
        const data = await mongoose.connect(process.env.MONGODB_URI, {
            autoIndex: false
        });
        console.log("connected to mongodb")
    }
    catch (err) {
        console.error("couldnt connect to mongoDB");
        process.exit(1);
    }
}
export default connectDB;

