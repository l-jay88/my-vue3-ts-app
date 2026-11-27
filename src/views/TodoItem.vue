<template>
  <li class="item" :class="{ completed: todo.completed }" @click="handleClick(todo)">
    <div class="check-circle" :class="{ checked: todo.completed }">
      <svg
        v-if="todo.completed"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
    </div>

    <div class="content">
      <span class="title">{{ todo.title }}</span>
      <slot :todo="todo">
        <span v-if="todo.completed">已完成</span>
      </slot>
    </div>

    <button class="delete-btn" @click.stop="handleDelete(todo)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path
          d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
        />
      </svg>
    </button>
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
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.12);
  cursor: pointer;
  transition: background 0.15s;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background: rgba(0, 122, 255, 0.06);
  }

  .check-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #c7c7cc;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;

    svg {
      width: 14px;
      height: 14px;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.2s ease;
    }

    &.checked {
      background: #34c759;
      border-color: #34c759;

      svg {
        color: #fff;
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  .content {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .title {
    font-size: 17px;
    font-weight: 400;
    color: #1c1c1e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition:
      color 0.2s,
      text-decoration 0.2s;
  }

  .delete-btn {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: #8e8e93;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.15s,
      color 0.15s;
    flex-shrink: 0;

    svg {
      width: 18px;
      height: 18px;
    }

    &:hover {
      background: rgba(255, 59, 48, 0.1);
      color: #ff3b30;
    }
  }

  &.completed {
    .title {
      color: #8e8e93;
      text-decoration: line-through;
    }
  }
}
</style>
