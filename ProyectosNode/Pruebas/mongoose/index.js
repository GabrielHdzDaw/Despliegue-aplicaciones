import { mongoose } from "mongoose";
import { Contacto } from "./models/contacto.js";

mongoose.connect("mongodb://localhost:27017/contactos");


let contacto1 = new Contacto({
    nombre: "Papoa",
    telefono: "965174164",
    edad: 19
})

contacto1.save().then( r => {
    console.log(r);
}).catch(err => {
    console.log(err);
})