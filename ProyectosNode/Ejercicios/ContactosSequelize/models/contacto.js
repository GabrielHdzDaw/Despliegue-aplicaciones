import { Sequelize } from "sequelize";

export default (sequelize) => {
    const Contacto = sequelize.define('contactos', {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Contacto;
};