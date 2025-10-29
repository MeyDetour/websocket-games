const mongoose = require( "mongoose");

const Message = new mongoose.Schema({
    content: {
        type: mongoose.SchemaTypes.String
    },
    user : {
        type : mongoose.SchemaTypes.Number,
    }

})

module.exports = mongoose.model('Message', Message);