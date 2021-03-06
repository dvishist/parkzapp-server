const express = require('express')
const router = new express.Router()
const ParkingSession = require('../db/models/parkingSession')
const Parking = require('../db/models/parking')
const auth = require('../middleware/auth')

//create new Parking Session
router.post('/parkingsessions', auth, async (req, res) => {
    try {
        const session = new ParkingSession(req.body)
        session.timestamps.ingress = new Date()
        session.timestamps.egress = null
        await session.save()
        const parking = await Parking.findById(session.parking)
        parking.occupants++
        await parking.save()
        res.status(201).send(session)
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

//egress parking Session
router.post('/parkingsessions/egress/:id', auth, async (req, res) => {
    try {
        const session = await ParkingSession.findById(req.params.id)
        session.timestamps.egress = new Date()
        await session.save()
        const parking = await Parking.findById(session.parking)
        parking.occupants--
        await parking.save()
        res.status(200).send(session)
    } catch (err) {
        res.status(400).send(err)
    }
})

//get Parking Session by Id
router.get('/parkingsessions/:id', auth, async (req, res) => {
    const session = await ParkingSession.findById(req.params.id)
    if (!session) throw new Error(`Couldn't find session`)
    res.status(200).send(session)
})

//get parking sessions by userId
router.get('/parkingsessions/user/:id', auth, async (req, res) => {
    try {
        const sessions = await ParkingSession.find({ user: req.params.id })
        res.status(200).send(sessions)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router