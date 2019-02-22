const state = {
  advertTypes: []
}
const getters = {
  getAdvertTypes(state) {
    return state.advertTypes
  }
}
const actions = {
  fetchAdvertTypes({commit}) {
    commit('updateAdvertTypes',
        [{
          value: '0',
          title: '底部'
        },
        {
          value: '1',
          title: '右边'
        }])
  }
}
const mutations = {
  updateAdvertTypes(state, advertTypes) {
    state.advertTypes = advertTypes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
