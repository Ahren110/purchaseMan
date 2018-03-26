// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import rootPath from './assets/config/api.js' // 接口路径
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { AlertPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin, cookie } from 'vux'
Vue.use(AlertPlugin) // vux alert组件
Vue.use(ConfirmPlugin) // vux confirm组件
Vue.use(LoadingPlugin) // vux loading组件
Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'MC_UID': cookie.get('MC_UID')
}
Vue.http.interceptors.push(function (request, next) { // 拦截器
  // 跨域携带cookie
  request.credentials = true
  // request.headers.set('MC_SMS', cookie.get('MC_SMS')) // setting request.headers
  // request.headers.set('MC_UID', cookie.get('MC_UID')) // setting request.headers
  next((response) => {
    return response
  })
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  data: {
    urlPath: rootPath.pathUrl() // 通过api.js 控制 开发 和线上环境
  },
  render: h => h(App)
}).$mount('#app-box')
