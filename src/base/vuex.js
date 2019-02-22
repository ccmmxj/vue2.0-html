import Vuex from 'vuex'
import Vue from 'vue'
import menuModel from '../store/menuModel'
import userModel from '../store/userModel'
import baiduTokenModel from '../store/baiduTokenModel'
import cardTypeModel from '../store/cardTypeModel'
import advertTypeModel from '../store/advertTypeModel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menuModel,
    userModel,
    baiduTokenModel,
    cardTypeModel,
    advertTypeModel
  }
})
