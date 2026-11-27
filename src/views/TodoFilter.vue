<template>
  <div class="segmented-wrapper">
    <div class="segmented-control">
      <div
        class="segmented-track"
        :style="{
          transform: `translateX(calc(${activeIndex} * (100% + 0px)))`,
        }"
      />
      <button
        v-for="(opt, i) in options"
        :key="opt.value"
        type="button"
        class="segment-item"
        :class="{ active: filterType === opt.value }"
        @click="filterType = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { TodoItem } from './todo'

defineProps<{
  list: TodoItem[]
}>()

const filterType = defineModel<string>('filterType', { default: 'all' })

const options = [
  { value: 'all', label: '全部' },
  { value: 'uncompleted', label: '未完成' },
  { value: 'completed', label: '已完成' },
]

const activeIndex = computed(() => options.findIndex((o) => o.value === filterType.value))
</script>

<style scoped lang="scss">
.segmented-wrapper {
  margin-bottom: 16px;
}

.segmented-control {
  position: relative;
  display: flex;
  background: rgba(120, 120, 128, 0.16);
  border-radius: 10px;
  padding: 3px;
  gap: 0;
}

.segmented-track {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc((100% - 6px) / 3);
  background: #fff;
  border-radius: 8px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.segment-item {
  position: relative;
  flex: 1;
  z-index: 1;
  padding: 8px 12px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #3c3c43;
  cursor: pointer;
  border-radius: 8px;
  font-family: inherit;
  transition: color 0.2s;
  white-space: nowrap;

  &.active {
    color: #1c1c1e;
    font-weight: 600;
  }

  &:hover {
    color: #000;
  }
}
</style>
