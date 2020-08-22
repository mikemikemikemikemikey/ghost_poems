const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  username: {
    type: String, unique: true, required: true, minlength: 1,
  },
  poems: [
    {
      type: mongoose.SchemaTypes.ObjectID,
      ref: 'Poem',
    },
  ],
  passwordHash: String,
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)