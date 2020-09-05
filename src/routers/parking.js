const express = require('express')
const router = new express.Router()
const Parking = require('../db/models/parking')
const auth = require('../middleware/auth')

//create new Parking
router.post('/parkings', auth, async (req, res) => {
    const parking = new Parking(req.body)
    try {
        await parking.save()
        res.status(201).send(parking)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//get Parking by Id
router.get('/parkings/:id', auth, async (req, res) => {
    const parking = await Parking.findById(req.params.id)
    if (!parking) throw new Error(`Couldn't find parking`)
    res.send(parking)
})

// Ingress parking
router.post('/parkings/:id/ingress', auth, async (req, res) => {
    const parking = await Parking.findById(req.params.id)
    if (!parking) throw new Error(`Couldn't find parking`)
    parking.occupants++
    await parking.save()
    res.status(200).send(parking)
})

// Egress parking
router.post('/parkings/:id/egress', auth, async (req, res) => {
    const parking = await Parking.findById(req.params.id)
    if (!parking) throw new Error(`Couldn't find parking`)
})

module.exports = router