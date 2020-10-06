const mongoose = require('mongoose')

const parkingSessionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicle'
    },
    parking: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Parking'
    },
    timestamps: {
        ingress: {
            type: Date,
            required: true
        },
        egress: {
            type: Date,
        }
    }
})

const parkingSession = mongoose.model('ParkingSession', parkingSessionSchema)

module.exports = parkingSession