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

// Routes
app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

// Connect DB + start server
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));