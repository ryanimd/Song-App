const express = require('express')
const landing = express.Router()

landing.get('/', (req, res) => {
  // res.render('../js/land_page.js')
})

module.exports = landing;
