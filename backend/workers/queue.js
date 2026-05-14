import { Queue } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const redisOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379", 10)
};

export const scanQueue = new Queue("scanQueue", {
  connection: redisOptions,
});

export const addScanJob = async (scanId) => {
  await scanQueue.add("process-scan", { scanId }, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000
    }
  });
};
