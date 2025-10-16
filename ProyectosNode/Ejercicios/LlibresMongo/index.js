import mongoose, { mongo } from "mongoose";
import { Llibre } from "./models/llibres.js";

mongoose.connect("mongodb://localhost:27017/llibres");

let llibre1 = new Llibre({
  titol: "Las maracas de Mauricio",
  editorial: "La pepa",
  preu: 250,
});

let llibre2 = new Llibre({
  titol: "El capità Alatriste",
  editorial: "Alfaguara",
  preu: 15,
});

let llibre3 = new Llibre({
  titol: "El joc d’Ender",
  editorial: "Edicions B",
  preu: 8.95,
});

llibre2
  .save()
  .then((r) => {
    console.log(r);
  })
  .catch((err) => {
    console.log(err);
  });

llibre3
  .save()
  .then((r) => {
    console.log(r);
  })
  .catch((err) => {
    console.log(err);
  });
