import { ref, computed, watch } from 'vue'
import type { TodoItem } from '@/views/todo'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<TodoItem[]>([])
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
  watch(
    () => todos.value,
    (newTodos) => {
      // Update localStorage whenever todos change
      localStorage.setItem('todos', JSON.stringify(newTodos))
    },
    { deep: true },
  )
  const completedCount = computed(
    () => todos.value.filter((item: TodoItem) => item.completed).length,
  )
  function addTodo(todo: TodoItem) {
    todos.value.push(todo)
  }
  function toggleTodo(id: number) {
    todos.value.forEach((item: TodoItem) => {
      if (item.id === id) {
        item.completed = !item.completed
      }
    })
  }
  function removeTodo(id: number) {
    todos.value = todos.value.filter((item: TodoItem) => item.id !== id)
  }

  function updateTodo(id: number, title: string) {
    todos.value.forEach((item: TodoItem) => {
      if (item.id === id) {
        item.title = title
      }
    })
  }
  return { todos, completedCount, addTodo, toggleTodo, removeTodo, updateTodo }
})
