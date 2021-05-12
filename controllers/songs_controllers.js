const express = require('express')
const song = express.Router()
const Entry = require('../models/song.js')


song.get('/', (req, res) => {
    Entry.find({}, (err, foundEntry) => {
        res.json(foundEntry)
    })
})

song.post('/', (req, res) => {
    Entry.create(req.body, (err, createEntry) => {
        Entry.find({}, (err, foundEntry) => {
            res.json(foundEntry)
        })
    })
})


song.put('/:id', (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, req.body, {new: true},
        (err, updateEntry) => {
            if(err){
                res.send(err)
            }else{
                Entry.findByIdAndUpdate({}, (err, foundEntry) => {
                    res.json(foundEntry)
                })
            }
        })
})


song.debug('/:id', (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, deletedEntry) => {
        Entry.find({}, (err, foundEntry) => {
            res.json(foundEntry)
        })
    })
})


module.exports = song;