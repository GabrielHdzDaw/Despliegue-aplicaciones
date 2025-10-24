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

async function guardarAutors(...autors) {
  autors.forEach(async (a) => {
    a.save()
      .then((r) => {
        console.log("Guardat: ", r);
      })
      .catch((err) => {
        console.log("Error: ", r);
      });
  });
}

const llibre1 = "68f0c991d51c72eb07e06db9";
const llibre2 = "68f0c991d51c72eb07e06dba";

const llibreEncontrat = await Llibre.findById(llibre1);
await llibreEncontrat.updateOne(autor1._id);

// guardarAutors(autor1, autor2);
