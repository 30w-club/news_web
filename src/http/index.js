import axios from 'axios'
import router from '../router'
import cookies from 'vue-cookie'

const instance = process.env.BASE_URL
  ? axios.create({ baseUrl: process.env.BASE_URL })
  // : axios.create({ baseURL: 'http://119.27.184.184/api' })
  : axios.create({ baseURL: '/api' })
// const instance = axios.create({ baseURL: '/api' })

instance.interceptors.request.use(config => {
  const token = cookies.get('token')
  if (token) config.headers['Authorization'] = token
  return config
})

instance.interceptors.response.use(resp => {
  console.log('TCL: resp', resp)
  return resp
}, err => {
  if (err.response) {
    const status = err.response.status
    if (status === 401) {
      cookies.delete('user_id')
      router.push({ name: 'Login' })
    }
  }
  return Promise.reject(err)
})

const get = url => instance.get(url)
const post = (url, data) => instance.post(url, data)

export default {
  get,
  post
}
