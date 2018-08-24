import Vue from 'vue'
import Router from 'vue-router'
import ManageLayout from '../pages/manage/layout'
import ManageCard from '../pages/manage/card'
import ManageLunbo from '../pages/manage/lunbo'
import ManageAdvert from '../pages/manage/advert'
import ManageWindow from '../pages/manage/window'
import ManageMyCard from '../pages/manage/myCard'
import ManageMyLunbo from '../pages/manage/myLunboList'
import ManageMyAdvert from '../pages/manage/myAdvert'
import ManageMyWindow from '../pages/manage/myWindowList'
import ManageQRcode from '../pages/manage/qrcode'
import ManageLogin from '../pages/manage/login'
import WebList from '../pages/web/list'
import WebCardDetail from '../pages/web/cardDetail'
import WebVideoDetail from '../pages/web/videoDetail'
import ManageAbout from '../pages/web/about'

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
        path: 'lunbo',
        name: 'manage_lunbo',
        component: ManageLunbo
      },
      {
        path: 'advert',
        name: 'manage_advert',
        component: ManageAdvert
      },
      {
        path: 'advert/:id',
        name: 'manage_advert',
        component: ManageAdvert
      },
      {
        path: 'lunbo/:id',
        name: 'manage_lunbo',
        component: ManageLunbo
      },
      {
        path: 'window',
        name: 'manage_window',
        component: ManageWindow
      },
      {
        path: 'window/:id',
        name: 'manage_window',
        component: ManageWindow
      },
      {
        path: 'myLunbo',
        name: 'manage_myLunbo',
        component: ManageMyLunbo
      },
      {
        path: 'myWindow',
        name: 'manage_myWindow',
        component: ManageMyWindow
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
      },
      {
        path: 'myAdvert',
        name: 'manage_myAdvert',
        component: ManageMyAdvert
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
    },
    {
      path: '/edu/about',
      name: 'manage_about',
      component: ManageAbout
    }
  ]
})
export {router}
