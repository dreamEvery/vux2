import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import alertSuccess from '@/components/alertSuccess'
import Page from '@/components/page'
import Head from '@/templates/head-pic'
import Login from '@/templates/login'
import Gift from '@/templates/gift'
import Give from '@/templates/give'
import giveSel from '@/templates/giveSel'
import Standby from '@/templates/standby'
import Message from '@/templates/message'
import Recharge from '@/templates/recharge'
import Home from '@/templates/home'
import Index from '@/templates/index'
import Interaction from '@/templates/interaction'
import Market from '@/templates/market'
import Among from '@/templates/among'
import forgetPassword from '@/templates/forgetPassword'
import Newpassword from '@/templates/password'
import Draw from '@/templates/draw'
import DrawDom from '@/templates/drawDom'
Vue.use(Router)

// export 的意思是暴露出来东西
export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/hhh',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/alertSuccess',
      name: 'alertSuccess',
      component: alertSuccess
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/newpassword',
      name: 'Newpassword',
      component: Newpassword
    },
    {
      path: '/head',
      name: 'Head',
      component: Head
    },
    {
      path: '/DrawDom',
      name: 'DrawDom',
      component: DrawDom
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/page',
      name: 'Page',
      component: Page
    },
    {
      path: '/gift',
      name: 'Gift',
      component: Gift
    },
    {
      path: '/give',
      name: 'Give',
      component: Give,
      children: [{
        path: '/give/giveSel',
        name: 'giveSel',
        component: giveSel
      }]
    },
    {
      path: '/among',
      name: 'Among',
      component: Among
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/standby',
      name: 'standby',
      component: Standby
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/home/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/home/recharge',
          name: 'Recharge',
          component: Recharge
        },
        {
          path: '/home/interaction',
          name: 'Interaction',
          component: Interaction
        },
        {
          path: '/home/market',
          name: 'Market',
          component: Market
        }
      ]
    }
  ]
})
