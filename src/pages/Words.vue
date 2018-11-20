<template>
  <div class="words_container">
    <app-header />
    <div class="words_main">
      <div class="word_item" :class="'level_' + word.count" v-for="word in sortedWords" :key="word.val">
        <div class="val">{{word.val}}</div>
        <div class="count">{{word.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader'

export default {
  name: 'words',
  components: {
    AppHeader
  },
  created () {
    this.$store.dispatch('getWords')
  },
  computed: {
    words () {
      return this.$store.state.word.words
    },
    wordsKeys () {
      return Object.keys(this.words)
    },
    sortedWords () {
      return this.wordsKeys.map(key => {
        return {
          val: key,
          count: this.words[key]
        }
      }).sort((a, b) => b.count - a.count)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.words_container {
  padding-top: 50px;
  .words_main {
    padding: 5px;
    .word_item {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      line-height: 30px;
      margin-bottom: 7px;
      &.level_1 {
        border-bottom: 0.5px solid $level_1_color;
      }
      &.level_2 {
        border-bottom: 0.5px solid $level_2_color;
      }
      &.level_3 {
        border-bottom: 0.5px solid $level_3_color;
      }
      &.level_4 {
        border-bottom: 0.5px solid $level_4_color;
      }
      &.level_5 {
        border-bottom: 0.5px solid$level_5_color;
      }
      &.level_6 {
        border-bottom: 0.5px solid $level_6_color;
      }
      &.level_7 {
        border-bottom: 0.5px solid $level_7_color;
      }
    }
  }
}
</style>
