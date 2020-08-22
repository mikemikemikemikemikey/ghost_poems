const bcrypt = require('bcrypt')
const Poem = require('../models/poem')
const User = require('../models/user')

const linkedPoem = [{

  title: 'Poem Start',
  content: 'First line of poem',
},
{
  content: 'Second line of poem',
},
{
  content: 'Third line of poem',
}]

const seperatePoem = {
  title: 'Different poem',
  content: 'something beautiful',
  head: true,
}

const poemsInDb = async () => {
  const poems = await Poem.find({})
  return poems
}

const createPoem = async (p) => {
  const poem = new Poem(p)
  const newPoem = await poem.save()
  await User.findByIdAndUpdate({ _id: p.user }, { $push: { poems: newPoem._id } })
  if (p.head) {
    await Poem.findByIdAndUpdate({ _id: p.head._id }, { $push: { children: newPoem._id } })
  }
}

module.exports = {
  linkedPoem, seperatePoem, poemsInDb, createPoem,
}
