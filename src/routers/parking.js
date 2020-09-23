const express = require('express')
const router = new express.Router()
const Parking = require('../db/models/parking')
const auth = require('../middleware/auth')
const geolib = require('geolib')


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

// //get Parkings by state
// router.get('/parkings/find/:state', auth, async (req, res) => {
//     try {
//         const parkingList = Parking.find({ state: req.params.state })
//         res.status(200).send(parkingList)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })

//Get List of Parkings nearby
//this will scale very poorly as it calculates the distance with all of the parking lots on database
//should use mapbox to filter parkings by state or suburb
router.post('/parkings/findNearby', auth, async (req, res) => {
    try {
        const user = req.body
        const parkings = await Parking.find({})
        let result = parkings.map(parking => {
            const distance = geolib.getDistance(
                {
                    latitude: user.latitude,
                    longitude: user.longitude
                },
                {
                    latitude: parking.coordinates.latitude,
                    longitude: parking.coordinates.longitude
                }
                , 1)
            return { parking, distance }
        })

        //sort distances by ascending order
        result = result.sort((parking1, parking2) => parking1.distance - parking2.distance)
        res.status(200).send(result)
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
    parking.occupants--
    await parking.save()
    res.status(200).send(parking)
})

router.delete('/parkings/:id', auth, async () => {
    try {
        await Parking.findByIdAndDelete(req.params.id)
        req.status(204).send()
    } catch (err) {
        req.status(400).send(err)
    }
})

module.exports = router