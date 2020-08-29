import axios from 'axios'

const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`)
  return response.data
}

export default {getUser}