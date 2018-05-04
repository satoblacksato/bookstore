import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
Vue.use(Router)



import store from '@/store';
const beforeEnter = (to, from, next) => {
  if (store.state.authModule.logged) {
    next({path: '/'});
  } else {
    next();
  }
};


const router = new Router({
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
      meta:{Auth:false, title:'Register'},
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
     {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{Auth:false, title:'Login'},
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    }
  ]
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.meta.Auth && !store.state.authModule.logged && store.state.loaded) {
    next({path: '/login'});
  } else {
    if (to.meta.role) {
      if (store.state.loaded && (to.meta.role !== store.state.authModule.role)) {
        next({path: '/'});
        return;
      }
    }
    next();
  }
});

export default router;
