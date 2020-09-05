const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const path = require('path')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const poemRouter = require('./routes/poems')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const middleware = require('./utils/middleware')

console.log('connecting to', 'Mongo')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

// app.use(express.static(path.join('.', 'build')));

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/poems', poemRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/testing')
  app.use('/api/testing', testingRouter)
}
app.use('/api/login', loginRouter)
app.use('/', indexRouter)
app.use(middleware.errorHandler)

module.exports = app
