<template>
  <div class="ios-container">
    <header class="ios-header">
      <h1 class="ios-title">待办事项</h1>
      <p class="ios-subtitle">{{ todos.length }} 项 · 已完成 {{ completedCount }}</p>
    </header>

    <div class="search-wrapper">
      <svg
        class="search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input class="ios-search" v-model="searchQueryRaw" placeholder="搜索" />
      <button v-if="searchQueryRaw" class="clear-btn" @click="searchQueryRaw = ''">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6M9 9l6 6" />
        </svg>
      </button>
    </div>

    <TodoFilter :list="searchList" v-model:filterType="filterType" />

    <div class="card">
      <TodoInput @addTodo="addTodo" />
    </div>

    <div class="card">
      <ul class="todo-list">
        <to-do-item
          v-for="todo in searchList"
          :key="todo.id"
          :todo="todo"
          @delete="handleDelete"
          @click="handleClick"
        >
          <template #default="{ todo: todoFromSlot }">
            <span v-if="todoFromSlot.completed" class="badge badge-done">已完成</span>
            <span v-else class="badge badge-active">进行中</span>
          </template>
        </to-do-item>
      </ul>
      <p v-if="searchList.length === 0" class="empty-state">
        {{ filterType === 'all' ? '还没有待办事项，点击上方添加' : '没有匹配的待办事项' }}
      </p>
    </div>
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

const completedCount = computed(() => todos.filter((t) => t.completed).length)

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
.ios-container {
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 20px 48px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue',
    'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(180deg, #f2f2f7 0%, #e5e5ea 100%);
  min-height: 100vh;
  color: #1c1c1e;
  -webkit-font-smoothing: antialiased;
}

.ios-header {
  margin-bottom: 24px;

  .ios-title {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin: 0 0 4px;
    color: #1c1c1e;
  }

  .ios-subtitle {
    font-size: 15px;
    color: #8e8e93;
    margin: 0;
    font-weight: 400;
  }
}

.search-wrapper {
  position: relative;
  margin-bottom: 16px;

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: #8e8e93;
    pointer-events: none;
  }

  .ios-search {
    width: 100%;
    padding: 11px 40px 11px 40px;
    font-size: 17px;
    border-radius: 12px;
    border: none;
    background: rgba(118, 118, 128, 0.12);
    color: #1c1c1e;
    outline: none;
    transition:
      background 0.2s,
      box-shadow 0.2s;
    font-family: inherit;
    box-sizing: border-box;

    &::placeholder {
      color: #8e8e93;
    }

    &:focus {
      background: #fff;
      box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.25);
    }
  }

  .clear-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background: #c7c7cc;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background 0.15s;

    &:hover {
      background: #8e8e93;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }
}

.card {
  background: #fff;
  border-radius: 14px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #8e8e93;
  font-size: 15px;
  margin: 0;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;

  &.badge-done {
    background: rgba(52, 199, 89, 0.15);
    color: #34c759;
  }

  &.badge-active {
    background: rgba(255, 149, 0, 0.15);
    color: #ff9500;
  }
}
</style>
