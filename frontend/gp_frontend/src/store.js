
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
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

  export default store