import { createApp } from "./config/app.js";
import "dotenv/config";
import express from "express";
import AuthRouter from "./routes/Auth.js";

const app: express.Express = createApp();
const PORT: string | undefined = process.env.PORT;

app.use("/auth", AuthRouter);
// app.use("/booking", bookingRoutes);
// app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
