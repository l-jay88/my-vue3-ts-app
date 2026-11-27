<template>
  <div class="input-row">
    <div class="add-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
    <input class="todo-input" v-model="newTodo" placeholder="新建待办事项" @keyup.enter="addTodo" />
    <button class="add-btn" :disabled="!newTodo.trim()" @click="addTodo">添加</button>
  </div>
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
.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
}

.add-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #007aff;
  color: #007aff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;

  svg {
    width: 14px;
    height: 14px;
  }
}

.todo-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 17px;
  color: #1c1c1e;
  background: transparent;
  font-family: inherit;
  padding: 4px 0;

  &::placeholder {
    color: #8e8e93;
  }
}

.add-btn {
  padding: 7px 16px;
  border-radius: 10px;
  border: none;
  background: #007aff;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition:
    opacity 0.15s,
    transform 0.1s;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
