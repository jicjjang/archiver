import Vue from 'vue'

const state = {
  category: {
    key: 'All',
    color: 'white',
    name: 'All'
  }
}

const getters = {
  getCategory: () => {
    return state.category
  }
}

const mutations = {
  'SET_CATEGORY' (state, data) {
    Vue.set(state, 'category', data)
  }
}

const actions = {
  setCategory ({ commit }, data) {
    commit('SET_CATEGORY', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
