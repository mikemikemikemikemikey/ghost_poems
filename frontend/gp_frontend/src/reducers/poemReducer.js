import poemService from '../services/poems'

const poemReducer = (state =[], action) => {
  switch(action.type){
    case 'INIT':
      return action.poems
    default:
      return state
    }
}

export const initializePoems = () => {
  return async dispatch => {
    const poems = await poemService.getAll()
    dispatch({ type: 'INIT', poems })
  }
}

export default poemReducer