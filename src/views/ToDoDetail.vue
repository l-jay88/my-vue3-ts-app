<script setup lang="ts">
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useTodoStore } from '@/stores/todo'
import type { TodoItem } from '@/views/todo'

const route = useRoute()
const router = useRouter()
const todoStore = useTodoStore()

// 找到当前待办
const todo = computed<TodoItem | undefined>(() =>
  todoStore.todos.find((item) => item.id === Number(route.params.id)),
)

// 本地编辑副本，不直接改 store
const draftTitle = ref('')
const isDirty = ref(false)

// 初始化 / 切换 id 时同步
watch(
  todo,
  (val) => {
    draftTitle.value = val?.title ?? ''
    isDirty.value = false
  },
  { immediate: true },
)

// 用户修改输入框
function onInput() {
  isDirty.value = draftTitle.value !== (todo.value?.title ?? '')
}

// 保存
function save() {
  if (!todo.value || !draftTitle.value.trim()) return
  todoStore.updateTodo(todo.value.id, draftTitle.value.trim())
  isDirty.value = false
}

// 离开拦截
onBeforeRouteLeave((to, from, next) => {
  if (isDirty.value) {
    const ok = window.confirm('有未保存的修改，确定要离开吗？')
    if (ok) {
      next()
    } else {
      next(false) // 取消跳转
    }
  } else {
    next()
  }
})
</script>

<template>
  <div v-if="todo">
    <router-link to="/todo-list">返回</router-link>
    <h2>{{ todo.title }}</h2>

    <input v-model="draftTitle" @input="onInput" placeholder="修改标题..." />
    <button @click="save" :disabled="!isDirty">保存</button>

    <p>状态：{{ todo.completed ? '已完成' : '未完成' }}</p>
  </div>
  <div v-else>
    <p>未找到该待办</p>
    <router-link to="/todo-list">返回列表</router-link>
  </div>
</template>
