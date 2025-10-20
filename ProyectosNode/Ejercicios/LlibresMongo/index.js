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

// llibre2
//   .save()
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// llibre3
//   .save()
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Llibre.find({ preu: { $gte: 10, $lte: 20 } })
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Llibre.findById("68f0c8e52d4c729e5543d254")
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Llibre.findByIdAndDelete("68f0c8e52d4c729e5543d254")
//   .then((r) => {
//     console.log("Eliminado:", r);
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });

Llibre.findByIdAndUpdate("68f0c991d51c72eb07e06db9", { preu: 12313, titol: "Mamamama" }, { new: true, runValidators: true })
  .then((r) => {
    console.log("Modificat: ", r);
  })
  .catch((err) => {
    console.log("Error", err);
  });
