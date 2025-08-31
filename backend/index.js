import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/profile.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

// --- FIX IS HERE ---
// Add this root route to handle requests to the base URL
app.get("/", (req, res) => res.send("Welcome to the About Me API!"));

app.use("/api/profiles", routes);
// Health check
app.get("/health", (req, res) => res.json({ status: "Everything okay" }));

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error(" Failed to connect to MongoDB");
    console.error(err.message);
  });