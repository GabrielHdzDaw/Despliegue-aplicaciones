import { Schema, model } from "mongoose";

const userSchema = new Schema({
  login: {
    type: String,
    minlength: 4,
    required: true,
  },
  password: {
    type: String,
    minlength: 7,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "user"],
  },
});

export const User = model("users", userSchema);
