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
    'INIT_SIDEBAR' (state, datas) {
      state.sidebar = datas
    },
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
    initSidebar ({ commit }) {
      Vue.http.get('data.json').then(res => {
        commit('INIT_SIDEBAR', res.body.sidebar)
      })
    },
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
