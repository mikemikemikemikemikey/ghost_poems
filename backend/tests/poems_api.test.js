const mongoose = require('mongoose')
const supertest = require('supertest')
const { TestScheduler } = require('jest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const userHelper = require('./userHelper')
const poemHelper = require('./poemHelper')

const api = supertest(app)
const User = require('../models/user')
const Poem = require('../models/poem')

describe('tests with initial poem', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Poem.deleteMany({})

    const user = await userHelper.createUser(userHelper.initialUsers[0])
    const user2 = await userHelper.createUser(userHelper.initialUsers[1])
    await poemHelper.createPoem({ ...poemHelper.linkedPoem[0], user: user._id })
  })
  test('post two new links to initial poem', async () => {
    const poemsStart = await poemHelper.poemsInDb()

    const id = poemsStart[0]._id.toString()
    const users = await userHelper.usersInDb()

    const userForToken = {
      username: users[0].username,
      id: users[0]._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    const poemLink = poemHelper.linkedPoem[1]
    await api.post(`/api/poems/${id}`)
      .set('authorization', `bearer ${token}`)
      .send(poemLink)
      .expect(201)

    const poemLink2 = poemHelper.linkedPoem[2]
    await api.post(`/api/poems/${id}`)
      .set('authorization', `bearer ${token}`)
      .send(poemLink2)
      .expect(201)
    const poemsEnd = await api.get('/api/poems')
    expect(poemsEnd.body).toHaveLength(poemsStart.length + 2)
    expect(poemsEnd.body[0].children).toHaveLength(2)
  })
  test('delete middle content', async () => {
    const users = await userHelper.usersInDb()
    const headPoem = await Poem.find({})
    await poemHelper.createPoem({ ...poemHelper.linkedPoem[1], head: headPoem[0], user: users[0]._id })
    await poemHelper.createPoem({ ...poemHelper.linkedPoem[2], head: headPoem[0], user: users[0]._id })
    const poemsBefore = await poemHelper.poemsInDb()
    const id = poemsBefore[1]._id.toString()
    const userForToken = {
      username: users[0].username,
      id: users[0]._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api.delete(`/api/poems/${id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)

    const poemsAfter = await poemHelper.poemsInDb()
    expect(poemsAfter).toHaveLength(poemsBefore.length - 1)
  })
  test('delete head', async () => {
    const users = await userHelper.usersInDb()
    const headPoem = await Poem.find({})
    await poemHelper.createPoem({ ...poemHelper.linkedPoem[1], head: headPoem[0], user: users[0]._id })
    await poemHelper.createPoem({ ...poemHelper.linkedPoem[2], head: headPoem[0], user: users[0]._id })
    const poemsBefore = await poemHelper.poemsInDb()
    const id = poemsBefore[0]._id.toString()
    const userForToken = {
      username: users[0].username,
      id: users[0]._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await api.delete(`/api/poems/${id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)

    const poemsAfter = await poemHelper.poemsInDb()
    expect(poemsAfter).toHaveLength(poemsBefore.length - 1)
  })
  test('add like', async () => {
    const users = await userHelper.usersInDb()
    const poem = await Poem.find({})
    const userForToken = {
      username: users[0].username,
      id: users[0]._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    const updatePoem = new Poem({ ...poem[0]._doc, likes: poem[0].likes + 1 })

    await api.put(`/api/poems/${poem[0]._id}/${true}`)
      .set('authorization', `bearer ${token}`)
      .send(updatePoem)
      .expect(200)

    const poemAtEnd = await Poem.find({})
    expect(poemAtEnd[0].likes).toEqual(poem[0].likes + 1)
  })
  test('change content', async () => {
    const users = await userHelper.usersInDb()
    const poem = await Poem.find({})
    const userForToken = {
      username: users[0].username,
      id: users[0]._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    const updatePoem = new Poem({ ...poem[0]._doc, content: 'changed line in poem' })

    await api.put(`/api/poems/${poem[0]._id}/${false}`)
      .set('authorization', `bearer ${token}`)
      .send(updatePoem)
      .expect(200)

    const poemAtEnd = await Poem.find({})
    expect(poemAtEnd[0].content).toBe('changed line in poem')
  })
})
afterAll(() => {
  mongoose.connection.close()
})
