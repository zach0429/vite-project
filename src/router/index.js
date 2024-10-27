import { createRouter, createWebHistory } from 'vue-router'
import Login1 from '../views/Login1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Login1', component: Login1 },
    { path: '/login2', name: 'Login2', component: () => import('../views/Login2.vue') },
    { path: '/:domain(.*)*', name: 'NotFound', component: () => import('../views/404.vue') },
  ]
})

export default router
