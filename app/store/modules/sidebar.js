import Vue from 'vue'

export default {
  state: {
    sideber: {}
  },
  getters: {
    sidebarList: () => {
      return state.sidebar
    }
  },
  mutations: {
    'SET_SIDEBAR' (state, data) {
      if (!state.sidebar) {
        state.sidebar = {}
      }
      Vue.set(state.sidebar, data.key, data.data)
    },
    'REMOVE_SIDEBAR' (state, key) {
      Vue.delete(state.sidebar, key)
    }
  },
  actions: {
    setSidebar ({ commit }, data) {
      Vue.http.post(`data.json`, data).then(res => {
        commit('SET_SIDEBAR', {key: res.body.name, data})
      })
    },
    removeSidebar ({ commit }, key) {
      Vue.http.delete(`data/${key}.json`).then(res => {
        commit('REMOVE_SIDEBAR', key)
      })
    }
  }
}
