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

function App() {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.message)
  const poems = useSelector((state) => state.poems)
  const user = useSelector((state) => state.user)
  const [sort, setSort] = useState('new')
  const [viewSort, setViewSort] = useState('flex')

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
  
  useEffect(() => {
    if(window.location.pathname === '/'){
      setViewSort('flex')
    } else {
      setViewSort('none')
    }
  },[])

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
  const handleView = (value) => {
    setViewSort(value)
  }
  const sortStyle = {
    display: viewSort
  }

  return (
    <div className="main-page">
      <div className="left-col">
        <div>

          <img className="ghost-title" src='/GhostRaps.gif' alt="title" />

          <div className="navigation">
            <NavLink  activeStyle={{ fontWeight: "bold",color: "gray" }} 
              className="link" to='/' exact data-cy="link-home" onClick = {() => handleView('flex')}>home</ NavLink>
            <NavLink activeStyle={{ fontWeight: "bold",color: "gray" }}
              className="link" to="/new_rap" data-cy="link-new-rap" onClick = {() => handleView('none')} >new rap</NavLink>
            <NavLink activeStyle={{ fontWeight: "bold",color: "gray" }}
              className="link" to="/about" onClick = {() => handleView('none')} >about</NavLink>
            {user ? null : <NavLink activeStyle={{ fontWeight: "bold",color: "gray" }}
                className="link" to="/create_user" data-cy = 'link-new-user' onClick = {() => handleView('none')} >new user</NavLink>}
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
                  className="link" to="/login" data-cy = 'link-login' onClick = {() => handleView('none')} >login</NavLink>}
          </div>

          <div className="sort-bar" style = {sortStyle}>
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
            <img className="ghost-image" src='/spaceghost_purp2.jpg' alt="ghost" />
          </div>

        </div>

      </div>

      <Switch>
        <Route path="/login" >
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
        <Route exact path="/">
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
