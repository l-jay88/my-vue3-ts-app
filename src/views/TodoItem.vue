<template>
  <li :class="{ item: true, completed: todo.completed }" @click="handleClick(todo)">
    <span class="title">{{ todo.title }}</span>
    <div class="actions">
      <slot :todo="todo"><span v-if="todo.completed">已完成</span></slot>
      <button class="delete-btn" @click.stop="handleDelete(todo)">删除</button>
    </div>
  </li>
</template>
<script setup lang="ts">
import type { TodoItem } from './todo'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
  todo: TodoItem
}>()
const emit = defineEmits<{
  (e: 'delete', todo: TodoItem): void
  (e: 'click', todo: TodoItem): void
}>()
const handleDelete = (todo: TodoItem) => {
  emit('delete', todo)
}
const handleClick = (todo: TodoItem) => {
  emit('click', todo)
  router.push({ name: 'todoDetail', params: { id: todo.id } })
}
</script>
<style scoped lang="scss">
.item {
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    flex: 1;
    cursor: pointer;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &.completed {
    color: #888;
    cursor: not-allowed;
    .delete-btn {
      cursor: not-allowed;
    }
  }
  .delete-btn {
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background-color: rgb(248, 99, 99);
    color: #fff;
    border: none;
    cursor: pointer;
  }
}
</style>
