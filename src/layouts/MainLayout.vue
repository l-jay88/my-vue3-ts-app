<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const displayName = computed(() => userStore.user?.name || '用户')
const roleLabel = computed(() => (userStore.role === 'admin' ? '管理员' : '普通用户'))
const isAdmin = computed(() => userStore.role === 'admin')
const avatarLetter = computed(() => displayName.value.charAt(0).toUpperCase())

const navItems = [
  { to: '/', label: '首页', icon: 'home' },
  { to: '/todo-list', label: '待办', icon: 'todo' },
  { to: '/about', label: '关于', icon: 'about' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const logout = () => {
  userStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-left">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 11L12 14L22 4"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>DevFlow</span>
        </div>
      </div>

      <nav class="header-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: isActive(item.to) }"
        >
          <template v-if="item.icon === 'home'">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </template>
          <template v-else-if="item.icon === 'todo'">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="3"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M8 12L11 15L16 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </template>
          <template v-else>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
              <path
                d="M12 8V12L15 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </template>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="header-right">
        <div class="user-badge" :class="{ admin: isAdmin }">
          <svg v-if="isAdmin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L3 7V12C3 17 6.5 20.5 12 22C17.5 20.5 21 17 21 12V7L12 2Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linejoin="round"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
            <circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="2" />
            <path
              d="M5.5 19C5.5 15.6863 8.46243 13 12.1 13C15.7376 13 18.7 15.6863 18.7 19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span>{{ roleLabel }}</span>
        </div>

        <div class="user-profile">
          <div class="avatar" :class="{ admin: isAdmin }">
            {{ avatarLetter }}
          </div>
          <div class="user-meta">
            <span class="user-name">{{ displayName }}</span>
            <span class="user-role">{{ userStore.role }}</span>
          </div>
        </div>

        <button class="logout-btn" @click="logout">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 17L21 12L16 7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>退出</span>
        </button>
      </div>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC', 'Helvetica Neue', sans-serif;
}

.app-header {
  height: 64px;
  width: 100%;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  padding: 0 28px;
  box-sizing: border-box;
  gap: 24px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #007aff;

  svg {
    width: 26px;
    height: 26px;
  }
}

.header-nav {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 10px;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: #007aff;
    background: rgba(0, 122, 255, 0.06);
  }

  &.active {
    color: #007aff;
    background: rgba(0, 122, 255, 0.08);
    font-weight: 600;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #8e8e93;
  background: rgba(142, 142, 147, 0.12);

  svg {
    width: 13px;
    height: 13px;
  }

  &.admin {
    color: #ff9500;
    background: rgba(255, 149, 0, 0.12);
  }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007aff, #5ac8fa);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.25);

  &.admin {
    background: linear-gradient(135deg, #ff9500, #ff3b30);
    box-shadow: 0 2px 8px rgba(255, 149, 0, 0.3);
  }
}

.user-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
  color: #1c1c1e;
}

.user-role {
  font-size: 11px;
  color: #8e8e93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: #fff;
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    color: #ff3b30;
    border-color: rgba(255, 59, 48, 0.3);
    background: rgba(255, 59, 48, 0.06);
  }

  &:active {
    transform: scale(0.97);
  }
}

.app-main {
  flex: 1;
  padding-top: 64px;
  overflow: auto;
}
</style>
