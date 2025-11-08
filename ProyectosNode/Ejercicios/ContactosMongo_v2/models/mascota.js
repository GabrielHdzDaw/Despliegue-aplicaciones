import { Schema, model } from 'mongoose';

let mascotaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['perro', 'gato', 'otros']
    }
});

export const Mascota = model('mascotas', mascotaSchema);
