const mongoose = require('mongoose');

const formulaireSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    score : {
        type: Number,
        required: true,
    },
    immatricule : {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('FormulaireCNSS', formulaireSchema);