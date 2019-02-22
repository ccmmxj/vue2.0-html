import axios from 'axios'
import qs from 'qs'
import {router} from '../base/router'
import host from '../base/addr'

const state = {
  cardTypes: []
}
const getters = {
  getCardTypes(state) {
    return state.cardTypes
  }
}
const actions = {
  fetchCardTypes({commit}) {
    commit('updateCardTypes', [{
        value: '0',
        title: '有图汉字'
      },
      {
        value: '1',
        title: '字母'
      },
      {
        value: '2',
        title: '数字'
      },
      {
        value: '3',
        title: '拼音'
      },
      {
        value: '4',
        title: '象形字（一）'
      },
      {
        value: '5',
        title: '无图拼音'
      },
      {
        value: '6',
        title: '英文字母'
      },
      {
        value: '7',
        title: '口算卡'
      },
      {
        value: '8',
        title: '人教版一年级上'
      },
      {
        value: '9',
        title: '人教版一年级下'
      }])
  }
}
const mutations = {
  updateCardTypes(state, cardTypes) {
    state.cardTypes = cardTypes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
