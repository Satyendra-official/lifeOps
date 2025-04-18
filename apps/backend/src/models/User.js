import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String, // can hash later
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
