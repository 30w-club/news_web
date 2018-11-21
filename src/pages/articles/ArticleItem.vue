<template>
  <div class="article_container">
    <div class="img_wrap">
      <img class="article_image" :src="a.image_info" alt="">
      <div class="article_title">{{a.title}}</div>
    </div>

    <!-- <div class="desc">{{a.description}}</div> -->

    <div class="main" :class="{ 'with_popup': popupDisplay }">
      <div class="paragraph words" v-for="(p, index) in a.content" :key="index">
        <div class="word_wrap" v-for="(a_word, index) in p" :key="index">
          <span class="word_val" @click="clickWord(word_val, $event)" :class="checkLevel(word_val)" v-for="(word_val, index) in a_word" :key="index">{{word_val}}</span>
        </div>
      </div>

      <!-- Popup -->
      <div v-show="popupDisplay" class="popup" :style="{}">
        <div class="close_popup" @click="closePopup">
          <i class="fa fa-close"></i>
        </div>
        <div class="meaning" :class="{ 'with_meaning': meaning }">{{meaning}}</div>
        <div class="darken_it" @click="darkenIt">
          <i class="fa fa-heart"></i>
        </div>
      </div>
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
      targetEle: null,
      meaning: ''
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
  mounted () {
    this.addWindowClickListener()
  },
  destroyed () {
    console.log('destroyed')
    document.removeEventListener('click', this.documentListener)
  },
  methods: {
    documentListener () {
      console.log(1)
      this.closePopup()
    },
    addWindowClickListener () {
      document.addEventListener('click', this.documentListener)
    },
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
      if (this.targetEle) {
        this.targetEle.classList.remove('active')
      }
    },
    clickWord (word, event) {
      this.getMeaning(word)
      event.stopPropagation()
      this.deactivateTarget()
      this.activateTarget(event.target)
      this.popupWord = word
      // this.popupTop = (event.target.offsetTop - 30) + 'px'
      this.popupDisplay = true
    },
    getMeaning (word) {
      this.meaning = ''
      http.get(`/lookup?word=${word}`).then(resp => {
        if (resp.data.status === 0) {
          if (resp.data.Definitions) {
            this.meaning = resp.data.Definitions[0] || ''
          }
        }
      })
    },
    darkenIt (event) {
      event.stopPropagation()
      const userId = this.$cookie.get('user_id')
      http.post(`/highlight?user=${userId}`, { word: this.popupWord })
        .then(() => {
          this.$store.dispatch('getWords')
          this.closePopup()
        })
    },
    closePopup (event) {
      if (event) event.stopPropagation()
      this.popupDisplay = false
      this.deactivateTarget()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.article_container {
  .img_wrap {
    position: relative;
    .article_image {
      width: 100%;
      vertical-align: middle;
    }
    .article_title {
      text-align: left;
      width: 90%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.08);
      font-size: 46px;
      position: absolute;
      bottom: 80px;
      left: 5%;
      padding: 10px 20px;
      box-sizing: border-box;
      border-radius: 3px;
      font-family: 'Roboto', sans-serif;
      @include respond-to('small') {
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 18px;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 5px 10px;
      }
    }
  }
  .main {
    position: relative;
    background-color: #fff;
    width: 90%;
    margin: -50px auto 0;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 0 2px 10px rgba(0,0,0,.15);
    border-radius: 3px;
    color: rgba(0, 0, 0, .84);
    margin-bottom: 50px;
    @include respond-to('small') {
      width: 100%;
      margin-top: 0;
      padding: 14px;
      box-shadow: 0 1px 1px rgba(0,0,0,.15);
    }
    &.with_popup {
      color: rgba(0, 0, 0, .15);
    }
  }
  .desc {
    font-size: 13px;
    color: #000;
    margin-bottom: 30px;
    font-weight: bold;
  }
  .words {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  .word_wrap {
    line-height: 1.58;
    margin-right: 5px;
    font-size: 21px;
    @include respond-to('small') {
      font-size: 17px;
    }
    .word_val {
      cursor: default;
      &.active {
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
    position: fixed;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    color: #6e6e6e;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px -1px 11px 0px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    transition: all 0.25s ease;
    .close_popup {
      cursor: pointer;
      width: 22px;
      line-height: 40px;
      text-align: center;
      width: 100%;
      background-color: #f1f1f1;
      cursor: pointer;
      &:hover {
        color: #272727;
        border: 1px solid #ddd;
        border-radius: 100px;
      }
    }
    .meaning {
      font-family: 'Amiri', serif;
      box-sizing: border-box;
      font-size: 14px;
      text-align: center;
      &.with_meaning {
        padding: 5px;
      }
    }
    .darken_it {
      font-size: 13px;
      background-color: #f1f1f1;
      width: 100%;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      i {
        color: #b64343;
      }
    }
  }
}
</style>
