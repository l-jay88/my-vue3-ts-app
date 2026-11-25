import type { TodoItem } from '@/views/todo'
import { ref, computed, onUnmounted, watch } from 'vue'

export function useTodoFilter(todos: TodoItem[]) {
  const searchQuery = ref('')
  const searchQueryRaw = ref('')
  const filterType = ref('all')
  watch(
    searchQueryRaw,
    useDebounceFn((newVal) => {
      if (newVal !== searchQuery.value) {
        searchQuery.value = newVal
      }
    }, 300),
  )
  const searchList = computed(() => {
    // Implementation for filtering todos based on search query
    if (searchQuery.value === '' && filterType.value === 'all') {
      return todos
    }
    return todos.filter((todo) => {
      if (filterType.value === 'all') {
        return todo.title.includes(searchQuery.value)
      }
      if (filterType.value === 'completed') {
        return (
          (searchQuery.value === '' || todo.title.includes(searchQuery.value)) && todo.completed
        )
      }
      if (filterType.value === 'uncompleted') {
        return (
          (searchQuery.value === '' || todo.title.includes(searchQuery.value)) && !todo.completed
        )
      }
      return false
    })
  })
  return {
    searchQuery,
    searchQueryRaw,
    filterType,
    searchList,
  }
}

export function useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null

  const debouncedFn = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  // 组件卸载时清理定时器，防止内存泄漏
  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return debouncedFn
}
