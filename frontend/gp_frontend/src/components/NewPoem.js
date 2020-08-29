import React, {useState} from 'react'
import useField from '../hooks'
import poemService from '../services/poems'
import Notification from './Notification'
import {initializePoems} from '../reducers/poemReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { newMessage } from '../reducers/messageReducer'

const NewPoem = () => {
  const user = useSelector(state => state.user)
  const [message, setMessage] = useState({message: null, error: false})
  const dispatch = useDispatch()
  const history = useHistory()
  const title = useField('text')
  const content = useField('text')
  
  const createPoem = async (event) => {
    event.preventDefault()
    if(user){
      try{
    await poemService.create({title: title.value, content: content.value})
    dispatch(newMessage(`new poem ${title.value} created!`, false))
    title.onSubmit()
    content.onSubmit()
    history.push('/')
      }catch(err) {
        console.log(err)
        setMessage({message: err, error: true})
        setTimeout(() => {
          setMessage({message: null, error: false})
        }, 5000)
      }
    }else{
      setMessage({message: 'please login to create a poem', error: true})
      setTimeout(() => {
        setMessage({message: null, error: false})
      }, 5000)
    }
  }
  return(
      <div>
        <h2>create poem</h2>
        <form onSubmit={createPoem} data-cy = 'poemForm'>
      <div>
        title
        <input {...title} data-cy = 'poemTitle'/>
      </div>
      <div>
        first lines...
        <input {...content} data-cy = 'poemContent'/>
      </div>
      <button type = 'submit' data-cy = 'create-button'>create!</button>
    </form>
    <Notification message = {message} />
      </div>
  )
}
export default NewPoem