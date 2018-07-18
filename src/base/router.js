import Vue from 'vue'
import Router from 'vue-router'
import ManageLayout from '../pages/manage/layout'
import ManageCard from '../pages/manage/card'
import ManageMyCard from '../pages/manage/myCard'
import ManageQRcode from '../pages/manage/qrcode'
import ManageLogin from '../pages/manage/login'
import WebList from '../pages/web/list'
import WebCardDetail from '../pages/web/cardDetail'
import WebVideoDetail from '../pages/web/videoDetail'
import WebDetail from '../pages/web/detail'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/edu/',
      redirect: '/edu/web/list/1'
    },
    {
      path: '/edu/manage',
      redirect: '/edu/manage/main'
    },
    {
      path: '/edu/manage/main',
      name: 'manage_layout',
      component: ManageLayout,
      children: [{
        path: 'card',
        name: 'manage_card',
        component: ManageCard
      },
      {
        path: 'card/:id',
        name: 'manage_card',
        component: ManageCard
      },
      {
        path: 'qrcode',
        name: 'manage_qrcode',
        component: ManageQRcode
      },
      {
        path: 'myCard',
        name: 'manage_myCard',
        component: ManageMyCard
      }]
    },
    {
      path: '/edu/web/list/:companyId',
      name: 'web_list',
      component: WebList
    },
    {
      path: '/edu/web/card/detail/:companyId/:id',
      name: 'web_card_detail',
      component: WebCardDetail
    },
    {
      path: '/edu/web/video/detail/:companyId/:id',
      name: 'web_video_detail',
      component: WebVideoDetail
    },
    {
      path: '/edu/logout',
      name: 'manage_login',
      component: ManageLogin
    }
  ]
})
export {router}
