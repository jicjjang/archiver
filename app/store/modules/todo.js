import Vue from 'vue'

export default {
  state: {
    todo: {}
  },
  getters: {
    todoList: () => {
      return state.todo
    }
  },
  mutations: {
    'INIT_TODO' (state, datas) {
      state.todo = datas
    },
    'SET_TODO' (state, data) {
      if (!state.todo) {
        state.todo = {}
      }
      Vue.set(state.todo, data.key, data.data)
    },
    'REMOVE_TODO' (state, key) {
      Vue.delete(state.todo, key)
    }
  },
  actions: {
    initTodo ({ commit }) {
      Vue.http.get('data.json').then(res => {
        commit('INIT_TODO', res.body.todo)
      })
    },
    setTodo ({ commit }, data) {
      Vue.http.post(`data.json`, data).then(res => {
        commit('SET_TODO', {key: res.body.name, data})
      })
    },
    removeTodo ({ commit }, key) {
      Vue.http.delete(`data/${key}.json`).then(res => {
        commit('REMOVE_TODO', key)
      })
    }
  }
}
