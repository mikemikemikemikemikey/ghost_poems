const mongoose = require('mongoose')
const supertest = require('supertest')
const { TestScheduler } = require('jest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const userHelper = require('./userHelper')
const poemHelper = require('./poemHelper')

const api = supertest(app)
const User = require('../models/user')
const Poem = require('../models/poem')

test('change content', async () => {
  await User.deleteMany({})
  await Poem.deleteMany({})

  const user = await userHelper.createUser(userHelper.initialUsers[0])
  await poemHelper.createPoem({ ...poemHelper.linkedPoem[0], user: user._id })

  const users = await userHelper.usersInDb()
  const poem = await Poem.find({})
  const userForToken = {
    username: users[0].username,
    id: users[0]._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  const updatePoem = new Poem({ ...poem[0]._doc, content: 'changed line in poem' })

  await api.put(`/api/poems/child/${poem[0]._id}/${false}`)
    .set('authorization', `bearer ${token}`)
    .send(updatePoem)
    .expect(200)

  const poemAtEnd = await Poem.find({})
  expect(poemAtEnd[0].content).toBe('changed line in poem')
  mongoose.connection.close()
})
