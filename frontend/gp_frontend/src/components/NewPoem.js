import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'
import poemService from '../services/poems'
import Notification from './Notification'
import { newMessage } from '../reducers/messageReducer'
import socket from '../services/socket'
import { Input, Button, StyledTextArea } from './Style'

const NewPoem = () => {
  const user = useSelector((state) => state.user)
  const [message, setMessage] = useState({ message: null, error: false })
  const dispatch = useDispatch()
  const history = useHistory()
  const title = useField('text')
  const content = useField('text')

  const createPoem = async (event) => {
    event.preventDefault()
    if (user) {
      if (title.value === '' || content.value === '') {
        setMessage({ message: 'ghostin too hard', error: true })
        setTimeout(() => {
          setMessage({ message: null, error: false })
        }, 5000)
        return
      }
      try {
        await poemService.create({ title: title.value, content: content.value })
        dispatch(newMessage(`new rap ${title.value} created!`, false))
        title.onSubmit()
        content.onSubmit()
        socket.emit('data_request')
        history.push('/')
      } catch (err) {
        console.log(err)
        setMessage({ message: err, error: true })
        setTimeout(() => {
          setMessage({ message: null, error: false })
        }, 5000)
      }
    } else {
      setMessage({ message: 'please login to create a rap', error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }
  return (
    <div className="new-content">
      <h2>create rap</h2>
      <form onSubmit={createPoem} data-cy="poemForm">
        <div>
          title
          <br />
          <Input {...title} data-cy="poemTitle" />
        </div>
        <div>
          first lines...
          <br />
          <StyledTextArea rows="2" cols="40" {...content} data-cy="poemContent" />
        </div>
        <Button type="submit" data-cy="create-button">create!</Button>
      </form>
      <div className = 'notification-wrapper'>
        <Notification message={message} />
      </div>
    </div>
  )
}
export default NewPoem
