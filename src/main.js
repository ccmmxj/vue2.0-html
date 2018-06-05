// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Main from './pages/main'
import { router } from './base/router'
import store from './base/vuex'
import http from './base/http'

Vue.config.productionTip = false
Vue.use(http)
require('./base/mock')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { Main },
  template: '<Main/>'
})
// var my = new Vue({
//   el:'#app',
//   template:'<div>{{fruit}}</div>',
//   data:{
//     fruit:'apple',
//
//   }
// })
