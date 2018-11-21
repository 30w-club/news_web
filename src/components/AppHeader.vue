<template>
  <div class="header_container">
    <div class="menu_container">
      <div class="menu_item" @click="toggle">
        <i v-if="isWordsPage" class="fa fa-list-ul"></i>
        <i v-if="!isWordsPage" class="fa fa-font"></i>
      </div>
    </div>
    <div class="setting" @click="goToSetting">
      <i class="fa fa-cog"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appHeader',
  data () {
    return {
      isWordsPage: this.$route.path === '/words'
    }
  },
  methods: {
    toggle () {
      const targetRouteName = this.$route.path === '/words' ? 'Articles' : 'Words'
      this.$router.push({ name: targetRouteName })
    },
    goToSetting () {
      this.$router.push({ name: 'Setting' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.header_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  height: 50px;
  box-sizing: border-box;
  // box-shadow: 0 1px 20px #bcbcbc;
  border-bottom: .5px solid rgb(235, 235, 235);
  font-size: 12px;
  color: #8f8f8f;
  .menu_container {
    display: flex;
    .menu_item {
      cursor: pointer;
    }
  }
  .setting {
    cursor: pointer;
  }
}
</style>
