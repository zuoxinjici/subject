import axios from 'axios'

const baseAPI = axios.create({
  baseURL: 'http://122.112.142.182:3000',
  timeout: 3000,
})

let pending = []
let removePending = (event) => {
  for(let p in pending) {
    if(pending[p].u === event.url + '&' + event.method) {
      pending[p].f('取消请求')
      pending.splice(p,1)
    }
  }
}

const CancelToken = axios.CancelToken
let source = CancelToken.source()
const reqInterceptors = baseAPI.interceptors.request.use(config => {
  console.log('请求拦截器被触发')
  config.headers.Token = 'testToken'
  let noAllData = localStorage.getItem('noGetData')
  console.log(noAllData)
  if(noAllData === 'true'){
    removePending(config)
    config.cancelToken = new CancelToken( c => {
      pending.push({u: config.url+ '&' + config.method, f: c})
    })
  }
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
    console.log(source)
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
  },
  put({url, params, data, ...config}) {
    console.log('请求发送')
    let options = {}
    console.log(config)
    Object.assign(options,config)
    if(params) {
      options.params = params
    }
    return baseAPI.put(url, data, options)
  },
  patch({url, params, data, ...config}) {
    console.log('请求发送')
    let options = {}
    console.log(config)
    Object.assign(options,config)
    if(params) {
      options.params = params
    }
    return baseAPI.patch(url, data, options)
  },
  delete({url, params, data, ...config}) {
    console.log('请求发送')
    let options = {}
    console.log(config)
    Object.assign(options,config)
    if(params) {
      options.params = params
    }
    return baseAPI.delete(url, data, options)
  },
}
export function cancelResquest() {
  console.log(source)
  source.cancel('请求取消')
  source = axios.CancelToken.source()
}