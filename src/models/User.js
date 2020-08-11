const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Invalid Email!')
        }
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: Buffer
    }
})


module.exports = User