import { mongoose } from "mongoose";

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    trim: true,
    match: /^\d{9}$/,
  },
  edad: {
    type: Number,
    min: 18,
    max: 120,
  },
});

export const Contacto = mongoose.model("contactos", contactoSchema);
