// src/server.ts
import app from "./app";
import { redis } from "@/configs";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await redis.set("healthcheck", "ok", "EX", 60);
    const check = await redis.get("healthcheck");
    console.log("Redis healthcheck:", check);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("🚨 Cannot start server:", err);
    process.exit(1);
  }
}

start();
