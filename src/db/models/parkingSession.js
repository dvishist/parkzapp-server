const mongoose = require('mongoose')
const User = require('./user')
const Parking = require('./parking')
const Vehicle = require('./vehicle')

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
        date: {
            type: Date,
            required: true
        },
        ingress: {
            type: Date,
            required: true
        },
        egress: {
            type: Date,
            required: true
        }
    }
})

const parkingSession = mongoose.model(parkingSessionSchema)

module.exports = parkingSession