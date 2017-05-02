import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App.vue'

import store from './store'
import router from './router'

import firebase from 'firebase'
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID } from './config'

Vue.use(VueResource)
Vue.use(VueRouter)

firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
})

const database = firebase.database();

// https://firebase.google.com/docs/database/web/read-and-write?hl=ko
// https://firebase.google.com/docs/database/web/retrieve-data
// database.on('value', (snapshot) => {
//   var datas = snapshot.val()
//   if (datas) {
//     sidebars = datas.sidebars
//     todos = datas.todos
//     this.$store.commit('INIT_TODO', todos)
//     this.$store.commit('INIT_SIDEBAR', sidebars)
//   }
// })

Vue.http.options.root = DATABASE_URL

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
