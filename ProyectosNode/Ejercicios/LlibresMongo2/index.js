import mongoose, { mongo } from "mongoose";
import { Llibre } from "./models/llibres.js";
import { Autor } from "./models/autors.js";

mongoose.connect("mongodb://localhost:27017/llibres");

const autor1 = new Autor({
  nom: "José",
  anyNaixement: 1992,
});

const autor2 = new Autor({
  nom: "Pepe",
  anyNaixement: 1886,
});

const llibre1 = new Llibre({
  titol: "Patata",
  preu: 239,
  editorial: "forma",
  autor: autor1._id,
});

const llibre2 = new Llibre({
  titol: "Boniato",
  preu: 219,
  editorial: "forma",
  autor: autor2._id,
});

async function guardarAutors(...autors) {
  autors.forEach(async (a) => {
    a.save()
      .then((r) => {
        console.log("Guardat: ", r);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });
}

async function guardarLlibres(...llibres) {
  llibres.forEach(async (a) => {
    a.save()
      .then((r) => {
        console.log("Guardat: ", r);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  });
}



guardarLlibres(llibre1, llibre2);
