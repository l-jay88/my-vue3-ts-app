import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: { requiresAuth: true, role: ['user', 'admin'] },
        },
        {
          path: 'todo-list',
          name: 'todoList',
          component: () => import('../views/ToDoList.vue'),
          meta: { requiresAuth: true, role: ['admin'] },
        },
        {
          path: 'todo-detail/:id',
          name: 'todoDetail',
          component: () => import('../views/ToDoDetail.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/notFund.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'notFound') {
    next()
  } else {
    const userStore = useUserStore()
    if (to.meta.requiresAuth) {
      if (userStore.isLoggedIn) {
        const requiredRole = (to.meta.role as string[]) ?? []
        if (requiredRole.includes(userStore.role)) {
          next()
        } else {
          next({ name: 'notFound' })
        }
      } else {
        next({ name: 'login', query: { redirect: to.fullPath } })
      }
    } else {
      next()
    }
  }
})

export default router
