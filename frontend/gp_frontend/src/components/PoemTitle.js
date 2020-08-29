import React, { useState }from 'react'
import useField from '../hooks'
import poemService from '../services/poems'
import { useDispatch } from 'react-redux'
import { initializePoems } from '../reducers/poemReducer'
import Notification from './Notification'

const PoemTitle = ({poem}) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState({message: null, error: false})
  const [edit, setEdit] = useState(false)
  const editedContent = useField('text')
  const content = poem.title

  const editContent = () => {
    setEdit(true)
    editedContent.onChange({target: {value: content}})
    }
    const submitEdit = async (event) => {
      try{
      event.preventDefault()
      if(!editedContent.value) throw 'ghostin too hard'
     await poemService.editTitle(editedContent.value, poem._id) 
      setEdit(false)
      dispatch(initializePoems())
      }catch(err){
        setEdit(false)
        let mess = err
        if(err === 'wrong user') mess = `only ${poem.user.username} can edit this content`
        setMessage({message: mess, error: true})
        setTimeout(() => {
          setMessage({message: null, error: false})
        }, 5000)
        
      }
    }
  const cancel = () => {
    setEdit(false)
  }

  
if(!poem) return null

  return(
    <div >
     {edit ? <form onSubmit={submitEdit}>
    <div><input {...editedContent} /></div>
    <div><button type ='submit'>edit</button>
    <button onClick={cancel}>nevermind</button></div>
   </form>: <div onClick={editContent}>{content}</div>}
   <Notification message = {message}/>
    </div>
  )
}

export default PoemTitle