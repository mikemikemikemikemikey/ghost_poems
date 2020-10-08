import socketIOClient from 'socket.io-client'
import { initializePoems } from '../reducers/poemReducer'
import { store } from '../store'

const socket = socketIOClient('/')

socket.on('data_send', () => {
  store.dispatch(initializePoems())
})
export default socket