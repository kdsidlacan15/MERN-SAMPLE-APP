require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


const app = express()

// middleware
app.use(express.json())
//Enable Cors
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user/', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Connected to DB listening on port ${process.env.PORT}`)
})
})
.catch((error) => {
  console.log(error)
})


