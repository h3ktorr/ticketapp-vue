<template>
  <nav class="site-nav">
    <div class="nav-left">
      <RouterLink to="/" class="brand">TicketApp</RouterLink>
    </div>
    <div class="nav-right">
      <div class="big-screen">
        <RouterLink to="/">Home</RouterLink>
        <template v-if="auth.user">
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink to="/tickets">Tickets</RouterLink>
          <button class="btn-link" @click="logout">Logout</button>
        </template>
        <template v-else>
          <RouterLink to="/auth/login">Login</RouterLink>
        </template>
      </div>
      <div class="small-screen">
        <FaBars @click="app.toggleSidebar" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { FaBars } from '@kalimahapps/vue-icons';
import { useAuthStore } from '../store/useAuthStore'
import { useRouter, RouterLink } from 'vue-router'
import { useAppStore } from '../store/useAppStore';

const auth = useAuthStore()
const router = useRouter()
const app = useAppStore()

function logout() {
  auth.logout()
  router.push('/')
}
</script>

