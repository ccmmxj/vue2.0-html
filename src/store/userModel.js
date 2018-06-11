import axios from 'axios'
import qs from 'qs'
import {router} from '../base/router'
import host from '../base/addr'

const state = {
  user: undefined
}
const getters = {
  getUser (state) {
    return state.user
  }
}
const actions = {
  login ({commit}, data) {
    axios({
      method: 'POST',
      url: host.host + 'login',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data),
      dataType: 'json'
    }).then((res) => {
      console.log(res)
      if (res.data.success) {
        commit('updateUser', res.data.result)
        router.push('/edu/manage')
      } else {
        index.alert(res.data.message)
      }
    }).catch((err) => {
      console.log(err.data)
    })
    // axios.post('http://127.0.0.1:8080/login' ,{username:username,password:password}).then((res) => {
    //   console.log(res)
    //   commit('updateUser', res.data.result.user)
    //   router.push('/edu/manage')
    // }).catch(() => {
    //
    // })
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