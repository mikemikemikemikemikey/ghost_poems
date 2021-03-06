const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { body } = request
  if (body.password.length < 4) {
    return response.status(400).json({ error: 'Password too short' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})
usersRouter.get('/:username', async (request, response) => {
  const user = await User.findOne({ username: request.params.username})
    .populate('poems')
  response.json(user)
})
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('poems')
  response.json(users)
})

module.exports = usersRouter
