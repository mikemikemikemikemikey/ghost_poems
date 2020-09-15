import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Select from 'react-styled-select'
import { Switch, Route, NavLink } from 'react-router-dom'
import { initializePoems } from './reducers/poemReducer'
import Poem from './components/Poem'
import Login from './components/Login'
import About from './components/About'
import Notification from './components/Notification'
import CreateUser from './components/CreateUser'
import poemService from './services/poems'
import { loginUser, logoutUser } from './reducers/userReducer'
import NewPoem from './components/NewPoem'
import { Button } from './components/Style'
import { removeMessage } from './reducers/messageReducer'
import ghostraps from './images/GhostRaps.gif'
import spaceghost from './images/spaceghost_purp2.jpg'

function App() {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.message)
  const poems = useSelector((state) => state.poems)
  const user = useSelector((state) => state.user)
  const [sort, setSort] = useState('new')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPoemUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      poemService.setConfig(user.token)
    }
    dispatch(initializePoems())
    if (message.message) {
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
  }, [dispatch, message])

  const handleLogout = () => {
    dispatch(logoutUser())
    poemService.setConfig(null)
    window.localStorage.removeItem('loggedPoemUser')
  }
  const sortTop = (poems) => {
    poems.sort((a, b) => b.likes - a.likes)
    return poems
  }
  const sortNew = (poems) => {
    poems.sort((a, b) => {
      const da = new Date(a.updatedAt).getTime()
      const db = new Date(b.updatedAt).getTime()
      return db - da
    })
    return poems
  }

  const sortSelector = (poems, sort) => {
    if (sort === 'new') return sortNew(poems)
    if (sort === 'top') return sortTop(poems)
  }
  const handleChange = (value) => {
    setSort(value)
  }

  return (
    <div className="main-page">
      <div className="left-col">
        <div>

          <img className="ghost-image title" src={ghostraps} alt="title" />

          <div className="navigation">
            <NavLink  activeStyle={{ fontWeight: "bold",color: "gray" }} 
              className="link" to="/home" data-cy="link-home">home</NavLink>
            <NavLink activeStyle={{ fontWeight: "bold",color: "gray" }}
              className="link" to="/new_rap" data-cy="link-new-rap">new rap</NavLink>
            <NavLink activeStyle={{ fontWeight: "bold",color: "gray" }}
              className="link" to="/about">about</NavLink>
            {user ? null : <NavLink activeStyle={{ fontWeight: "bold",color: "gray" }}
                className="link" to="/create_user" data-cy = 'link-new-user'>new user</NavLink>}
            {user
              ? (
                <span className="header-span">
                  {user.username}
                  {' '}
                  logged in
                  {' '}
                  <Button onClick={handleLogout}>logout</Button>
                </span>
              )
              : <NavLink activeStyle={{ fontWeight: "bold",color: "gray" }}
                  className="link" to="/login" data-cy = 'link-login'>login</NavLink>}
          </div>

          <div className="sort-bar">
            <span className="sort-span"> sort... </span>
            {' '}
            <Select
              className="dark-theme"
              options={[{ label: 'new', value: 'new' }, { label: 'top', value: 'top' }]}
              label="sort"
              onChange={handleChange}
              placeholder={sort}
            />
          </div>

          <div className="ghost-div">
            <img className="ghost-image" src={spaceghost} alt="ghost" />
          </div>

        </div>

      </div>

      <Switch>
        <Route path="/login">
          <div className="side-content">
            <Login />
          </div>
        </Route>
        <Route path="/new_rap">
          <div className="side-content">
            <NewPoem />
          </div>
        </Route>
        <Route path="/about">
          <div className="side-content">
            <About />
          </div>
        </Route>
        <Route path="/create_user">
          <div className="side-content">
            <CreateUser />
          </div>
        </Route>
        <Route path="/home">
          <div className="home-page">

            <p className="main-message">
              <Notification message={message} />
            </p>

            <div>
              {sortSelector(poems, sort).map((p) => (
                <div key={p._id}>
                  {!p.head ? <Poem poem={p} /> : null}
                </div>
              ))}
            </div>
          </div>
        </Route>

      </Switch>

    </div>
  )
}

export default App
