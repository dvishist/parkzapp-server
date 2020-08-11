const mongoose = require('mongoose')

const Vehicle = mongoose.model('Vehicle', {
    manufacturer: {
        type: String,
        reqiired: true
    },
    model: {
        type: String,
        reqiired: true
    }
})

module.exports = Vehicle