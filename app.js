import express from "express";
import mongoose from "mongoose";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/user", userRoute);

const MONGO_URI = process.env.MONGO_URI;
mongoose.set("strictQuery", true);
connect(MONGO_URI)
  .then(() => console.log("database Connected"))
  .catch((err) => console.log("Not connected", err.message));

app.get("/", (req, res) => {
  res.json("deployed");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API started up on http://localhost:${PORT}`);
});
