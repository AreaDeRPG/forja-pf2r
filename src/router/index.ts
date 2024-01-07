import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArmasView from '@/views/ArmasView.vue'
import ArmadurasView from '@/views/ArmadurasView.vue'

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/armas',
      name: 'armas',
      component: ArmasView
    },
    {
      path: '/armaduras',
      name: 'armaduras',
      component: ArmadurasView
    }
  ]
})

export default router
