const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    image: String
})


const Song = mongoose.model('Song', songSchema)
module.exports = Song;
