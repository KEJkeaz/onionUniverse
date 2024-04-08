import { createRouter, createWebHistory } from 'vue-router'

import NormalLayout from '@components/layout/NormalLayout.vue'
import NoNavLayout from '@components/layout/NoNavLayout.vue'

import ClearLayout from '@components/layout/ClearLayout.vue'

import store from '@/stores'
import * as UI from './import-ui'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        layout: () => !store.getters.isLogin ? ClearLayout : NormalLayout,
        requiresAuth: false
      },
      component: UI.Main
    },
    
    {
      path: '/userpage/:id',
      name: 'userpage',
      component: UI.UserPage,
      meta: { 
        layout: () => !store.getters.isLogin ? NoNavLayout : NormalLayout,
        requiresAuth: false
      },
      props: true
    },
    
    {
      path: '/setting',
      name: 'setting',
      meta: { 
        layout: () =>  NormalLayout,
        requiresAuth: true
      },
      component: UI.Setting
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { 
        layout: () =>  NormalLayout,
        requiresAuth: true
      },
      component: UI.Profile
    },
    
    {
      path: '/search',
      name: 'search',
      meta: { 
        layout: () =>  NormalLayout,
        requiresAuth: true
      },
      component: UI.Search
    },
    
    {
      path: '/follower',
      name: 'follower',
      meta: { 
        layout: () =>  NormalLayout,
        requiresAuth: true
      },
      component: UI.Follower
    },
    {
      path: '/message',
      name: 'message',
      component: UI.Message,
      meta: { 
        layout: () =>  NormalLayout,
        requiresAuth: true
      },
    },
    {
      path: '/message/:id',
      name: 'showMessage',
      component: UI.ShowMessage,
      meta: { 
        layout: () =>  ClearLayout,
        requiresAuth: true
      },
      props: true
      
    },    
    {
      path: "/afterAuth",
      name: 'afterAuth',
      component: UI.AfterAuth,
      meta: { 
        layout: () => ClearLayout,
        requiresAuth: false
      }, 
    },
    {
      path: "/userAddPlatform",
      name: 'userAddPlatform',
      component: UI.UserAddPlatform,
      meta: { 
        layout: () => ClearLayout,
        requiresAuth: false
      }, 
    },
    {
      path: '/guide',
      name: 'guide',
      component: UI.Guide,
      meta: { 
        layout: () =>  NormalLayout,
        requiresAuth: false
      },
    },
    {
      path: "/errorPage",
      name: "errorPage",
      component: UI.ErrorPage,
      meta: { 
        layout: () =>  ClearLayout,
        requiresAuth: false
      },
    },
    {
      path: "/404",
      name: "notFound",
      component: UI.Error404,
      meta: { 
        layout: () =>  ClearLayout,
        requiresAuth: false
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: "/404",
      meta: { 
        layout: () =>  ClearLayout,
        requiresAuth: false
      },
    },
    
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
   const loggedIn = localStorage.getItem('compassJwt');
   if (loggedIn === null) {
    store.dispatch('logout');
     next({
       path: '/',
       query: { redirect: to.fullPath }
     })
   } else {
     next()
   }
 } else {
   next()
 }
})

export default router
