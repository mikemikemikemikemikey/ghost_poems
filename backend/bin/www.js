const config = require('../utils/config')
const app = require('../app')
const http = require('http').createServer(app)
//const io = require('socket.io')(http)

/*io.on('connection', (socket) => {
  console.log('a user connected')
})*/

http.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
