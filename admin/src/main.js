// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'

import './assets/style.css'

Vue.use(ElementUi)
Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
