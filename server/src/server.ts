import { createApp } from "./config/app.js";
import "dotenv/config";
import express from "express";
const app: express.Express = createApp();
const PORT: string | undefined = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
