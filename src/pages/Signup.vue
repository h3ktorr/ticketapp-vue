<template>
  <main class="all-form container">
    <h2>Sign Up</h2>
    <form @submit.prevent="submit">
      <div className="form-group">
        <input v-model="name" placeholder="Full name" />
        <p v-if="error.name" class="error">{{ error.name }}</p>
      </div>
      <div className="form-group">
        <input v-model="email" placeholder="Email" />
        <p v-if="error.email" class="error">{{ error.email }}</p>
      </div>
      <div className="form-group">
        <input v-model="password" type="password" placeholder="Password" />
        <p v-if="error.password" class="error">{{ error.password }}</p>
      </div>
      <p v-if="error.general" class="error">{{ error.general }}</p>
      <button class="btn" type="submit">Create account</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/useAuthStore'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()
const error = ref({
  name: "",
  email: "",
  password: "",
  general: "",
});


async function submit() {
  error.value = { name: "", email: "", password: "", general: "" };

  let valid = true;

  if (!name.value.trim()) {
    error.value.name = "Full name is required";
    valid = false;
  }

  if (!email.value.trim()) {
    error.value.email = "Email is required";
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    error.value.email = "Enter a valid email address";
    valid = false;
  }

  if (!password.value.trim()) {
    error.value.password = "Password is required";
    valid = false;
  } else if (password.value.length < 6) {
    error.value.password = "Password must be at least 6 characters";
    valid = false;
  }

  if (!valid) return;

  try {
    await auth.signup({ 
      name: name.value, 
      email: email.value, 
      password: password.value 
    });
    router.push('/dashboard');
  } catch (err) {
    error.value.general = err.message || 'Failed to create account';
  }
}
</script>

<style scoped>
.auth {
  max-width: 400px;
  margin: 4rem auto;
}
.error {
  color: #c23939;
}
</style>
