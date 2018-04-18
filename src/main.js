// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// style
import './assets/css/restart.css'
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import { AlertPlugin, ToastPlugin } from 'vux'
import VueResource from 'vue-resource'
import VueScroller from 'vue-scroller'
import 'lib-flexible'
import { rem } from './libs/rem'
import md5 from 'js-md5'

Vue.prototype.$md5 = md5
Vue.use(ToastPlugin)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(AlertPlugin)
Vue.use(VueRouter)
Vue.use(VueScroller)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  created () {
    rem()
  },
  data: {
    eventHub: new Vue()
  },
  render: h => h(App)
}).$mount('#app-box')
