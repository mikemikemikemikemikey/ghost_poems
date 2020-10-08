const express = require('express')

const router = express.Router()
const path = require('path');

// deployment
router.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', '/index.html'))
  })
  /*
router.get('/*', (req, res, next) => {
  res.send('test home')
 // const socket = io()
})*/

module.exports = router
