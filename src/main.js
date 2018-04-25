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
import md5 from 'crypto-js/md5' // 引入 crypto-js/md5 插件

Object.defineProperty(Vue.prototype, '$md5', {value: md5})
// 将引入的插件绑定到 Vue 原型上 相当于全局注册了一个 $md5
// Object.defineProperty() 方法会直接在一个对象上定义一个新属性,或者修改一个对象的现有属性, 并返回这个对象。

Vue.use(ToastPlugin)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(AlertPlugin)
Vue.use(VueRouter)
Vue.use(VueScroller)

// 设置post的请求头格式
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}

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
