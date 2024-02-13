import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DoctorDetails from '../views/DoctorDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/doctor',
      name: 'DoctorDetail',
      component: DoctorDetails
    },
  ]
})

export default router
