import Vue from 'vue'
import Vuex from 'vuex'

import word from './modules/word'
import article from './modules/article'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    word,
    article
  }
})
