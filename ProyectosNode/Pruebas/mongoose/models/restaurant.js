let restaurantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    adreca: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefon: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    }
});
export let Restaurant = mongoose.model('restaurants', restaurantSchema);
