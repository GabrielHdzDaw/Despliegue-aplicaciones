import mongoose from "mongoose";

const autorsSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  anyNaixement: {
    type: Number,
    min: 1,
    max: 2000,
  },
});

export const Autor = mongoose.model("autors", autorsSchema);
