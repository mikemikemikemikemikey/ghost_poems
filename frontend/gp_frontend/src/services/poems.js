import axios from 'axios'
import handle from './serviceHelper'
const baseUrl = '/api/poems'

let config = {headers: null}

const setConfig = newToken => {
  config = { headers: {Authorization: `bearer ${newToken}`}, }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const editContent = async (content, id) => {
  const [request, error] = await handle(axios.put(`/api/poems/child/${id}`, {content}, config))
  if(request) return
  if(error.response.status === 401) throw 'wrong user'
  throw 'sorry lines are too long'
}
const editTitle = async (title, id) => {
  console.log('test1')
 const [request, error] = await handle(axios.put(`/api/poems/title/${id}`, {title}, config ))
 if(request) return
 if(error.response.status === 401) throw 'wrong user'
 throw 'sorry too long'
}
const addLike = async (poem) => {
  await axios.put(`/api/poems/child/${poem._id}/${true}`, poem, config)
}
const addContent = async (poem, head) => {
  const [request, error] = await handle(axios.post(`api/poems/${head}`, poem, config))
  if(request) return
  if(error.response) {
    throw 'sorry lines are too long'
  }
  throw 'error'
}
const removePoem = async (poem) => {
  await axios.delete(`api/poems/${poem._id}`, config)
  
}
const create = async (poem) => {
  const [request, error] = await handle(axios.post(baseUrl, poem, config))
  if(request) return request
    if(error.response) {
    if(error.response.data.error.includes('title')){
        throw 'title is too long'
      } else if (error.response.data.error.includes('content')){
      throw 'first lines are too long'
      } else { throw 'error'}
    }  
    throw 'error'
}
const removeLike = async (id) => {
  await axios.put(`api/poems/unlike/${id}`, null, config)
}

export default { editTitle, addContent, setConfig, getAll, create, addLike, removePoem, editContent, removeLike}