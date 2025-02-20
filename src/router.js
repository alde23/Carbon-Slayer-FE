import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Chat from './components/Chat.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/chat', component: Chat }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Temporarily disable the authentication check
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       next({ path: '/' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router