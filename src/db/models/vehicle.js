const mongoose = require('mongoose')
const { ObjectID } = require('bson')

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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle