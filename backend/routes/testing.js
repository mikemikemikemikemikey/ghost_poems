const Poem = require('../models/poem')
const User = require('../models/user')
const router = require('express').Router()

router.post('/reset', async (request, response) => {
  await Poem.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
