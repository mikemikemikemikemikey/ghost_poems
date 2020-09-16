import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'
import poemService from '../services/poems'
import loginService from '../services/login'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'
import { Input, Button } from './Style'

const Login = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState({ message: null, error: false })
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })
      window.localStorage.setItem(
        'loggedPoemUser', JSON.stringify(user),
      )
      poemService.setConfig(user.token)
      dispatch(loginUser(user))
      username.onSubmit()
      password.onSubmit()
      history.push('/')
    } catch (exception) {
      setMessage({ message: 'wrong credentials', error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }

  return (
    <div className="login-and-new">
      <h2>log in to ghost raps</h2>
      <form onSubmit={handleLogin} data-cy="loginForm" >
        <label classname="login-and-new-input">
          username &nbsp;
          <Input {...username} data-cy="login-username" />
        </label>
        <label>
          password &nbsp;
          <Input {...password} data-cy="login-password" />
        </label>
        <Button type="submit" data-cy="login-button">login</Button>
      </form>
      <Notification message={message} />
    </div>
  )
}

export default Login
