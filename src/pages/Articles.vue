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
    getToday () {
      http.get('/today')
        .then(resp => {
          if (resp.data.status === 0) {
            let articles = [...resp.data.result_article]
            articles = articles.map(article => {
              let tmpArticle = {...article}
              // const imageUrl = article.image_url.split('/')
              // const picUrl = imageUrl[imageUrl.length - 1]
              tmpArticle.image_url = `https://read.itwork.club/api/getpic?pic_url=${encodeURIComponent(article.image_url)}`
              return tmpArticle
            })

            this.$store.commit('setArticles', articles)
            // const imageUrls = articles.map(article => article.image_url)
            // this.getImageSrc(imageUrls)
          }
        })
        .then(() => {
          this.$store.dispatch('getWords')
        })
    },
    getImageSrc (urls) {
      urls.forEach(url => {
        http.get(`/getpic?pic_url=${encodeURIComponent(url)}`).then(resp => console.log(resp))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.articles_container {
  padding-top: 50px;
}
</style>
