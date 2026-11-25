<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面走丢了</p>
    <button @click="router.back()">返回上一页</button>
    <router-link to="/todo-list">回到待办列表</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  gap: 1rem;
}

h1 {
  font-size: 4rem;
  margin: 0;
}
</style>
