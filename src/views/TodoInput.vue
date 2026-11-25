<template>
  新增待办：
  <input
    class="todo-input"
    v-model="newTodo"
    placeholder="输入新的待办事项..."
    @keyup.enter="addTodo"
  />
  <button class="add-btn" @click="addTodo">新增</button>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['addTodo'])
const newTodo = ref('')
function addTodo() {
  let todo = newTodo.value.trim()
  emit('addTodo', todo)
  newTodo.value = ''
}
</script>
<style scoped lang="scss">
.todo-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
}
.add-btn {
  padding: 0.5rem;
  width: 100%;
  max-width: 100px;
  margin-left: 1rem;
  cursor: pointer;
}
</style>
