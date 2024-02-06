import { createRouter, createWebHistory } from 'vue-router'
import ProvaView from '../views/ProvaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/prova',
      name: 'prova',
      component: ProvaView
    },
  ]
})

export default router
