import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { baseUrl } from './env'

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.data && config.method == 'post') {
    config.data = qs.stringify(config.data);
  } 
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为负是抛错 可结合自己业务进行修改
     * code为 -10时，为登录态失效
     */
    const res = response.data
    if (res.code < 0 && res.code != -10) {
      Message({
        message: res.desc + ' code:' + res.code,
        type: 'error',
        duration: 5 * 1000
      })
      return response.data
    }else if(res.code == -10){
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload();// 为了重新实例化vue-router对象 避免bug
          window.location.href ='/login'
        });
      })
      return response.data
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
