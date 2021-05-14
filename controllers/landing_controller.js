const express = require('express')
const landing = express.Router()

landing.get('/', (req, res) => {
  res.render('land_page.js')
})

module.exports = landing;
