<template>
  <div class="login-view">
    <h1>登录</h1>
    <form @submit.prevent="login">
      <label for="name">用户名：</label>
      <input type="text" id="name" v-model="name" required /><br />
      <select id="role" v-model="role" required>
        <option value="user">用户</option>
        <option value="admin">管理员</option>
      </select>
      <label for="email">邮箱：</label>
      <input type="email" id="email" v-model="email" required />
      <label for="password">密码：</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">登录</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const email = ref('1466@qq.com')
const password = ref('123456')
const name = ref('张三')
const role = ref('user')
const router = useRouter()
const route = useRoute()

const login = () => {
  userStore.login(
    {
      id: Date.now(),
      name: name.value,
      email: email.value,
      password: password.value,
    },
    role.value,
  )
  const redirect = route.query.redirect as string
  router.push(redirect || { name: 'todoList' })
}
</script>
