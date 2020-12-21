import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./views/Main.vue')
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('./views/Resume.vue')
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('./views/People.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue')
    },
    { 
      path: '/user/:id', 
      name: 'user',
      component: () => import('./components/User.vue') 
    }
  ]
})
