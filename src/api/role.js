import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/role/list',
    method: 'post',
    params
  })
}
export function addRole(params) {
  return request({
    url: '/role/add',
    method: 'post',
    params
  })
}
