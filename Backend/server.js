import "./src/config/env.js";
import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import chatRoute from "./src/routes/chatRoute.js";
import hospitalRoute from "./src/routes/hospitalRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://lifeline-dlq1vj61o-ankitkandwal-gits-projects.vercel.app",
    "https://life-line-ai-zeta.vercel.app" // Your current deployed frontend
  ],
  credentials: true,
}));

app.use(express.json());

app.use("/api", chatRoute);
app.use("/api", hospitalRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});