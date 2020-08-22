const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { TestScheduler } = require('jest')
const userHelper = require('./userHelper')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const Poem = require('../models/poem')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  test('creation with new username', async () => {
    const usersAtStart = await userHelper.usersInDb()

    const newUser = {
      username: 'tester',
      password: '12345',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('unique user validation', async () => {
    const usersAtStart = await userHelper.usersInDb()

    const newUser = {
      username: 'root',
      password: '12321',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('password creation validation', async () => {
    const usersAtStart = await userHelper.usersInDb()

    const newUser = {
      username: 'test',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await userHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('get users returns user and referenced poem content', async () => {
    const users = await userHelper.usersInDb()
    const user = await User.findById(users[0]._id)
    const newPoem = new Poem({
      title: 'test poem',
      content: 'a poem line here',
      user: users[0]._id,
      head: true,
      tail: true,
    })

    const result = await newPoem.save()
    const addToUser = await Poem.findById(result._id)
    user.poems = user.poems.concat(addToUser._id)
    await user.save()
    const response = await api.get('/api/users').expect(200)

    expect(response.body[0].poems[0].title).toBe('test poem')
  })
})
afterAll(() => {
  mongoose.connection.close()
})
