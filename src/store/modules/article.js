const state = {
  articles: []
}

const mutations = {
  setArticles (state, articles) {
    state.articles = [...articles]
  }
}

export default {
  state,
  mutations
}
