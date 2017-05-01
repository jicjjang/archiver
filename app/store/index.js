import Vue from 'vue'
import Vuex from 'vuex'

import todo from './modules/todo'
import message from './modules/message'

Vue.use(Vuex)

/* eslint-disable no-new */
export default new Vuex.Store({
  modules: {
    todo,
    message
  }
})
