import http from '@/http'

const state = {
  words: {}
}

const mutations = {
  setWords (state, words) {
    state.words = {...words}
  }
}

const actions = {
  getWords ({ commit }) {
    http.get('/highlight?user=1')
      .then(resp => commit('setWords', resp.data.words_list))
  }
}

export default {
  state,
  mutations,
  actions
}
