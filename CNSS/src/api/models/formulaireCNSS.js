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
    rembousement : {
        type: Number,
        required: true,
        default: 0,
    },
    matirucule : {
        type: Buffer,
        required: true,
        default: {}
    },
    medicament : {
        type: Buffer,
        required: true,
        default: {}
    },
    analyses : {
        type: Buffer,
        required: true,
        default: {}
    },
    date : {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('FormulaireCNSS', formulaireSchema);