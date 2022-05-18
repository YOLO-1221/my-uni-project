import axios from 'axios'

const service = axios.create({
  baseURL: '',
  withCredentials: false,
  timeout: 5000
})

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZXN0LmFkbWluLnNlcnZlci5seXF6MzY1LmNvbVwvYXBpXC9hZG1pblwvbG9naW4iLCJpYXQiOjE2NTI3OTE4MDcsImV4cCI6MTY4OTA3OTgwNywibmJmIjoxNjUyNzkxODA3LCJqdGkiOiJMVWRwUDBYcERhNHFvbXBkIiwic3ViIjoyMTYsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.2Q5xCAb0cNrNGxkkMzFZezVVL0zjlV4hnE8ZNWnGNbk'

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['token'] = token
    config.headers['os'] = 'admin'
    config.headers['Authorization'] = 'Bearer' + token
    config.headers['Content-Security-Policy'] = 'upgrade-insecure-requests'

    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return promise.resolve(res)
  },
  async (err, promise) => {
    if (!err) return promise.resolve('')

    if (!err.response) return promise.resolve('')

    return promise.resolve('')
  }
)

export default service
