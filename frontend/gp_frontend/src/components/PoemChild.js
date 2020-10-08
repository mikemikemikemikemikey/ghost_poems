import React, { useState } from 'react'
import useField from '../hooks'
import poemService from '../services/poems'
import Notification from './Notification'
import socket from '../services/socket'
import { Button, StyledTextArea } from './Style'

const PoemChild = ({ poem, user }) => {
  const [message, setMessage] = useState({ message: null, error: false })
  const [edit, setEdit] = useState(false)
  const editedContent = useField('text')
  const { content } = poem
  const formattedContent = content.split(',').filter(word => word.match('.+[^ ]') )

  const editContent = () => {
    setEdit(true)
    editedContent.onChange({ target: { value: content } })
  }
  const submitEdit = async (event) => {
    try {
      event.preventDefault()
      if(!user) throw new Error('please login to edit')
      if (editedContent.value === '') throw new Error('ghostin too hard')
      await poemService.editContent(editedContent.value, poem._id)
      setEdit(false)
      socket.emit('data_request')
    } catch (err) {
      setEdit(false)
      let mess = err.message
      if (err.message === 'wrong user') mess = `only ${poem.user.username} can edit this`
      setMessage({ message: mess, error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }
  const cancel = () => {
    setEdit(false)
  }
  const deletePoem = async () => {
    setEdit(false)
    try {
      await poemService.removePoem(poem)
      socket.emit('data_request')
    } catch (err) {
      setMessage({ message: `only ${poem.user.username} can delete this content`, error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }

  if (!poem) return null

  return (
    <div className="poem-content">
      {edit ? (
        <form onSubmit={submitEdit}>
          <div><StyledTextArea rows="2" cols="30" {...editedContent} /></div>
          <div>
            <Button type="submit">edit</Button>
            <Button onClick={deletePoem}>delete</Button>
            <Button onClick={cancel}>nevermind</Button>
          </div>
        </form>
      ) : <div onClick={editContent}>{formattedContent.map((item, i) => {
        return <p key={i}>{item},</p>
      })}</div>}
      <Notification message={message} />
    </div>
  )
}

export default PoemChild
