const client = require('socket.io-client')
const express = require('express')
const app = express()

let socket

app.get('/connect', (request, response) => {
    const url = 'http://localhost:3003'
    socket = client(url)

    socket.on('connect', () => {
        response.sendStatus(200)
    })
})

app.get('/emitrap', (request, response) => {
    socket.emit('data_request')
    response.sendStatus(200)
})


app.listen(3009, () => {
    console.log(`Server running on port 3009`)
  })

