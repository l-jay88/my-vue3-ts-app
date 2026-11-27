<template>
  <div class="login-wrapper">
    <div class="bg-decoration">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="login-container">
      <div class="brand-panel">
        <div class="brand-content">
          <div class="logo-area">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span class="brand-name">DevFlow</span>
          </div>
          <h2 class="brand-title">高效协作，简单管理</h2>
          <p class="brand-desc">
            一站式待办事项平台，帮助团队追踪任务、管理进度，让工作流程更清晰、更高效。
          </p>
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-dot"></span>
              实时同步，团队协作无障碍
            </div>
            <div class="feature-item">
              <span class="feature-dot"></span>
              智能分类，任务管理井井有条
            </div>
            <div class="feature-item">
              <span class="feature-dot"></span>
              简洁设计，专注于真正重要的事
            </div>
          </div>
        </div>
      </div>

      <div class="form-panel">
        <div class="form-content">
          <div class="form-header">
            <h1>{{ mode === 'login' ? '欢迎回来' : '创建账户' }}</h1>
            <p>{{ mode === 'login' ? '请登录您的账户以继续' : '只需几步，即可开始使用' }}</p>
          </div>

          <div class="auth-tabs">
            <button
              type="button"
              class="auth-tab"
              :class="{ active: mode === 'login' }"
              @click="switchMode('login')"
            >
              登录
            </button>
            <button
              type="button"
              class="auth-tab"
              :class="{ active: mode === 'register' }"
              @click="switchMode('register')"
            >
              注册
            </button>
          </div>

          <form v-if="mode === 'login'" @submit.prevent="login" class="login-form">
            <div class="form-group">
              <label for="email">邮箱地址</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="请输入邮箱地址"
                  autocomplete="email"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password">密码</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="4"
                      y="11"
                      width="16"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  placeholder="请输入密码"
                  autocomplete="current-password"
                  required
                />
              </div>
            </div>

            <div v-if="errorMsg" class="error-alert">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <path
                  d="M12 8V12M12 16H12.01"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>{{ errorMsg }}</span>
            </div>

            <button type="submit" class="submit-btn" :disabled="loading">
              <svg v-if="loading" class="spinner" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-opacity="0.25"
                />
                <path
                  d="M22 12C22 6.47715 17.5228 2 12 2"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
              <template v-else>
                <span>登 录</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </template>
            </button>
          </form>

          <form v-else @submit.prevent="register" class="login-form">
            <div class="form-group">
              <label for="reg-name">姓名</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" />
                    <path
                      d="M4 21C4 16.582 7.582 13 12 13C16.418 13 20 16.582 20 21"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  id="reg-name"
                  v-model="regName"
                  placeholder="请输入姓名"
                  autocomplete="name"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="reg-email">邮箱地址</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  id="reg-email"
                  v-model="regEmail"
                  placeholder="请输入邮箱地址"
                  autocomplete="email"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="reg-password">密码</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="4"
                      y="11"
                      width="16"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="reg-password"
                  v-model="regPassword"
                  placeholder="至少 6 位密码"
                  autocomplete="new-password"
                  minlength="6"
                  required
                />
              </div>
            </div>

            <div v-if="errorMsg" class="error-alert">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <path
                  d="M12 8V12M12 16H12.01"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>{{ errorMsg }}</span>
            </div>

            <button type="submit" class="submit-btn" :disabled="loading">
              <svg v-if="loading" class="spinner" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-opacity="0.25"
                />
                <path
                  d="M22 12C22 6.47715 17.5228 2 12 2"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
              <template v-else>
                <span>注 册</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                </svg>
              </template>
            </button>
          </form>

          <div class="form-footer">
            <span>© 2026 DevFlow. 保留所有权利。</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '@/supabase'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const mode = ref<'login' | 'register'>('login')
const loading = ref(false)
const errorMsg = ref('')

const email = ref('')
const password = ref('')

const regName = ref('')
const regEmail = ref('')
const regPassword = ref('')

interface SupabaseUser {
  id: number
  name: string
  email: string
  password: string
  role?: string
}

const switchMode = (m: 'login' | 'register') => {
  mode.value = m
  errorMsg.value = ''
}

const login = async () => {
  errorMsg.value = ''
  if (!email.value.trim() || !password.value.trim()) {
    errorMsg.value = '请填写邮箱和密码'
    return
  }

  loading.value = true
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email.value.trim())
      .eq('password', password.value)
      .maybeSingle<SupabaseUser>()

    if (error) throw error

    if (!data) {
      errorMsg.value = '邮箱或密码错误，请重试'
      return
    }

    userStore.login(
      {
        id: data.id,
        name: data.name || email.value.split('@')[0],
        email: data.email,
        password: data.password,
      },
      data.role || 'user',
    )

    const redirect = route.query.redirect as string
    router.push(redirect || { name: 'todoList' })
  } catch (err: any) {
    console.error('[login] supabase error:', err)
    errorMsg.value = err?.message || '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const register = async () => {
  errorMsg.value = ''
  if (!regName.value.trim()) {
    errorMsg.value = '请填写姓名'
    return
  }
  if (!regEmail.value.trim()) {
    errorMsg.value = '请填写邮箱'
    return
  }
  if (!regPassword.value || regPassword.value.length < 6) {
    errorMsg.value = '密码至少需要 6 位'
    return
  }

  loading.value = true
  try {
    const { data: exists } = await supabase
      .from('users')
      .select('email')
      .eq('email', regEmail.value.trim())
      .maybeSingle()

    if (exists) {
      errorMsg.value = '该邮箱已被注册，请直接登录'
      return
    }

    const { data, error } = await supabase
      .from('users')
      .insert({
        name: regName.value.trim(),
        email: regEmail.value.trim(),
        password: regPassword.value,
        role: 'user',
      })
      .select()
      .single<SupabaseUser>()

    if (error) throw error

    userStore.login(
      {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
      },
      data.role || 'user',
    )

    const redirect = route.query.redirect as string
    router.push(redirect || { name: 'todoList' })
  } catch (err: any) {
    console.error('[register] supabase error:', err)
    errorMsg.value = err?.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
}

.bg-decoration {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s ease-in-out infinite;
}

.blob-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #667eea 0%, transparent 70%);
  top: -100px;
  left: -100px;
}

.blob-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #f093fb 0%, transparent 70%);
  bottom: -50px;
  right: -50px;
  animation-delay: -7s;
}

.blob-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #4facfe 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }
}

.login-container {
  position: relative;
  z-index: 1;
  display: flex;
  width: 960px;
  min-height: 560px;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.brand-panel {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 48px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.brand-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 40%);
}

.brand-content {
  position: relative;
  z-index: 1;
  color: #fff;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.logo-icon svg {
  width: 24px;
  height: 24px;
  color: #fff;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.brand-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.brand-desc {
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  opacity: 0.9;
}

.feature-dot {
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
}

.form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.form-content {
  width: 100%;
  max-width: 360px;
}

.form-header {
  margin-bottom: 36px;
}

.form-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.form-header p {
  font-size: 14px;
  color: #6b7280;
}

.auth-tabs {
  display: flex;
  background: #f3f4f6;
  border-radius: 10px;
  padding: 3px;
  margin-bottom: 22px;
  gap: 2px;
}

.auth-tab {
  flex: 1;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.25s ease;

  &.active {
    background: #fff;
    color: #1a1a2e;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  &:hover:not(.active) {
    color: #374151;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: color 0.2s ease;
}

.input-icon svg {
  width: 18px;
  height: 18px;
}

.input-wrapper input {
  width: 100%;
  height: 46px;
  padding: 0 14px 0 42px;
  font-size: 14px;
  color: #1f2937;
  background: #f9fafb;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  transition: all 0.25s ease;
  font-family: inherit;
}

.input-wrapper input::placeholder {
  color: #9ca3af;
}

.input-wrapper input:hover {
  border-color: #d1d5db;
  background: #fff;
}

.input-wrapper input:focus {
  border-color: #667eea;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.12);
}

.input-wrapper:focus-within .input-icon {
  color: #667eea;
}

.error-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 13px;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
}

.submit-btn {
  width: 100%;
  height: 48px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);
  font-family: inherit;
}

.submit-btn svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
}

.submit-btn:hover:not(:disabled) svg {
  transform: translateX(4px);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.form-footer {
  margin-top: 32px;
  text-align: center;
}

.form-footer span {
  font-size: 12px;
  color: #9ca3af;
}

@media (max-width: 860px) {
  .login-container {
    flex-direction: column;
    width: 90%;
    max-width: 440px;
  }

  .brand-panel {
    padding: 36px 32px;
  }

  .brand-title {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .brand-desc {
    font-size: 13px;
    margin-bottom: 20px;
  }

  .feature-list {
    display: none;
  }

  .logo-area {
    margin-bottom: 16px;
  }

  .form-panel {
    padding: 32px;
  }
}
</style>
