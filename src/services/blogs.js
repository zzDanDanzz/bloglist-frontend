import axios from 'axios'
const baseUrl = '/api/blogs'

const auth = (token) => ({ headers: { 'authorization': 'bearer ' + token } })

const getAll = () => (
  axios.get(baseUrl)
    .then(res => res.data)
)

const createNew = (data, token) => (
  axios.post(baseUrl, data, auth(token))
    .then(res => res.data)
    .catch(err => { throw err.response.data.error })
)

const updateBlog = (id, data, token) => (
  axios.put(baseUrl + '/' + id, data, auth(token))
    .then(res => res.data)
    .catch(err => { throw err.response.data.error })
)

const deleteBlog = (id, token) => (
  axios.delete(baseUrl + '/' + id, auth(token))
    .catch(err => { throw err.response.data.error })
)

export default { getAll, createNew, updateBlog: updateBlog, deleteBlog }