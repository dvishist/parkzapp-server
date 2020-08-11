const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
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
}, {
    timestamps: true
})


userSchema.virtual('vehicles', {
    ref: 'Vehicle',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.pre('save', async function (next) {
    const userSchema = this
    userSchema.password = userSchema.isModified('password') ? await bcrypt.hash(userSchema.password, 8) : userSchema.password
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User