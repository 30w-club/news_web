<template>
  <div class="reg">
    <div class="input_wrap">
      <input type="text" v-model="email" placeholder="Email" @keyup.enter="confirm">
      <input type="password" v-model="pwd" placeholder="Password" @keyup.enter="confirm">
      <a class="sign_up_title" @click="confirm">Sign Up</a>
    </div>
    <div class="sign_up" @click="goToLogin">Sign In</div>
  </div>
</template>

<script>
import http from '@/http'
import md5 from 'md5'

export default {
  name: 'reg',
  data () {
    return {
      email: '',
      pwd: ''
    }
  },
  mounted () {
    var token = this.$cookie.get('token')
    console.log('​mounted -> token', token)
  },
  methods: {
    async confirm () {
      const respReg = await http.post('/register', {
        email: this.email,
        password: md5(this.pwd)
      })

      if (respReg.data.status === 0) {
        const respLogin = await http.post('/login', {
          email: this.email,
          password: md5(this.pwd)
        })
        if (respLogin.data.status === 0) {
          this.$cookie.set('user_id', respLogin.data.user_id)
          this.$cookie.set('token', respLogin.data.token)
          this.$router.push({ name: 'Articles' })
        }
      }
    },
    goToLogin () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.input_wrap {
  display: flex;
  flex-direction: column;
  margin-top: 49vh;
  .sign_up_title {
    width: 310px;
    margin: 0 auto;
    font-weight: bold;
    font-size: 15px;
    background-color: rgb(29, 134, 255);
    border: .5px solid rgb(21, 128, 250);
    color: #ffffff;
    text-align: center;
    margin-top: 20px;
    border-radius: 100px;
    line-height: 40px;
    cursor: pointer;
    box-shadow: 0 0 3px 3px #aed4ff;
    &:visited,
    &:active {
      box-shadow: 0 0 3px 3px #d0e6ff;
      background-color: rgb(31, 134, 252);
    }
  }
  input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgb(199, 199, 199);
    width: 310px;
    margin: 0 auto;
    line-height: 28px;
    color: rgb(134, 134, 134);
    padding-left: 7px;
    &:focus {
      outline: none;
    }
  }
}
.sign_up {
  text-align: center;
  margin-top: 80px;
  font-size: 12px;
  cursor: pointer;
  color: rgb(85, 153, 255);
}
</style>
