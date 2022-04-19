const mongoose = require('mongoose');

const  typeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,

    },
    

},{timestamps : true})

export default mongoose.model('Type', typeSchema);