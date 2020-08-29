
const messageReducer = (state = {message: null, error: false}, action) => {
  switch(action.type){
  case 'NEW':
    return {message: action.message, error: action.error}
  case 'REMOVE' :
    return {message : null, error: false}
  default:
    return state
  }
}

export const newMessage = (message, error) => {
  return dispatch => {
    dispatch({
      type: 'NEW',
      message: message,
      error
    })
  }
}

export const removeMessage = () => {
  return dispatch => {
    dispatch({
      type: 'REMOVE',
    })
  }
}

export default messageReducer