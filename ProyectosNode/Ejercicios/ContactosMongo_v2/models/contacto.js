import { Schema, model } from 'mongoose';

// Definición del esquema de nuestra colección
let contactoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    },
    edad: {
        type: Number,
        min: 18,
        max: 120
    },
    restauranteFavorito: {
        type: Schema.Types.ObjectId,
        ref: 'restaurantes'
    },
    mascotas: [{
        type: Schema.Types.ObjectId,
        ref: 'mascotas' 
    }]
});

// Asociación con el modelo (colección contactos)
export const Contacto = model('contactos', contactoSchema);
