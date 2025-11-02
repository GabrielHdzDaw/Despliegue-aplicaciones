import { mongoose } from "mongoose";

export const mascotaSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  tipus: {
    type: String,
    required: true,
    enum: ["gos", "gat", "altres"],
  },
});

export const restaurantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  adreca: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  telefon: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\d{9}$/,
  },
});

export const contactoSchema = new mongoose.Schema({
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
  restaurantFavorit: restaurantSchema,
  mascotes: [mascotaSchema],
});

export const Contacto = mongoose.model("contactos", contactoSchema);
export const Restaurant = mongoose.model("restaurant", restaurantSchema);
export const Mascota = mongoose.model("Mascota", mascotaSchema);
