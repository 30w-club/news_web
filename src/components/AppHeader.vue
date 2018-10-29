<template>
  <div class="header_container">
    <div class="menu_container">
      <div class="menu_item" @click="toggle">{{menuTitle}}</div>
    </div>
    <div class="setting" @click="goToSetting">Setting</div>
  </div>
</template>

<script>
export default {
  name: 'appHeader',
  data () {
    return {
      menuTitle: this.$route.path === '/words' ? 'Articles' : 'Words'
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
.header_container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: .5px solid rgb(235, 235, 235);
  font-size: 12px;
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
