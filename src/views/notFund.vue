<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isNoPermission = computed(() => route.query.reason === 'noPermission')
const h1Color = computed(() => (isNoPermission.value ? '#ff3b30' : 'inherit'))
</script>

<template>
  <div class="not-found">
    <h1>{{ isNoPermission ? '403' : '404' }}</h1>
    <p>{{ isNoPermission ? '无权限访问该页面' : '页面走丢了' }}</p>
    <button @click="router.back()">返回上一页</button>
    <router-link to="/">回到首页</router-link>
  </div>
</template>

<style scoped lang="scss">
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
  color: v-bind(h1Color);
}
</style>
