import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PoemChild from './PoemChild'
import PoemTitle from './PoemTitle'
import Notification from './Notification'
import poemService from '../services/poems'
import userService from '../services/users'
import { initializePoems } from '../reducers/poemReducer'
import useField from '../hooks'

const Poem = ({poem}) => {
const user = useSelector(state => state.user)
const [message, setMessage] = useState({message: null, error: false})
const [enjoyStyle, setEnjoyStyle] = useState({style: {}, set: false})
const [toggle, setToggle] = useState({show: false, label: 'contribute'})
const addedContent = useField('text')
const dispatch = useDispatch()

useEffect(() => {
  async function userLikes() {
  const u = await userService.getUser(user.username)
  if(u.likedPoems.includes(poem._id)) {
  setEnjoyStyle({style: {color: 'green'}, set: true })
  }
  }
  if(user) userLikes()
},[poem, user])

const addEnjoy = async () => {
  try{
    if(!user) throw 'please login to enjoy :)'
  if(!enjoyStyle.set){
  await poemService.addLike({...poem, likes: poem.likes + 1, user: poem.user.id, 
  children: poem.children ? poem.children.map(c => c._id): null})
  dispatch(initializePoems())
  setEnjoyStyle({style: {color: 'green'}, set: true })
  } else {
    await poemService.removeLike(poem._id)
    dispatch(initializePoems())
    setEnjoyStyle({})
  }}catch(err){
    setMessage({message: err, error: true})
    setTimeout(() => {
      setMessage({message: null, error: false})
    }, 5000)
  }
}

const toggleView = () => {
  if(user){
  if(toggle.show){
  setToggle({show: false, label: 'contribute'})
   addedContent.onSubmit()
  } else{
   setToggle({show: true, label: 'cancel'})
  }
  }else{
    setMessage({message: 'please login to contribute', error: true})
    setTimeout(() => {
      setMessage({message: null, error: false})
    }, 5000)
  }

}
const submitContent = async (event) => {
  event.preventDefault()
  try{
  await poemService.addContent({content: addedContent.value}, poem._id)
  addedContent.onSubmit()
  setToggle({show: false, label: 'contribute'})
  dispatch(initializePoems())
  } catch(err){
  setMessage({message: err, error: true})
  setTimeout(() => {
    setMessage({message: null, error: false})
  }, 5000)
  }
}

if(!poem) return null

const poemTitle = poem.title ? poem.title : null

return(
  <div>
    <h3><PoemTitle poem = {poem} /></h3>
    <PoemChild poem = {poem} key = {poem._id} />
   { poem.children ? poem.children.map(c => 
      <PoemChild poem = {c} key={c._id} /> ) : null }
    {toggle.show ? 
    <div>
      <form onSubmit={submitContent}>
      <div><input {...addedContent}/></div>
      <div><button type ='submit'>submit!</button>
      <button onClick ={toggleView}>{toggle.label}</button></div>
      </form>
    </div> : null}
    <div> enjoys: {poem.likes} <button onClick = {() => addEnjoy()} > enjoy </button> 
    {toggle.show ? null : <button onClick ={toggleView}>{toggle.label}</button>}
    </div>
    <Notification message = {message} />
  </div>
)

}

export default Poem