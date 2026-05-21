import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import QaView from '../views/QaView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/qa',
    component: QaView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
