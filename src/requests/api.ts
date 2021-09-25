import axios from 'axios'

const client = axios.create({
  baseURL: `${API_HOST}/api`,
})

client.interceptors.request.use(
  (config) => {
    // 共通ヘッダーなどを指定
    config.headers['X-Requested-With'] = 'XMLHttpRequest'

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

client.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default client
