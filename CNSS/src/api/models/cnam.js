const mongoose = require('mongoose');

const cnamSchema = new mongoose.Schema({
        Name: {
            type: String,
        },
        Price: {
            type: Number,
        },
        refundPrice: {
            defaultValue: 0,
            type: Number,
        },
        class: {
            type: String,
        },
        refundPossible: {
            type: Boolean,
        },
        type : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Type',
        },
});
export default mongoose.model('Cnam', cnamSchema);