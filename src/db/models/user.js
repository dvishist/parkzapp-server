const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Vehicle = require('./vehicle')
const Parking = require('./parking')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    parkedIn: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})

//define relationship with vehicle
userSchema.virtual('vehicles', {
    ref: 'Vehicle',
    localField: '_id',
    foreignField: 'owner'
})

//hash passwords before saving to database
userSchema.pre('save', async function (next) {
    const userSchema = this
    userSchema.password = userSchema.isModified('password') ? await bcrypt.hash(userSchema.password, 8) : userSchema.password
    next()
})

//delete vehicles before deleting a user
userSchema.pre('remove', async function (next) {
    const user = this
    await Vehicle.deleteMany({ owner: user._id })
    next()
})

//filter sensitive data before sending JSON
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

//find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Incorrect email or password')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Incorrect email or password')
    return user
}

//generate token, save to tokens list and give back to the client 
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens.push({ token })
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User