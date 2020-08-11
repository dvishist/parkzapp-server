const mongoose = require('mongoose')

const Vehicle = mongoose.model('Vehicle', {
    manufacturer: {
        type: String,
        reqiired: true
    },
    model: {
        type: String,
        reqiired: true
    },
    idNumber: {
        type: String,
        required: true
    }
})

module.exports = Vehicle