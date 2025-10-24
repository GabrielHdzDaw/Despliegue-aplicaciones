let mascotaSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tipus: {
        type: String,
        required: true,
        enum: ['gos', 'gat', 'altres']
    }
});
export let Mascota = mongoose.model('mascotes', mascotaSchema);
