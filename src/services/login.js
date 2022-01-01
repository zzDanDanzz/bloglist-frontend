import axios from 'axios'
const baseUrl = '/login'

const login = credentials => (
  axios.post(baseUrl, credentials)
    .then(res => res.data)
    .catch(err => { throw err.response.data.error })
)

export default { login }