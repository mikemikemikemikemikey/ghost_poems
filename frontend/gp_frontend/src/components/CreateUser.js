import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'
import userService from '../services/users'
import Notification from './Notification'
import { newMessage } from '../reducers/messageReducer'
import poemService from '../services/poems'
import loginService from '../services/login'
import { loginUser } from '../reducers/userReducer'
import { Input, Button } from './Style'

const CreateUser = () => {
  const [message, setMessage] = useState({ message: null, error: false })
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  const createUser = async (event) => {
    event.preventDefault()
    if (username.value === '' || password.value === '') {
      setMessage({ message: 'ghostin too hard', error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
      return
    }
    try {
      await userService.newUser({ username: username.value, password: password.value })
      dispatch(newMessage(`new user ${username.value} created!`, false))
      username.onSubmit()
      password.onSubmit()
      const user = await loginService.login({
        username: username.value, password: password.value,
      })
      window.localStorage.setItem(
        'loggedPoemUser', JSON.stringify(user),
      )
      poemService.setConfig(user.token)
      dispatch(loginUser(user))
      history.push('/')
    } catch (err) {
      setMessage({ message: 'username needs to be unique', error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }
  return (
    <div className="new-content">
      <h2>create user</h2>
      <form onSubmit={createUser}>
        <div>
          username &nbsp;
          <Input {...username} />
        </div>
        <div>
          password &nbsp;
          <Input {...password} />
        </div>
        <Button type="submit" data-cy="create-button">create!</Button>
      </form>
      <Notification message={message} />
    </div>
  )
}
export default CreateUser
