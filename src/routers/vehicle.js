const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../db/models/user')
const Vehicle = require('../db/models/vehicle')


//create new Vehicle
router.post('/vehicles', auth, async (req, res) => {
    const body = req.body
    const vehicle = new Vehicle({ ...body, owner: req.user.id })
    try {
        await vehicle.save()
        res.status(201).send(vehicle)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//get vehicle by Id
router.get('/vehicles/:id', auth, async (req, res) => {
    const vehicle = Vehicle.findById(req.params.id)
    if (!vehicle) throw new Error(`Couldn't find vehicle`)
    res.send(vehicle)
})

//update a vehicle
router.patch('/vehicles/:id', auth, async (req, res) => {
    const updates = req.body
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).send(vehicle)
    } catch (err) {
        res.status(400).send(err)
    }
})

//delete a vehicle
router.delete('/vehicles/:id', auth, async (req, res) => {
    const vehicle = Vehicle.findById(req.params.id)
    try {
        await vehicle.remove()
        res.status(200).send()
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router