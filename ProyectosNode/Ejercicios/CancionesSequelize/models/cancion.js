import { Sequelize } from "sequelize";

export default (sequelize) => {
  const Cancion = sequelize.define("canciones", {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    duracion: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    artista: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Cancion;
};
