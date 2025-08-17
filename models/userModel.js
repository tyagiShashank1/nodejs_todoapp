import mongoose from "mongoose";

//schema
const schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required:true,
    unique: true,
  },
  password: {
    type: String,
    required:true,
    select: false,
  },
  createdAt: {
    type: Date,
    required:true,
    default: Date.now(),
  },
});
//collection
export const User = mongoose.model("User", schema);
