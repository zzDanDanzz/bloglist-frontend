import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = (data, token) => (
  axios.post(baseUrl, data, { headers: { 'authorization': 'bearer ' + token } })
    .then(res => res.data)
    .catch(err => { throw err.response.data.error })
)

export default { getAll, createNew }