import axios from 'axios'

const baseAPI = axios.create({
  baseURL: 'http://122.112.142.182:3000',
  timeout: 3000,
})

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const reqInterceptors = baseAPI.interceptors.request.use(config => {
  console.log('请求拦截器被触发')
  config.headers.Token = 'testToken'
  console.log(config)
  return config
}, error => {
  console.log('请求失败拦截器内容')
  console.log(error)
  return Promise.reject(error)
})

const resInterceptors = baseAPI.interceptors.response.use(response => {
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
// export function removeReqInterceptors() {
//   console.log('请求拦截器关闭')
//   axios.interceptors.request.eject(reqInterceptors)
// }
// export function removeResInterceptors() {
//   console.log('响应拦截器关闭')
//   axios.interceptors.request.eject(resInterceptors)
// }
export default {
  get({url, params, ...config}) {
    console.log('处理请求')
    console.log(config)
    console.log(reqInterceptors,resInterceptors)
    let options = {}
    let cancel = {
      cancelToken: source.token
    }
    if(params) {
      options.params = params
    }
    return baseAPI.get(url,cancel,options)
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
export function cancelResquest() {
  source.cancel('请求取消')
}