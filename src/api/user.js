import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'post',
    params
  })
}
export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    params
  })
}