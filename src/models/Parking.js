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
    occupants: [
        {
            occupant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vehicle'
            }
        }
    ]
})

const Parking = mongoose.model('Parking', parkingSchema)

module.exports = Parking