import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { initializePoems } from './reducers/poemReducer'
import Poem from './components/Poem'
import Login from './components/Login'
import About from './components/About'
import Select from './components/Select'
import Notification from './components/Notification'
import poemService from './services/poems'
import { loginUser, logoutUser } from './reducers/userReducer'

import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom'
import NewPoem from './components/NewPoem'
import { Navbar, Nav} from 'react-bootstrap'
import { removeMessage } from './reducers/messageReducer'
function App() {
  const dispatch = useDispatch()
  const message = useSelector(state => state.message)
  const poems = useSelector(state => state.poems)
  const user = useSelector(state => state.user)
  const [sort, setSort] = useState('top')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPoemUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      poemService.setConfig(user.token)
    }
    dispatch(initializePoems())
    if(message.message){
     setTimeout(() => {
    dispatch(removeMessage())
     }, 5000) 
    }
  },[dispatch, message])

  const handleLogout = () => {
    dispatch(logoutUser())
    poemService.setConfig(null)
    window.localStorage.removeItem('loggedPoemUser')
  }
  const sortTop = (poems) => {
    poems.sort((a,b) => {
      return b.likes - a.likes
    })
    return poems
  }
  const sortNew = (poems) => {
    poems.sort((a,b) => {
      const da = new Date(a.updatedAt).getTime()
      const db = new Date(b.updatedAt).getTime()
      return db - da
    })
   return poems
  }

  const sortSelector = (poems, sort) =>{
    if(sort === 'new') return sortNew(poems)
    if(sort === 'top') return sortTop(poems)
  }

  const padding = {
    padding: 5
  }
  return (
    <div>
      <Navbar  bg="dark" variant="dark">
          <Nav className="mr-auto flex-row" >
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">main</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/new">new poem</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em >{user.username} logged in <button onClick={handleLogout} >logout</button></em>
                : <Link to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
      </Navbar>
      <Switch>
        <Route path = '/login'>
          <Login />
        </Route>
        <Route path = '/new'>
          <NewPoem />
        </Route>
        <Route path = './about'>
          <About />
        </Route>
        <Route path = '/'>
          <h1>Ghost Raps</h1>
          <Select options = {['new','top']} label = 'sort'
           value = {sort} setValue = {setSort} />
          <br></br>
          <Notification message = {message} />
          <div>
          {sortSelector(poems, sort).map(p => 
            <div key = {p._id}>
            {!p.head ? <Poem poem = {p} /> : null}
            <br></br>
            </div>
          )}
          </div>
        </Route>
        
      </Switch>
    </div>
  )
}

export default App
