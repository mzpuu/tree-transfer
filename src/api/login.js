import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取滑块图片
export function getSlider(params){
  return request({
    url:'/user/slider',
    method:'post',
    data: params
  })
}
// 发送手机验证码
export function sendScode(params){
  return request({
    url:'/user/scode',
    method:'post',
    data: params
  })
}
// 验证码登录
export function signin(params){
  return request({
    url:'/user/signin',
    method:'post',
    data: params
  })
}