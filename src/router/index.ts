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
          meta: { requiresAuth: true, role: ['user', 'admin'] },
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
          meta: { requiresAuth: true, role: ['user', 'admin'] },
        },
        {
          path: 'todo-detail/:id',
          name: 'todoDetail',
          component: () => import('../views/ToDoDetail.vue'),
          meta: { requiresAuth: true, role: ['user', 'admin'] },
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

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.name === 'login') {
    if (userStore.isLoggedIn) {
      return { name: 'home' }
    }
    return true
  }

  if (to.name === 'notFound') {
    return true
  }

  if (to.meta.requiresAuth) {
    if (!userStore.isLoggedIn) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }
    const requiredRole = (to.meta.role as string[]) ?? []
    if (requiredRole.length > 0 && !requiredRole.includes(userStore.role)) {
      return { name: 'notFound', query: { reason: 'noPermission' } }
    }
  }

  return true
})

export default router
