<template>
  <div class="article_container">
    <div class="article_title">{{a.title}}</div>
    <div class="img_wrap">
      <img class="article_image" :src="a.image_url" alt="">
    </div>

    <div class="desc">{{a.description}}</div>

    <div>
      <div class="paragraph words" v-for="(p, index) in a.content" :key="index">
        <div class="word_wrap" v-for="(a_word, index) in p" :key="index">
          <span class="word_val" @click="clickWord(word_val, $event)" :class="checkLevel(word_val)" v-for="(word_val, index) in a_word" :key="index">{{word_val}}</span>
        </div>
      </div>
    </div>

    <!-- Popup -->
    <div v-show="popupDisplay" class="popup" :style="{ top: popupTop, left: popupLeft }">
      <div class="darken_it" @click="darkenIt">Collect</div>
      <div class="close_popup" @click="closePopup">x</div>
    </div>
  </div>
</template>

<script>
import http from '@/http'

export default {
  name: 'articleItem',
  props: {
    a: {
      type: Object,
      default () {
        return {
          content: []
        }
      }
    }
  },
  data () {
    return {
      popupTop: 0,
      popupLeft: 0,
      popupDisplay: false,
      popupWord: '',
      targetEle: null
    }
  },
  computed: {
    words () {
      return this.$store.state.word.words
    },
    wordsKeys () {
      return Object.keys(this.words)
    }
  },
  methods: {
    checkLevel (articleWordVal) {
      const index = this.wordsKeys.findIndex(value => {
        return value.toLowerCase() === articleWordVal.toLowerCase()
      })
      if (index !== -1) return 'level_' + this.words[articleWordVal.toLowerCase()]
    },
    activateTarget (target) {
      this.targetEle = target
      this.targetEle.classList.add('active')
    },
    deactivateTarget () {
      this.targetEle.classList.remove('active')
    },
    clickWord (word, event) {
      this.activateTarget(event.target)
      const maxLeft = window.innerWidth - 108
      let left = event.target.offsetLeft
      if (left > maxLeft) left = maxLeft
      this.popupWord = word
      this.popupTop = (event.target.offsetTop - 30) + 'px'
      this.popupLeft = left + 'px'
      this.popupDisplay = true
    },
    darkenIt () {
      http.post('/highlight?user=1', { word: this.popupWord })
        .then(() => {
          this.$store.dispatch('getWords')
          this.popupDisplay = false
        })
      this.deactivateTarget()
    },
    closePopup () {
      this.popupDisplay = false
      this.deactivateTarget()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.article_container {
  margin-top: 25px;
  .article_title {
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    // border-bottom: .5px solid rgb(240, 240, 240);
    margin-bottom: 10px;
  }
  .img_wrap {
    margin-top: 5px;
    .article_image {
      width: 100%;
    }
  }
  .desc {
    font-size: 13px;
    color: #000;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .words {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .word_wrap {
    line-height: 30px;
    margin-right: 5px;
    font-size: 15px;
    .word_val {
      cursor: default;
      &.active {
        background-color: #efefef;
        border-radius: 2px;
        color: #000;
      }
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
  .popup {
    position: absolute;
    background: #ffffff;
    border: 0.5px solid #dfdfdf;
    color: #6e6e6e;
    display: flex;
    align-items: center;
    border-radius: 100px;
    padding: 3px 5px 3px 12px;
    box-shadow: 0px 0px 10px 1px rgb(221, 221, 221);
    .darken_it {
      margin-right: 12px;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        color: #2c2c2c;
      }
    }
    .close_popup {
      cursor: pointer;
      width: 22px;
      height: 22px;
      border: 1px solid #ffffff;
      text-align: center;
      &:hover {
        color: #272727;
        border: 1px solid #ddd;
        border-radius: 100px;
      }
    }
  }
}
</style>
