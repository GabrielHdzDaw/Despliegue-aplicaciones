/*
Pruebas con la librería Mongoose para acceder a una base de datos MongoDB
Versión ampliada para definir dos nuevas colecciones: una para restaurantes y otra para 
mascotas, de forma que un contacto podrá tener un restaurante favorito, y un array de
mascotas
*/
import e from "express";
import { mongoose } from "mongoose";
import { Contacto } from "./models/contacto.js";
import { Restaurante } from "./models/restaurante.js";
import { Mascota } from "./models/mascota.js";

// Conexión con la BD
mongoose.connect("mongodb://127.0.0.1:27017/contactos");

const app = e();

app.get("/contactos", (req, res) => {
  Contacto.find()
    .then((resultado) => {
      res.status(200).send({ ok: true, resultado: resultado });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error obteniendo contactos" });
    });
});

app.listen(8080);
