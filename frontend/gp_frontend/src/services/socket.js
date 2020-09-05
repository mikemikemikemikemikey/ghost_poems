import socketIOClient from 'socket.io-client'
import { initializePoems } from '../reducers/poemReducer'
import { store } from '../index'

const socket = socketIOClient('http://localhost:3003/')

socket.on('data_send', () => {
  store.dispatch(initializePoems())
})
export default socket