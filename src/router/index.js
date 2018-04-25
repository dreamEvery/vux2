import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
      path: '/head',
      name: 'Head',
      component: Head
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
