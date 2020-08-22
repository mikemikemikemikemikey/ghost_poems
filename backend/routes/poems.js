const express = require('express')

const poemRouter = express.Router()
const jwt = require('jsonwebtoken')
const Poem = require('../models/poem')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')

poemRouter.get('/', async (request, response) => {
  const poems = await Poem.find({})
    .populate('user', { username: 1 })
    .populate('children', { content: 1 })
  response.json(poems)
})

poemRouter.post('/:head', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const { head } = request.params
  const poem = new Poem({ ...request.body, user: user._id, head })

  const result = await poem.save()
  if (head) {
    const poemHead = await Poem.findById(request.params.head)

    poemHead.children = poemHead.children.concat(result._id)

    await poemHead.save()
  }

  const addToUser = await Poem.findById(result._id)
  user.poems = user.poems.concat(addToUser._id)
  await user.save()
  response.status(201).json(result)
})

poemRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const poem = await Poem.findById(request.params.id)

  if (poem.user.toString() === decodedToken.id.toString()) {
    const user = await User.findById(decodedToken.id)
    if (poem.head) {
      await Poem.findByIdAndRemove(request.params.id)

      await Poem.updateOne({ _id: poem.head }, { $pull: { children: poem._id } })
    } else {
      const newHead = await Poem.findById(poem.children[0])

      newHead.children = poem.children.slice(1)

      newHead.head = poem.head

      await newHead.save()

      await Poem.findByIdAndRemove(poem._id)

      poem.children.slice(1).forEach(async (child) => {
        await Poem.updateOne({ _id: child }, { $set: { head: newHead._id } })
      })
    }
    await User.updateOne({ _id: user._id }, { $pull: { poems: poem._id } })
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'wrong user' })
  }
})

poemRouter.put('/:id/:likes', async (request, response) => {
  console.log('made it to beggining of put')
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (request.params.likes) {
    
    const p = request.body
    const result = await Poem.findByIdAndUpdate(request.params.id, p, {new: true})
    response.status(200).json(result).end()
  } else {
    console.log('made it past likes')
    let poem = await Poem.findById(request.params.id)
    if (poem.user.toString() === decodedToken.id.toString()) {
      poem = { ...poem, ...request.body }
      await poem.save()
    } else {
      response.status(401).json({ error: 'wrong user' })
    }
  }
})

module.exports = poemRouter
