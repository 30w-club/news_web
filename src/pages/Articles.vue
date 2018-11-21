<template>
  <div class="articles_container">
    <app-header />
    <article-item :a="article" v-for="article in articles" :key="article.description"/>
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader'
import ArticleItem from './articles/ArticleItem'
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
  mounted () {
    if (!this.articles.length) {
      this.getToday()
    }
  },
  methods: {
    setAarticles (articles) {
      const finalArticles = articles.map(article => {
        let tmpArticle = {...article}
        tmpArticle.image_info = `https://read.itwork.club/api/getpic?image_info=${encodeURIComponent(article.image_info)}`
        return tmpArticle
      })
      this.$store.commit('setArticles', finalArticles)
    },
    async getToday () {
      const respToday = await http.get('/today')
      if (respToday.data.status === 0) {
        const articles = [...respToday.data.result_article]
        this.setAarticles(articles)
        this.$store.dispatch('getWords')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.articles_container {
  padding-top: 50px;
}
</style>
