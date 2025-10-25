<template>
  <main class="container dashboard">
    <h2>Dashboard</h2>
    <div v-if="loading">Loading...</div>
    <div v-else class="stats-grid">
      <div class="stat-card">Total <br /><strong data-testid="stat-total">{{ stats.total }}</strong></div>
      <div class="stat-card">Open <br /><strong data-testid="stat-open">{{ stats.open }}</strong></div>
      <div class="stat-card">In Progress <br /><strong data-testid="stat-inprogress">{{ stats.in_progress }}</strong></div>
      <div class="stat-card">Closed <br /><strong >{{ stats.closed }}</strong></div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTicketStore } from '../store/useTicketStore'

const ticketStore = useTicketStore()
const loading = ref(true)
const stats = ref({ total: 0, open: 0, in_progress: 0, closed: 0 })

onMounted(() => {
  loading.value = true
  const all = ticketStore.tickets
  stats.value = {
    total: all.length,
    open: all.filter(t => t.status === 'open').length,
    in_progress: all.filter(t => t.status === 'in_progress').length,
    closed: all.filter(t => t.status === 'closed').length
  }
  loading.value = false
})
</script>
