import { login, logout, getUserInfo, signin } from '@/api/login'
import { getToken, setToken, removeToken, getId, setId, removeId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    role: '',
    roles: [],
    isAdmin: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_IS_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin
    },
    SET_ID: (state, id) => {
      state.id = id
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        signin(userInfo).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_ID', data.user.id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          commit('SET_IS_ADMIN', data.isAdmin)
          commit('SET_ROLES', data.roles)
          commit('SET_ROLE', data.role)
          commit('SET_NAME', data.name)
          commit('SET_ID', data.user.id)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_is_admin', false)
          commit('SET_ROLES', [])
          commit('SET_ROLE', '')
          commit('SET_NAME', '')
          commit('SET_ID', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ID', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
