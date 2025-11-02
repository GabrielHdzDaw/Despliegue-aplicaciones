import { mongoose } from "mongoose";
import { Contacto, Restaurant, Mascota} from "./models/contacto.js";

mongoose.connect("mongodb://localhost:27017/contactos");

let restaurant1 = new Restaurant({
  nom: "La Tagliatella",
  adreca: "C. c. Sant Vicent s/n",
  telefon: "965678912",
});
restaurant1
  .save()
  .then((r) => {
    console.log("Restaurant guardat:", r);
  })
  .catch((err) => {
    console.log(err);
  });

let mascota1 = new Mascota({
  nom: "Otto",
  tipus: "gos",
});

let mascota2 = new Mascota({
  nom: "José",
  tipus: "gat",
});

mascota1
  .save()
  .then((r) => {
    console.log("Mascota guardat:", r);
  })
  .catch((err) => {
    console.log(err);
  });

  mascota2
  .save()
  .then((r) => {
    console.log("Mascota guardat:", r);
  })
  .catch((err) => {
    console.log(err);
  });

async function guardarContacteAmbRelacions() {
  try {
    // Guardar restaurant i mascotes en paral·lel
    const [restaurantGuardat, mascotaGuardada1, mascotaGuardada2] = await Promise.all([
      restaurant1.save(),
      mascota1.save(),
      mascota2.save(),
    ]);

    // Crear i guardar el contacte una vegada que les insercions anteriors hagen finalitzat
    let contacte1 = new Contacto({
      nom: "Nacho",
      telefon: 111111111,
      edat: 40,
      restaurantFavorit: restaurantGuardat._id, // Referència al _id del restaurant guardat
      mascotes: [mascotaGuardada1._id, mascotaGuardada2._id], // Referència als _id de las mascotes guardades
    });

    let contacteGuardat = await contacte1.save();
    console.log("Contacte guardat correctament:", contacteGuardat);
  } catch (error) {
    console.error("Error en el procés d'inserció:", error);
  }
}

guardarContacteAmbRelacions();