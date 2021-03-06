
//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');

//CONFIGGURATION
const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI


app.use(express.static('public'))
app.use(express.json())
// const landingController = require('./controllers/landing_controller.js')
// app.use('/landing', landingController)
const songController = require('./controllers/songs_controllers.js')
app.use('/song', songController)

// -----------
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
//LISTENER
app.listen(PORT, () => {
    console.log('listening on Port', PORT)
})


//MONGODB CONNECTION
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  mongoose.connection.on('error', err =>
  console.log(
      err.message,
      'is Mongod not running?/Problem with Atlas Connection?'
      )

  )

  mongoose.connection.on('connected', () =>
    console.log('mongo connected: ', MONGODB_URI)
  )
  mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))
