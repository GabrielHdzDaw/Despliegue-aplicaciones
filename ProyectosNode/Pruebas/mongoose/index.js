import { mongoose } from "mongoose";
import { Contacto } from "./models/contacto.js";

mongoose.connect("mongodb://localhost:27017/contactos");


mongoose.find