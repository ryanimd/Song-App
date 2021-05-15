const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')


users.get('/', (req, res) => {
    User.find({}, (err, foundEntry) => {
        res.json(foundEntry)
    })
})


users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        res.redirect('/')
    })
})


module.exports = users 