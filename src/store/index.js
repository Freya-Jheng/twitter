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
      createdAt: '',
      updatedAt: '',
      image: '',
      isAdmin: false,
    },
    isAuthenticated: false,
    token: '',
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      console.log('this',currentUser)
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
        const { data } = await usersAPI.getCurrentUser()
        const { id, account, name, email, isAdmin } = data
        commit('setCurrentUser', {
          id,
          account,
          name,
          email,
          isAdmin,
        })
        return true
      } catch (error) {
        console.error(error.message)
        commit('revokeAuthentication')
        return false
      }
    },
  },
  modules: {},
})
