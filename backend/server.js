import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js"
import userRouter from "./route/route.user.js";
import scanRouter from "./route/route.scan.js";
import orderRouter from "./route/route.order.js";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL // Add your production frontend URL here
].filter(Boolean); // Filter out undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/scan", scanRouter);
app.use("/api/v1", orderRouter);

// Basic health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const connectServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    })
  }
  catch (err) {
    console.error("error connecting server", err);
    process.exit(1);
  }
}
connectServer();