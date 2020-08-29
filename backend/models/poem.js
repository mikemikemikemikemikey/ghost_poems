const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const poemSchema = new mongoose.Schema({

  title: { type: String, maxlength: 50 },
  content: { type: String, maxlength: 100 },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem',
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poem',
  }],
}, { timestamps: true })

poemSchema.set('toJson', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Poem', poemSchema)
