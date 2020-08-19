const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../db/models/user')
const multer = require('multer')
const sharp = require('sharp')

//default message to show on landing page
router.get('/', async (req, res) => {
    res.status(200).send({
        message: "Welcome to the Parkzapp API. Refer to the API documentation for more details. https://github.com/dvishist/parkzapp-server"
    })
})


//create new User 
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(202).send({ user, token })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token)
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send(err.message)
    }
})


//logout of all session  remove all existing tokens
//to be used when changing a password
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send(err.message)
    }
})

//get profile
router.get('/users/self', auth, async (req, res) => {
    res.send(req.user)
})

//update profile
router.patch('/users/self', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['name', 'email', 'password']
    const isAllowed = updates.every(update => allowed.includes(update))
    if (!isAllowed) return res.status(400).send({ error: 'Trying to add invalid updates!' })
    try {
        const user = req.user
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

//delete user
router.delete('/users/self', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//verify file is image
const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an Image'))
        }
        cb(undefined, true)
    }
})

//upload image
router.post('/users/self/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

//delete image
router.delete('/users/self/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send(req.user)
})

//read image
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) throw new Error()
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router