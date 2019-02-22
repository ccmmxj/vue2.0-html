import axios from 'axios'
import host from '../base/addr'

const state = {
  cardTypes: [],
  companyId: 0,
}
const getters = {
  getCardTypes(state) {
    return state.cardTypes
  }
}
const actions = {
  fetchCardTypes({commit},fetchData) {
    axios({
      method: 'POST',
      url: host.host + 'config/list/card/' + fetchData.companyId,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {},
      dataType: 'json'
    }).then((res) => {
      console.log(res)
      if (res.data.success) {
        commit('updateCardTypes',res.data.result)
        if(fetchData.fun){
          fetchData.fun(res.data.result)
        }
      } else {
        index.alert(res.data.message)
      }
    }).catch((err) => {
      console.log(err.data)
    })
    // commit('updateCardTypes', [{
    //     value: '0',
    //     title: '有图汉字'
    //   },
    //   {
    //     value: '1',
    //     title: '字母'
    //   },
    //   {
    //     value: '2',
    //     title: '数字'
    //   },
    //   {
    //     value: '3',
    //     title: '拼音'
    //   },
    //   {
    //     value: '4',
    //     title: '象形字（一）'
    //   },
    //   {
    //     value: '5',
    //     title: '无图拼音'
    //   },
    //   {
    //     value: '6',
    //     title: '英文字母'
    //   },
    //   {
    //     value: '7',
    //     title: '口算卡'
    //   },
    //   {
    //     value: '8',
    //     title: '人教版一年级上'
    //   },
    //   {
    //     value: '9',
    //     title: '人教版一年级下'
    //   }])
  }
}
const mutations = {
  updateCardTypes(state, cardTypes) {
    state.cardTypes = cardTypes
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
