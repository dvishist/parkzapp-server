const mongoose = require('mongoose')

const parkingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true
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
    occupants: {
        type: Number,
        default: 0
    },
    charge: {
        type: Number,
        required: true
    }
})

const Parking = mongoose.model('Parking', parkingSchema)

module.exports = Parking