<template>
  <div class="landing_container">
    landing
    <div class="go_to_login" @click="goToLogin">
      login
    </div>
    <div class="go_to_login" @click="goToReg">
      reg
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  methods: {
    goToLogin () {
      this.$router.push({ name: 'Login' })
    },
    goToReg () {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>
