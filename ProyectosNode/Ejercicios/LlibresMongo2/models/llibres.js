import mongoose, { mongo } from "mongoose";

const comentariSchema = new mongoose.Schema({
  data: {
    type: Date,
    required: true,
    default: Date.now,
  },
  nick: {
    type: String,
    required: true,
  },
  comentari: {
    type: String,
    required: true,
  },
});

const llibreSchema = new mongoose.Schema({
  titol: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  editorial: {
    type: String,
    trim: true,
  },
  preu: {
    type: Number,
    required: true,
    min: 0,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autors",
  },

  comentaris: [comentariSchema],
});

export const Llibre = mongoose.model("llibres", llibreSchema);
