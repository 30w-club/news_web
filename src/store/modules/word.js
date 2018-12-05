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
  async getWords ({ commit }) {
    const userId = cookie.get('user_id')
    const respWords = await http.get(`/highlight?user_id=${userId}`)

    if (respWords.data.status === 0) {
      commit('setWords', respWords.data.words_list)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
