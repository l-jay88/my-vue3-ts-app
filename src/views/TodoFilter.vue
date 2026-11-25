<template>
  <div class="filter-group">
    <input id="all" class="filter-radio" type="radio" v-model="filterType" value="all" />
    <label class="filter-label" for="all">全部</label>
    <input
      id="completed"
      class="filter-radio"
      type="radio"
      v-model="filterType"
      value="completed"
    />
    <label class="filter-label" for="completed">已完成</label>
    <input
      id="uncompleted"
      class="filter-radio"
      type="radio"
      v-model="filterType"
      value="uncompleted"
    />
    <label class="filter-label" for="uncompleted">未完成</label>
  </div>
  <p>当前待办事项数量：{{ todoCount }}</p>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TodoItem } from './todo'
const props = defineProps<{
  list: TodoItem[]
}>()
const todoCount = computed(() => props.list.length)
const filterType = defineModel<string>('filterType', { default: 'all' })
</script>
