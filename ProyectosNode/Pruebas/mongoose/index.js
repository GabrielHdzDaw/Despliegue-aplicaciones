import { mongoose } from "mongoose";
import { Contacto } from "./models/contacto.js";

mongoose.connect("mongodb://localhost:27017/contactos");


let contacto1 = new Contacto({
    nombre: "a",
    telefono: "96517416423232323223232323",
    edad: 19
})

contacto1.save().then( r => {
    console.log(r);
}).catch(err => {
    console.log(err);
})