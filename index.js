import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes
app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

// Environment variables
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

// Safety check
if (!MONGO_URL) {
  console.error("MONGO_URL is not defined in environment variables");
  process.exit(1);
}

// Connect DB + start server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });