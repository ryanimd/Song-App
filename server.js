
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
const songController = require('./controllers/songs_controller.js')
app.use('/songs', songController)


//LISTENER
app.listen(PORT, () => {
    console.log('listening on Port', PORT)
})