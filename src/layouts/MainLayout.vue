<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink :to="{ name: 'todoList' }">ToDoList</RouterLink>
      </nav>
      <div class="user-info">
        <span>当前用户：{{ userStore.user?.name }}</span>
        <button @click="logout">退出登录</button>
      </div>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.app-header {
  height: 60px;
  width: 100%;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition:
    color 0.2s,
    border-color 0.2s;
}

nav a:hover {
  color: #42b983;
}

nav a.router-link-active {
  color: #42b983;
  border-bottom-color: #42b983;
}

.app-main {
  flex: 1;
  padding-top: 60px;
  overflow: auto;
}
</style>
