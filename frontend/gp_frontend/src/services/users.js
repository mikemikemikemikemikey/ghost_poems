import axios from 'axios'

const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`)
  return response.data
}

const newUser = async (user) => {
  const response = await axios.post('/api/users/', user)
  return response.data
}

export default {getUser, newUser}