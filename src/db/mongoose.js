const mongoose = require('mongoose')

const User = require('../models/User')
const Vehicle = require('../models/Vehicle')
const Parking = require('../models/Parking')

const URL = 'mongodb://127.0.0.1:27017/parkzapp'

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const user = new User({
    name: 'vishist',
    email: 'dvishist27@gmail.com',
    password: 'parkzapp'
})