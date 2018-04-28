import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{Auth:false, title:'Inicio'}
    },
     {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{Auth:false, title:'Register'}
    },
     {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{Auth:false, title:'Login'}
    }
  ]
})
