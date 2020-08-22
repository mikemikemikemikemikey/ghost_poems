const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { TestScheduler } = require('jest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

describe('tests for login', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('login succeeds and returns token', async () => {
    const response = await api.post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)

    expect(response.body.token)
  })
  test('login fails with incorrect password', async () => {
    await api.post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .expect(401)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
