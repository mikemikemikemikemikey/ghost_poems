import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './store'

console.log('public url: ', process.env.PUBLIC_URL)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
