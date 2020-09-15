const Poem = require('../models/poem')
const User = require('../models/user')
const router = require('express').Router()

router.get('/reset', async (request, response) => {
  await Poem.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})
router.get('/newrap', async (request, response) => {
 
  const user = new User({
    username: 'ghostface',
    passwordHash: 'hash',
  })
  const savedUser = await user.save()

  const poem = new Poem({title: 'poem title', content: 'poem line 1', user: savedUser._id, head: null} )
   await poem.save()
  response.status(204).end()

})
router.get('/alreadyliked', async (request, response) => {
  const user = await User.findOne({})
  const poem = new Poem({title: 'Liked title', content: 'liked content', user: user._id, head: null, likes: 1} )
  const result = await poem.save()
  await User.updateOne({_id: user._id}, { $push: { likedPoems: result._id } })
  response.status(204).end()
})

module.exports = router
