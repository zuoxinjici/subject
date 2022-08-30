import $ from './baseReq'
import qs from 'qs'

export function putData() {
  return $.put({
    url: '/put'
  })
}

export function patch() {
  return $.patch({
    url: '/patch'
  })
}
export function deleteData() {
  return $.delete({
    url: '/delete'
  })
}
export function test() {
  return $.get({
    url: '/',
    validateStatus: function(status) {
      return status < 300
    },
    
  })
}

export function login(data) {
  return $.post({
    url: '/login',
    data,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default
     // `auth` HTTP Basic Auth
  auth: {
    username: 'admin',
    password: '123456'
  },
    validateStatus: function(status) {
      return status < 300
    },
    transformRequest: function(data,headers) {
      console.log('transformRequest修改数据')
      console.log(data)
      console.log(headers)
      data.add = "testAdd"
      console.log(data)
      return qs.stringify(data)
    },
    transformResponse: function(data,headers) {
      console.log('transformResponse修改数据')
      console.log(data)
      console.log(headers)
      console.log(data)
      return qs.stringify(data)
    },
    onUploadProgress: function (progressEvent) {
      // 处理原生进度事件
      console.log('上传进度事件',progressEvent)
    },
  
    // `onDownloadProgress` 允许为下载处理进度事件
    // 浏览器专属
    onDownloadProgress: function (progressEvent) {
      // 处理原生进度事件
      console.log('下载事件进度',progressEvent)
    },
  })
}