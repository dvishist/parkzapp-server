const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({
    manufacturer: {
        type: String,
        reqiired: true
    },
    model: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle