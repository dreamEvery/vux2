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
import { AlertPlugin } from 'vux'
import VueResource from 'vue-resource'
import VueScroller from 'vue-scroller'

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
  render: h => h(App)
}).$mount('#app-box')
