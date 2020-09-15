const config = require('../utils/config')
const app = require('../app')
const socketIO = require('socket.io')
const http = require('http').createServer(app)

const io = socketIO(http)

io.on('connection', socket => {
  console.log('a user connected', socket.id)

  socket.on('data_request', async () => {
    io.sockets.emit('data_send')
  })
})

http.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

