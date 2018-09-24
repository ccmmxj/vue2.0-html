import axios from 'axios'
import host from '../base/addr'
const state = {
  token: ""
}
const getters = {
  getToken (state) {
    return state.token
  }
}
const actions = {
  fetchToken ({commit}) {
    axios.post(host.host + '/baidu/getToken',).then((res) => {
      console.log(res)
      commit('updateToken', JSON.parse(res.data.result).access_token)
      host.tok = state.token
    }).catch(() => {

    })
  }
}
const mutations = {
  updateToken (state, token) {
    state.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
