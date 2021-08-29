import axios from 'axios'

const client = axios.create({
  baseURL: '',
})

client.interceptors.request.use(
  function (config) {
    // 共通ヘッダーなどを指定
    config.headers['X-Requested-With'] = 'XMLHttpRequest'

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default client
