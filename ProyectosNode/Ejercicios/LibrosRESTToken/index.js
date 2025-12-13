/*
Ejercicio de desarrollo de servicios con Express. Sobre la base de datos de "libros" de  
sesiones anteriores, se desarrollarán los servicios básicos paras operaciones habituales de
GET, POST, PUT y DELETE. En este caso, dejamos hechas las operaciones tipo GET.

En esta versión del ejercicio, se estructura el código en carpetas separadas para modelos
y enrutadores
*/

// Carga de librerías
import express, { json } from "express";
import jwt from "jsonwebtoken";
import { connect } from "mongoose";

const arrayUsuarios = [
  { login: "ana", password: "1234", rol: "admin" },
  { login: "luis", password: "1234", rol: "editor" },
  { login: "maria", password: "1234", rol: "editor" },
];

// Enrutadores
const libros = require(__dirname + "/routes/libros");
const autores = require(__dirname + "/routes/autores"); // Para la parte opcional

// Conectar con BD en Mongo
connect("mongodb://127.0.0.1:27017/libros");

// Inicializar Express
let app = express();

// Cargar middleware para peticiones POST y PUT
// y enrutadores
app.use(json());
app.use("/libros", libros);
app.use("/autores", autores); // Para la parte opcional

// Puesta en marcha del servidor
app.listen(8080);
