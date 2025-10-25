<template>
  <main class="tickets-container">
    <div class="tickets-header">
      <h2>Tickets</h2>
      <button class="btn">
        <RouterLink to="/tickets/new" class="btn">New Ticket</RouterLink>
      </button>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ul class="ticket-list">
      <li
        v-for="t in tickets"
        :key="t.id"
        class="ticket-card"
        :data-testid="`ticket-${t.id}`"
      >
        <div class="single-ticket-header">
          <h3>{{ t.title }}</h3>
          <div :class="['status', t.status]">{{ t.status }}</div>
        </div>
        <p>{{ t.description }}</p>
        <div class="ticket-meta">
          <div class="ticket-actions">
            <RouterLink :to="`/tickets/${t.id}`" class="btn">Edit</RouterLink>
            <button class="btn" @click="handleDelete(t.id)">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTicketStore } from '../store/useTicketStore'
import { useRouter, RouterLink } from 'vue-router'

const ticketStore = useTicketStore()
const tickets = ref([])
const loading = ref(true)
const error = ref('')
const router = useRouter()

function loadTickets() {
  try {
    tickets.value = ticketStore.tickets
  } catch (err) {
    error.value = 'Failed to load tickets. Please retry.'
  } finally {
    loading.value = false
  }
}

function handleDelete(id) {
  if (!confirm('Delete this ticket?')) return
  ticketStore.deleteTicket(id)
  tickets.value = ticketStore.tickets
}

onMounted(() => {
  loadTickets()
})
</script>
