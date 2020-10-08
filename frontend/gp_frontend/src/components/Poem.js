import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import PoemChild from './PoemChild'
import PoemTitle from './PoemTitle'
import Notification from './Notification'
import poemService from '../services/poems'
import userService from '../services/users'
import useField from '../hooks'
import { Button, StyledTextArea, StyledPoem } from './Style'
import socket from '../services/socket'

const Poem = ({ poem }) => {
  const user = useSelector((state) => state.user)
  const [message, setMessage] = useState({ message: null, error: false })
  const [enjoyStyle, setEnjoyStyle] = useState(false)
  const [toggle, setToggle] = useState({ show: false, label: 'contribute' })
  const addedContent = useField('text')
  const enjoyB = useRef(null)

  useEffect(() => {
    async function userLikes() {
      const u = await userService.getUser(user.username)
      if (u.likedPoems.includes(poem._id)) {
        setEnjoyStyle(true)
      }
    }
    if (user) userLikes()
  }, [poem, user])

  const addEnjoy = async () => {
    enjoyB.current.blur()
    try {
      if (!user) throw new Error('please login to enjoy :)')
      
      if (!enjoyStyle) {
        await poemService.addLike({
          ...poem,
          likes: poem.likes + 1,
          user: poem.user.id,
          children: poem.children ? poem.children.map((c) => c._id) : null,
        })

        socket.emit('data_request')
        setEnjoyStyle(true)
      } else {
        await poemService.removeLike(poem._id)
        console.log('test remove')
        socket.emit('data_request')
        setEnjoyStyle(false)
      }
    } catch (err) {
      console.log(err)
      setMessage({ message: err.message, error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }

  const toggleView = () => {
    if (user) {
      if (toggle.show) {
        setToggle({ show: false, label: 'contribute' })
        addedContent.onSubmit()
      } else {
        setToggle({ show: true, label: 'cancel' })
      }
    } else {
      setMessage({ message: 'please login to contribute', error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }
  const submitContent = async (event) => {
    event.preventDefault()
    try {
      await poemService.addContent({ content: addedContent.value }, poem._id)
      addedContent.onSubmit()
      setToggle({ show: false, label: 'contribute' })
      socket.emit('data_request')
    } catch (err) {
      setMessage({ message: err.message, error: true })
      setTimeout(() => {
        setMessage({ message: null, error: false })
      }, 5000)
    }
  }

  if (!poem) return null

  return (
    <div className="styled-poem">
      <StyledPoem >
        <h2><PoemTitle poem={poem} user={user}/></h2>
        <PoemChild poem={poem} key={poem._id} user = {user}/>
        { poem.children ? poem.children.map((c) => <PoemChild poem={c} key={c._id} user = {user}/>) : null }
        {toggle.show
          ? (
            <div>
              <form onSubmit={submitContent}>
                <div><StyledTextArea rows="2" cols="30" {...addedContent} data-cy='content-input'/></div>
                <div>
                  <Button type="submit" data-cy='content-submit'>submit!</Button>
                  <Button onClick={toggleView}>{toggle.label}</Button>
                </div>
              </form>
            </div>
          ) : null}
        <div className="enjoy-button">
          {' '}
          enjoys:
          {poem.likes}
          {' '}
          <Button onClick={() => addEnjoy()} ref={enjoyB} enjoyed={enjoyStyle} data-cy = 'enjoy'> enjoy </Button>
          {toggle.show ? null : <Button onClick={toggleView} data-cy = 'contribute-toggle'>{toggle.label}</Button>}
        </div>
        <Notification message={message} />
      </StyledPoem>
    </div>
  )
}

export default Poem
