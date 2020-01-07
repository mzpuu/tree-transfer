import request from '@/utils/request'

export function saveAuthority(params) {
  return request({
    url: '/authority/save',
    method: 'post',
    params
  })
}
