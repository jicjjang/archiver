import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App.vue'

import store from './store'
import router from './router'

Vue.use(VueResource)
Vue.use(VueRouter)

// rootRef.on('value', function(snapshot) {
//   var datas = snapshot.val()
//   if (datas) {
//     sidebars = datas.sidebars
//     todos = datas.todos
//     Vue.store.commit('INIT_TODO', todos)
//     Vue.store.commit('INIT_SIDEBAR', sidebars)
//   }
// })

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
