import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App.vue'

import store from './store'
import router from './router'

Vue.use(VueResource)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
