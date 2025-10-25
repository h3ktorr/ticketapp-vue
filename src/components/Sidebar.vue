<template>
  <div
    ref="sidebarRef"
    :class="{ 'sidebar': true, 'sidebar-open': app.isSidebarOpen }"
    @click="handleSidebarClose"
  >
    <div class="sidebar-body">
      <button class="close-sidebar" @click="app.toggleSidebar">
        <CgClose :style="{ backgroundColor: 'white',}" />
      </button>

      <div class="nav-icons">
        <RouterLink to="/" @click="app.toggleSidebar">Home</RouterLink>

        <template v-if="auth.user">
          <RouterLink to="/dashboard" @click="app.toggleSidebar">Dashboard</RouterLink>
          <RouterLink to="/tickets" @click="app.toggleSidebar">Tickets</RouterLink>
        </template>

        <p v-if="auth.user" @click="handleLogout">Logout</p>
        <RouterLink v-else to="/auth/login" @click="app.toggleSidebar">Login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAppStore } from '../store/useAppStore'
import { useAuthStore } from '../store/useAuthStore'
import { CgClose } from '@kalimahapps/vue-icons';

const app = useAppStore()
const auth = useAuthStore()
const router = useRouter()
const sidebarRef = ref(null)

function handleSidebarClose(e) {
  if (e.target === sidebarRef.value) app.toggleSidebar()
}

console.log(auth.user);


function handleLogout() {
  auth.logout()
  app.toggleSidebar()
  router.push('/')
}

watch(
  () => app.isSidebarOpen,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }
)

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>
