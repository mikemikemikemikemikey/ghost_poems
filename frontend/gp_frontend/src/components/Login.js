import React from 'react'
import { useDispatch } from "react-redux"
import useField from '../hooks'
import poemService from '../services/poems'
import loginService from '../services/login'
import { loginUser } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try{
      const user = await loginService.login({
        username: username.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedPoemUser', JSON.stringify(user)
      )
      poemService.setConfig(user.token)

      dispatch(loginUser(user))
      console.log('login end')
      username.onSubmit()
      password.onSubmit()
      history.push('/')
    } catch (exception) {
      console.log(exception)
     // dispatch(newMessage('Wrong credentials'))
      setTimeout(() => {
       // dispatch(removeMessage())
      }, 5000)
    }
    //<Notification message={errorMessage} />
  }

return (
  <div>
    <h2>Log in to ghost poems</h2>
    <form onSubmit={handleLogin} data-cy = 'loginForm'>
      <div>
        username
        <input {...username} data-cy = 'username'/>
      </div>
      <div>
        password
        <input {...password} data-cy = 'password'/>
      </div>
      <button type = 'submit' data-cy = 'login-button'>login</button>
    </form>
  </div>
)

}

export default Login