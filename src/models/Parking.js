const mongoose = require('mongoose')

const parkingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    coordinates: {
        type: {
            latitude: Number,
            longitude: Number
        },
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    occupied: {
        type: Number,
        default: 0,
        required: true
    }
})

const Parking = mongoose.model('Parking', parkingSchema)

module.exports = Parking