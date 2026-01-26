import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js"
import userRouter from "./route/route.user.js";
import scanRouter from "./route/route.scan.js";
import orderRouter from "./route/route.order.js";

const app = express();
app.use(express.json());


const allowedOrigins = ["http://localhost:3000" || process.env.port];
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
app.use("/api/v1",orderRouter);

const connectServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log("listening on 5000");
    })
  }
  catch (err) {
    console.error("error connecting server", err);
    process.exit(1);
  }
}
connectServer();