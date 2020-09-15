import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useField from '../hooks'
import poemService from '../services/poems'
import { initializePoems } from '../reducers/poemReducer'
import Notification from './Notification'
import { Input, Button } from './Style'

const PoemTitle = ({ poem }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState({ message: null, error: false })
  const [edit, setEdit] = useState(false)
  const editedContent = useField('text')
  const content = poem.title

  const editContent = () => {
    setEdit(true)
    editedContent.onChange({ target: { value: content } })
  }
  const submitEdit = async (event) => {
    try {
      event.preventDefault()
      if (!editedContent.value) throw 'ghostin too hard'
      await poemService.editTitle(editedContent.value, poem._id)
      setEdit(false)
      dispatch(initializePoems())
    } catch (err) {
      setEdit(false)
      let mess = err
      if (err === 'wrong user') mess = `only ${poem.user.username} can edit this`
      setMessage({ message: mess, error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }
  const cancel = () => {
    setEdit(false)
  }

  if (!poem) return null

  return (
    <div className="poem-content">
      {edit ? (
        <form onSubmit={submitEdit}>
          <div><Input {...editedContent} data-cy = 'title-input'/></div>
          <div className="title-buttons">
            <Button type="submit" data-cy = 'title-submit'>edit</Button>
            <Button onClick={cancel}>nevermind</Button>
          </div>
        </form>
      ) : <div className="poem-title" onClick={editContent} data-cy = 'poem-title'>{content}</div>}
      <Notification message={message} />
    </div>
  )
}

export default PoemTitle
