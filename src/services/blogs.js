import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (data, token) => {
  const res = await axios.post(baseUrl, data, {headers: {'authorization': 'bearer '+token}})
  return res.data
}

export default { getAll, createNew }