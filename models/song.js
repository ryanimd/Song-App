const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    entry: String,
    date: String
})


const Song = mongoose.model('Song', songSchema)
module.exports = Song;