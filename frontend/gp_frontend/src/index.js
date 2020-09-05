import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import poemReducer from './reducers/poemReducer'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'

const reducer = combineReducers({
  poems: poemReducer,
  user: userReducer,
  message: messageReducer,
})

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
