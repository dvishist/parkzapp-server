const mongoose = require('mongoose')

const Parking = mongoose.model('Parking', {
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

module.exports = Parking