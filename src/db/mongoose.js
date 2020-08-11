const mongoose = require('mongoose')

const user = require('../models/user')
const Vehicle = require('../models/vehicle')
const Parking = require('../models/Parking')

const URL = 'mongodb://127.0.0.1:27017/parkzapp'

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log(`Database successfully connected on ${URL}`)
})
