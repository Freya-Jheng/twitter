import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false,
      account: '',
      password: '',
      passwordChecked: '',
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
    // TODO 等後端 API 資料再串接
    // async fetchCurrentUser({ commit }) {
    //   try {
    //     const { data } = await usersAPI.getCurrentUser()
    //     const { id, email, name, image, isAdmin } = data
    //     commit('setCurrentUser', {
    //       id,
    //       email,
    //       name,
    //       image,
    //       isAdmin,
    //     })
    //     return true
    //   } catch (error) {
    //     console.error(error.message)
    //     commit('revokeAuthentication')
    //     return false
    //   }
    // },
  },
  modules: {}
})
