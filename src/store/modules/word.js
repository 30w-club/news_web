import http from '@/http'
import cookie from 'vue-cookie'

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
    const userId = cookie.get('user_id')
    http.get(`/highlight?user=${userId}`)
      .then(resp => commit('setWords', resp.data.words_list))
  }
}

export default {
  state,
  mutations,
  actions
}
