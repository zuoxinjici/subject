import $ from './baseReq'

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
      console.log('transformRequest修改数据',data)
      console.log(headers)
      headers.testToken = 'testHeader'
      console.log(headers)
      return data
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