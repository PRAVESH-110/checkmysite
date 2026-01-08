import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js"

const app = express();
app.use(express.json());


const allowedOrigins=[ " " || process.env.port]
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/scan",scanRouter);

const connectServer = async () => {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("listening on 3000");
        })
    }
    catch (err) {
        console.error("error connecting server", err);
        process.exit(1);
    }
}
connectServer();