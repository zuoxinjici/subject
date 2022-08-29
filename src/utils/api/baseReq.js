import axios from 'axios'

const baseAPI = axios.create({
  baseURL: 'http://122.112.142.182:3000',
  timeout: 3000,
})

baseAPI.interceptors.request.use(config => {
  console.log('请求拦截器被触发')
  console.log(config)
  return config
}, error => {
  console.log('请求失败拦截器内容')
  console.log(error)
  return Promise.reject(error)
})

baseAPI.interceptors.response.use(response => {
  console.log('响应拦截器被触发')
  console.log(response)
  return response.data
}, error => {
  console.log('响应失败拦截器内容')
  console.log(error)
  console.log(error.resquest)
  console.log(error.response)
  return Promise.reject(error)
})

export default {
  get({url, params, ...config}) {
    console.log('请求发送')
    console.log(config)
    let options = {}
    if(params) {
      options.params = params
    }
    return baseAPI.get(url,options)
  },
  post({url, params, data, ...config}) {
    console.log('请求发送')
    let options = {}
    console.log(config)
    Object.assign(options,config)
    if(params) {
      options.params = params
    }
    return baseAPI.post(url, data, options)
  }
}