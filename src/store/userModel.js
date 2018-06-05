import axios from 'axios'
import {router} from '../base/router'

const state = {
  user: undefined
}
const getters = {
  getUser (state) {
    return state.user
  }
}
const actions = {
  login ({commit}) {
    axios.get('/api/login').then((res) => {
      console.log(res)
      commit('updateUser', res.data.result.user)
      router.push('/edu/manage')
    }).catch(() => {

    })
  }
}
const mutations = {
  updateUser (state, user) {
    state.user = user
  },
  logoutUser (state) {
    state.user = undefined
    router.push('/edu/logout')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
