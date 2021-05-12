
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
const songController = require('./controllers/songs_controllers.js')
app.use('/song', songController)


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
