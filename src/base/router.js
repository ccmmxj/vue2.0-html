import Vue from 'vue'
import Router from 'vue-router'
import ManageLayout from '../pages/manage/layout'
import ManageCode from '../pages/manage/code'
import ManageQRcode from '../pages/manage/qrcode'
import WebList from '../pages/web/list'
import WebDetail from '../pages/web/detail'
import Test from '../components/Test'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/edu/',
      redirect: '/edu/web/list'
    },
    {
      path: '/edu/manage',
      redirect: '/edu/manage/main'
    },
    {
      path: '/edu/manage/main',
      name: 'manage_layout',
      component: ManageLayout,
      redirect: '/edu/manage/main/code',
      children: [{
        path: 'code',
        name: 'manage_code',
        component: ManageCode
      },
      {
        path: 'test',
        name: 'manage_test',
        component: Test
      },
      {
        path: 'qrcode',
        name: 'manage_qrcode',
        component: ManageQRcode
      }]
    },
    {
      path: '/edu/web/list',
      name: 'web_list',
      component: WebList
    },
    {
      path: '/edu/web/detail/:id',
      name: 'web_detail',
      component: WebDetail
    },
    {
      path: '/edu/logout',
      name: 'test',
      component: Test
    }
  ]
})
export {router}
