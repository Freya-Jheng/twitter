import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      image: '',
      password:'',
      passwordChecked: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
