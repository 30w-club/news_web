import axios from 'axios'

const instance = process.env.BASE_URL
  ? axios.create({ baseUrl: process.env.BASE_URL })
  : axios.create({ baseURL: 'http://119.27.184.184:6015' })

const get = url => instance.get(url)
const post = (url, data) => instance.post(url, data)

export default {
  get,
  post
}
