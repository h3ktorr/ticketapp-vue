<template>
  <main class="all-form container">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <div className="form-group">
        <input v-model="email" placeholder="Email"
        data-testid="test-auth-email" />
        <p v-if="error.email" test-auth-email-error class="error">{{ error.email }}</p>
      </div>
      <div className="form-group">
        <input v-model="password" type="password" placeholder="Password"
        data-testid="test-auth-password" />
        <p v-if="error.password" data-testid="test-auth-password-error"  class="error">{{ error.password }}</p>
      </div>
      <p v-if="error.general" data-testid="test-auth-general-error" class="error">{{ error.general }}</p>
      <button class="btn" type="submit" data-testid="test-auth-submit">Login</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/useAuthStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref({
  email: "",
  password: "",
  general: "",
});
const auth = useAuthStore()
const router = useRouter()

async function submit() {
  error.value = { email: "", password: "", general: "" };
  let valid = true;

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
  }

  if (!valid) return;

  try {
    await auth.login({ email: email.value, password: password.value });
    router.push('/dashboard');
  } catch (err) {
    error.value.general = err.message || 'Invalid credentials';
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
