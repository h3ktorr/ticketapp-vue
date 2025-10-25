<template>
  <main class="container all-form">
    <h2>{{ isNew ? 'Create Ticket' : 'Edit Ticket' }}</h2>

    <form @submit.prevent="submit">
      <input
        v-model="form.title"
        placeholder="Title"
        data-testid="test-ticket-title"
      />
      <p v-if="error" class="error">{{ error }}</p>

      <textarea
        v-model="form.description"
        placeholder="Description"
        class="description"
        rows="5"
        data-testid="test-ticket-description"
      />

      <label for="status">Status</label>
      <select v-model="form.status" class="ticket-status" data-testid="test-ticket-status">
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="closed">closed</option>
      </select>

      <button class="btn" type="submit" data-testid="test-ticket-submit">
        Save
      </button>
    </form>
  </main>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketStore } from '../store/useTicketStore'

const route = useRoute()
const router = useRouter()
const ticketStore = useTicketStore()
const id = route.params.id
const isNew = (id === 'new')

const error = ref('')
const form = reactive({
  title: '',
  description: '',
  status: 'open',
})

onMounted(() => {
  if (!isNew) {
    const ticket = ticketStore.tickets.find((t) => t.id === id)
    if (!ticket) {
      error.value = 'Ticket not found'
      return
    }
    form.title = ticket.title
    form.description = ticket.description
    form.status = ticket.status
  }
})

function submit() {
  error.value = ''

  // Validation
  if (!form.title || form.title.length < 3) {
    error.value = 'Title is required (min 3 chars)'
    return
  }
  if (form.description && form.description.length < 6) {
    error.value = 'Description must be at least 6 characters'
    return
  }
  if (!['open', 'in_progress', 'closed'].includes(form.status)) {
    error.value = 'Invalid status'
    return
  }

  // Save
  if (isNew) {
    ticketStore.createTicket(form)
  } else {
    ticketStore.updateTicket(id, form)
  }
  router.push('/tickets')
}
</script>
