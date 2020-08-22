const bcrypt = require('bcrypt')
const User = require('../models/user')

const initialUsers = [

  { username: 'King Kong', password: '235252' },
  { username: 'Big Poppa', password: '345363' },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

const createUser = async (u) => {
  const pHash = await bcrypt.hash(u.password, 10)

  const user = new User({
    username: u.username,
    name: u.name,
    passwordHash: pHash,
  })

  const result = await user.save()
  return result
}

module.exports = {
  initialUsers, usersInDb, createUser,
}
