<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { watch, ref } from 'vue'

const route = useRoute()
const transitionName = ref('fade')

watch(
  () => route.path,
  (to, from) => {
    const toDepth = to.split('/').length
    const fromDepth = from?.split('/').length ?? 0
    if (toDepth > fromDepth) {
      transitionName.value = 'slide-left'
    } else if (toDepth < fromDepth) {
      transitionName.value = 'slide-right'
    } else {
      transitionName.value = 'fade'
    }
  },
)
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition :name="transitionName">
      <Component :key="route.name" :is="Component" v-bind="$attrs" />
    </transition>
  </RouterView>
</template>
<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
/* 向左滑入 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-left-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* 向右滑入 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-right-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
