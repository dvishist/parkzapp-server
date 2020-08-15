const express = require('express')
const router = new express.Router()
const Parking = require('../db/models/parking')
const auth = require('../middleware/auth')

router.post('/parkings', auth, async (req, res) => {
    const parking = new Parking(req.body)
    try {
        await parking.save()
        res.status(201).send(parking)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get('/parkings/:id', auth, async (req, res) => {
    const parking = await Parking.findById(req.params.id)
    if (!parking) throw new Error(`Couldn't find parking`)
    res.send(parking)
})

router.post('/parkings/:id/ingress', auth, async (req, res) => {
    const parking = await Parking.findById(req.params.id)
    if (!parking) throw new Error(`Couldn't find parking`)
})

module.exports = router