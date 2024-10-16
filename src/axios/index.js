import axios from 'axios'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('logintoken'))
  if (token) {
    const decodedToken = JSON.parse(atob(token))
    const currentTime = Date.now() / 1000
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('logintoken')
    }
  }
  // console.log(config, '发送请求前config信息')
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use((res) => {
  // console.log('接收数据')
  return res.data
}, err => {
  return Promise.reject(err)
})

export default instance
