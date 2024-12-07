import dotenv from "dotenv";
import { Redis } from "ioredis";

dotenv.config();

const host = process.env.REDIS_HOST;
const port = Number(process.env.REDIS_PORT);
const password = process.env.REDIS_PASSWORD;

const redis = new Redis({
  host,
  port,
  password,
});

export const initializeRedis = () => {
  redis.on("connect", () => {
    console.log("Redis connected successfully.");
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
  });
};

export { redis };
