import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: '10000'
})

api.interceptors.request.use(
  config => {
    const token = localStorage['authToken']
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    return Promise.reject(error)
  }
)
