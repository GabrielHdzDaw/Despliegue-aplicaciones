import { Sequelize } from "sequelize";
import ModeloContacto from "./models/contacto.js";

const sequelize = new Sequelize("contactos_sequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Contacto = ModeloContacto(sequelize);

async function main() {
  try {
    await sequelize.sync(/*{force: true}*/);
    console.log("Datos sincronizados");

    // EJEMPLOS DE OPERACIONES
    // Dejar descomentada sólo la que se quiera probar

    // Ejemplo de inserción
    try {
      const resultado = await Contacto.create({
        nombre: "Nacho",
        telefono: "966112233",
      });
      if (resultado) console.log("Contacto creado con estos datos: ", resultado);
      else console.log("Error insertando contacto");
    } catch (error) {
      console.log("Error insertando contacto:", error);
    }

    // Listado general
    try {
      const resultado = await Contacto.findAll();
      console.log("Listado de contactos: ", resultado);
    } catch (error) {
      console.log("Error listando contactos: ", error);
    }

    // Búsqueda por clave primaria
    try {
      const resultado = await Contacto.findByPk(1);
      if (resultado) console.log("Contacto encontrado: ", resultado);
      else console.log("No se ha encontrado contacto");
    } catch (error) {
      console.log("Error buscando contacto: ", error);
    }

    // Ejemplo de modificación 2
    try {
      const resultado = await Contacto.update({ nombre: "Modificado con Sequelize" }, { where: { id: 1 } });
      console.log("Contacto actualizado: ", resultado);
    } catch (error) {
      console.log("Error actualizando contacto: ", error);
    }
  } catch (error) {
    console.log(error);
  }
}

main();
