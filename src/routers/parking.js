const express = require('express')
const router = new express.Router()
const Parking = require('../models/parking')

router.post('/parkings', async (req, res) => {
    const parking = new Parking(req.body)
    try {
        await parking.save()
        res.status(201).send(parking)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router