import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Articles from '@/pages/Articles'
import Words from '@/pages/Words'
import Setting from '@/pages/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Register',
      component: Register
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles
    },
    {
      path: '/words',
      name: 'Words',
      component: Words
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
