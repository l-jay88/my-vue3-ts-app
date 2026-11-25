<template>
  <div>
    <h1>ToDoList</h1>
    查询框:
    <input class="search-input" v-model="searchQueryRaw" placeholder="搜索待办事项..." />
    <TodoInput @addTodo="addTodo" />
    <TodoFilter :list="searchList" v-model:filterType="filterType" />
    <ul class="todo-list">
      <to-do-item
        v-for="todo in searchList"
        :key="todo.id"
        :todo="todo"
        @delete="handleDelete"
        @click="handleClick"
      >
        <template #default="{ todo: todoFromSlot }">
          <!-- 父组件自己决定怎么展示 -->
          <span v-if="todoFromSlot.completed" style="color: green">✅ 已完成</span>
          <span v-else style="color: orange">⏳ 进行中</span>
        </template>
      </to-do-item>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import TodoInput from './TodoInput.vue'
import ToDoItem from './TodoItem.vue'
import type { TodoItem } from './todo'
import TodoFilter from './TodoFilter.vue'
import { useTodoStore } from '@/stores/todo'
import { useTodoFilter } from '@/components/userTodoFilter'
const todoStore = useTodoStore()
const { todos, addTodo: addTodoStore, toggleTodo, removeTodo } = todoStore
const { searchQueryRaw, filterType, searchList } = useTodoFilter(todos)

function addTodo(val: string) {
  if (val === '') {
    return
  }
  addTodoStore({
    id: new Date().getTime(),
    title: val,
    completed: false,
  })
}
function handleClick(todo: TodoItem) {
  toggleTodo(todo.id)
}
function handleDelete(todo: TodoItem) {
  removeTodo(todo.id)
}
</script>
<style scoped lang="scss">
.filter-group {
  display: flex;
  align-items: center;
}
.filter-radio {
  margin-right: 0.5rem;
}
.filter-label {
  margin-right: 1rem;
}
.search-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
