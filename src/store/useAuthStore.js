import { defineStore } from "pinia";

const USERS_KEY = "ticketapp_users";
const SESSION_KEY = "ticketapp_session";

function readUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // session shape matches the provided api.js: { token, user: {id,name,email}, expiresAt }
    session: JSON.parse(localStorage.getItem(SESSION_KEY)) || null,
    loading: false,
    error: null,
  }),
  getters: {
    user: (state) => state.session?.user || null,
    isAuthenticated: (state) => !!state.session?.token,
  },
  actions: {
    async signup({ name, email, password }) {
      this.loading = true;
      this.error = null;
      // small artificial delay to mimic api
      await new Promise((r) => setTimeout(r, 300));

      const users = readUsers();
      if (users.find((u) => u.email === email)) {
        const err = new Error("Email already registered");
        err.code = 409;
        this.loading = false;
        this.error = err.message;
        throw err;
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };

      users.push(newUser);
      writeUsers(users);

      const session = {
        token: `mock-token-${newUser.id}`,
        user: { id: newUser.id, name, email },
        expiresAt: Date.now() + 24 * 3600 * 1000,
      };

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      this.session = session;
      this.loading = false;
      return session;
    },

    async login({ email, password }) {
      this.loading = true;
      this.error = null;
      await new Promise((r) => setTimeout(r, 300));

      const users = readUsers();
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        const err = new Error("Invalid credentials");
        err.code = 401;
        this.loading = false;
        this.error = err.message;
        throw err;
      }

      const session = {
        token: `mock-token-${foundUser.id}`,
        user: { id: foundUser.id, name: foundUser.name, email },
        expiresAt: Date.now() + 24 * 3600 * 1000,
      };

      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      this.session = session;
      this.loading = false;
      return session;
    },

    logout() {
      localStorage.removeItem(SESSION_KEY);
      this.session = null;
    },

    // helper to refresh in-memory state from localStorage
    loadFromStorage() {
      this.session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    },
  },
});
