/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 */
let baseUrl
let routerMode

if (process.env.NODE_ENV == 'development') {
  baseUrl = '/api'
  routerMode = 'history'
} else {
  console.log(process.env.BASE_API)
  baseUrl = process.env.BASE_API
  if (process.env.ENV_CONFIG == 'test') {
  	baseUrl = baseUrl.replace('http:', window.location.protocol)
  	console.log('test:' + baseJavaUrl)
  }
  routerMode = 'history'
}

export {
  baseUrl,
  routerMode
}
