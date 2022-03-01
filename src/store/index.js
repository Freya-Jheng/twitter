import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      role: '',
      avatar: '',
      introduction: '',
      cover: '',
    },
    isAuthenticated: false,
    token: '',
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const response = await usersAPI.getCurrentUser()

        const user = response.data.data.User

        commit('setCurrentUser', {
          id: user.id,
          account: user.account,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          introduction: user.introduction,
          cover: user.cover,
        })
      } catch (error) {
        console.error(error.message)
        commit('revokeAuthentication')
      }
    },
  },
  modules: {},
})
