import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db.js";

export function createApp(): express.Express {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
  app.use(express.json());

  connectDB();

  return app;
}
