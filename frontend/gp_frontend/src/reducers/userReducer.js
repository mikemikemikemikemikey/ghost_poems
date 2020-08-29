const userReducer = (state = null, action) => {
  switch(action.type){
  case 'LOGIN':
    return action.user
  case 'LOGOUT' :
    return null
  default:
    return state
  }
}

export const loginUser = (user) => {
  return dispatch => {
    dispatch({ type: 'LOGIN',
      user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT' })
  }
}


export default userReducer