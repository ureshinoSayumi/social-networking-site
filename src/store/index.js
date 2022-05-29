import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      userInfo: null,
      switch: false
    }
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, value) {
      state.userInfo = value
    },
    setSwitch (state, value) {
      state.switch = value
    }
  },
  actions: {
  },
  modules: {
  }
})
