import { Worker } from "bullmq";
import dotenv from "dotenv";
import processScan from "../jobHandler/processScan.js";
import connectDB from "../config/db.js";

dotenv.config();

const redisOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379", 10)
};

// Removed standalone DB connection because it is imported in server.js

export const scanWorker = new Worker("scanQueue", async (job) => {
  console.log(`Processing scan job ${job.id} for scanId: ${job.data.scanId}`);
  await processScan(job.data.scanId);
  console.log(`Completed scan job ${job.id}`);
}, {
  connection: redisOptions,
  concurrency: 1 // Adjust based on your server capacity (Lighthouse is heavy)
});

scanWorker.on("completed", (job) => {
  console.log(`Job ${job.id} has completed!`);
});

scanWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} has failed with ${err.message}`);
});
