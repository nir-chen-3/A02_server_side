import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/user/user__routes.js";
import cardRoutes from "./routes/cards/cards__routes.js";

import { seedInitialUsers } from "./Initial_data/fn_seedInitialUsers.js";
import { seedInitialCards } from "./Initial_data/fn_seedInitialCards.js";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

// DB connection + app startup
const PORT = process.env.PORT ?? 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    await seedInitialUsers();
    await seedInitialCards();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Failed to connect to DB", err));
