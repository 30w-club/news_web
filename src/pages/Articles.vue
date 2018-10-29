<template>
  <div class="articles_container">
    <app-header />
    <article-item :a="article" v-for="article in articles" :key="article.description"/>
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader'
import ArticleItem from './articlesSubs/ArticleItem'
import http from '../http'

export default {
  name: 'articles',
  components: {
    AppHeader,
    ArticleItem
  },
  computed: {
    articles () {
      return this.$store.state.article.articles
    }
  },
  created () {
    this.getToday()
  },
  methods: {
    getToday () {
      http.get('/today')
        .then(resp => this.$store.commit('setArticles', resp.data.result_article))
      this.$store.dispatch('getWords')
    }
  }
}
</script>
