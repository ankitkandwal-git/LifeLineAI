import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "./.env"),
});

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

if (!mongoUri) {
  console.error("No MONGO_URI found in env");
  process.exit(1);
}

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

async function check() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to DB successfully");
    const users = await User.find({});
    console.log("Found users:", users.map(u => ({ name: u.name, email: u.email, passwordHash: u.password })));
    process.exit(0);
  } catch (err) {
    console.error("Error connecting or querying:", err);
    process.exit(1);
  }
}

check();
