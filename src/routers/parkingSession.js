const express = require('express')
const router = new express.Router()
const ParkingSession = require('../db/models/parkingSession')
const auth = require('../middleware/auth')

//create new Parking Session
router.post('/parkingsessions', auth, async (req, res) => {
    const session = new ParkingSession(req.body)
    try {
        await session.save()
        res.status(201).send(parking)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

//update Parking Session
router.patch('/parkingsessions/:id', auth, async (req, res) => {
    try {
        const session = ParkingSession.findById(req.body._id)
        Object.keys(req.body).forEach(update => {
            session[update] = req.body[update]
        })
        await session.save()
        res.status(200).send(session)
    } catch (err) {
        res.status(400).send(err)
    }
})

//get Parking Session by Id
router.get('/parkingsessions/:id', auth, async (req, res) => {
    const session = await ParkingSession.findById(req.params.id)
    if (!session) throw new Error(`Couldn't find session`)
    res.send(session)
})

module.exports = router