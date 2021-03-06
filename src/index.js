const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

const userRouter = require('./routers/user')
const parkingRouter = require('./routers/parking')
const vehicleRouter = require('./routers/vehicle')
const parkingSessionRouter = require('./routers/parkingSession')


app.use(express.json())
app.use(userRouter)
app.use(vehicleRouter)
app.use(parkingRouter)
app.use(parkingSessionRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
