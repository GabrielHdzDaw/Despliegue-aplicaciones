import { Sequelize } from "sequelize";
import ModeloCancion from "./models/cancion.js";

const sequelize = new Sequelize("canciones", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Cancion = ModeloCancion(sequelize);

try {
  await sequelize.sync();
  console.log("Datos sincronizados");
} catch (err) {
  console.log(err.message);
}

try {
  const res = await Cancion.create({
    titulo: "Nacho",
    duracion: "966112233",
    artista: "Nacho",
  });
  if (res) console.log("Cancion creado con estos datos: ", res);
  else console.log("Error insertando Cancion");
} catch (error) {
  console.log("Error insertando Cancion:", error);
}

try {
  const res = await Cancion.create({
    titulo: "Lentejas",
    duracion: "123124",
    artista: "Jose",
  });
  if (res) console.log("Cancion creado con estos datos: ", res);
  else console.log("Error insertando Cancion");
} catch (error) {
  console.log("Error insertando Cancion:", error);
}

try {
  const PK = 1;
  const res = await Cancion.findByPk(PK);
  if (resultado) console.log("Cancion ", res);
  else console.log("Error mostrando canción con PK", PK);
} catch (err) {
  console.log(err.message);
}

try {
  const res = await Cancion.update({ titulo: "Modificado con Sequelize" }, { where: { id: 1 } });
  console.log("Cancion actualizada: ", res);
} catch (err) {
  console.log("Error actualizando cancion: ", err.message);
}

try {
  const id = 1;
  const res = await Cancion.destroy({ where: { id: id } });
  if (res) console.log("Cancion eliminada:", res);
  else console.log("Error eliminando canción", id);
} catch (err) {
  console.log(err.message);
}

try {
  const res = await Cancion.findAll();
  console.log(res);
} catch (err) {
  console.log(err.message);
}
