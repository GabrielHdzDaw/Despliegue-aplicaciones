import { Schema, model } from "mongoose";

const playerSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  country: {
    type: String,
    required: true,
    match: /^[A-Z]{2}$/,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["base", "escolta", "alero", "ala-pivot", "pivot", "polivalente"],
  },
});



export const Player = model("players", playerSchema);
