import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
interface User {
  id: number
  name: string
  email: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User>(JSON.parse(localStorage.getItem('user') || '{}'))
  const token = ref<string>(localStorage.getItem('token') || '')
  const role = ref<string>(localStorage.getItem('role') || 'user')
  const isLoggedIn = computed<boolean>(() => {
    return token.value !== ''
  })
  const setToken = (t: string) => {
    token.value = t
    localStorage.setItem('token', t)
  }
  const setRole = (r: string) => {
    role.value = r
    localStorage.setItem('role', r)
  }
  const setUser = (u: User) => {
    user.value = u
    localStorage.setItem('user', JSON.stringify(u))
  }
  const login = (u: User, r: string) => {
    setUser(u)
    setToken(u.email)
    setRole(r)
  }
  const logout = () => {
    setUser({ id: 0, name: '', email: '', password: '' })
    setToken('')
    setRole('user')
    localStorage.removeItem('token')
  }
  return { user, setUser, login, logout, isLoggedIn, role, token }
})
