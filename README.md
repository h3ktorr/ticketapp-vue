🎟️ TicketApp – Vue Frontend

A simple, clean, and responsive ticket management application built with Vue 3, Vue Router, and Pinia for state management.
TicketApp allows users to sign up, log in, create, edit, view, and delete support tickets, all stored locally using localStorage.

🚀 Features

🔐 Authentication System — Signup and login with client-side validation, session stored in localStorage.

🧾 Ticket CRUD — Create, view, update, and delete tickets.

📊 Dashboard — View live ticket statistics (Open, In Progress, Closed).

🧭 Navigation & Sidebar — Responsive top navigation and collapsible mobile sidebar.

💾 LocalStorage Mock API — All user and ticket data stored locally.

🎨 Responsive Design — Styled with vanilla CSS and media queries.

## 🚀 Live Demo

[View Live Project](https://ticketapp-vue-nine.vercel.app/)

## 💻 Repository

[GitHub Repo](https://github.com/h3ktorr/ticketapp-vue)

🧱 Tech Stack
Category Tools / Libraries
Framework - Vue 3 (via Vite)
Routing - Vue Router 4
State Management - Pinia
UI Components - Vue Icons, Custom CSS
Build Tool - Vite
Language - JavaScript (ES Modules)

📂 Folder Structure
src/
├── assets/
│ └── wave.svg
├── components/
│ ├── Footer.vue
│ ├── Sidebar.vue
│ └── SiteNav.vue
├── pages/
│ ├── Landing.vue
│ ├── Dashboard.vue
│ ├── Login.vue
│ ├── Signup.vue
│ ├── Ticket.vue
│ └── TicketEdit.vue
├── router/
│ └── index.js
├── store/
│ ├── useAppStore.js
│ ├── useAuthStore.js
│ └── useTicketStore.js
├── App.vue
├── main.js
└── style.css

⚙️ Installation & Setup
1️⃣ Clone the Repository:

git clone https://github.com/yourusername/ticketapp.git

cd ticketapp

npm install

npm run dev
Open http://localhost:5173

🧠 Core Logic Overview

🔸 Authentication

Managed using Pinia (useAuthStore.js).

Session stored in localStorage under key ticketapp_session.

Actions:

signup → creates user, saves session.

login → authenticates user, saves session.

logout → clears session.

Getter user gives current logged-in user, isAuthenticated checks login state.

🔸 Tickets Management

CRUD functions handled by Pinia store (useTicketStore.js).

Tickets stored in localStorage under key ticketapp_tickets.

Pages:

Ticket.vue → List all tickets + Delete

TicketEdit.vue → Create or edit tickets

Dashboard.vue → Displays ticket stats

🔸 Navigation & Sidebar

SiteNav.vue for desktop navigation.

Sidebar.vue for mobile collapsible menu.

Uses useAppStore.js for sidebar toggle state.

🔸 Protected Routes

Defined in router/index.js.

Routes with meta.requiresAuth redirect unauthenticated users to /auth/login.

🧰 Dependencies
"dependencies": {
"@kalimahapps/vue-icons": "^1.9.5",
"pinia": "^3.0.3",
"uuid": "^13.0.0",
"vue": "^3.5.22",
"vue-router": "^4.6.3"
},
"devDependencies": {
"@vitejs/plugin-vue": "^6.0.1",
"vite": "^7.1.7"
}

🧑‍💻 How It Works

Users sign up or log in — session saved in localStorage.
Once authenticated, they can:

View Dashboard stats.
Manage tickets (create, edit, delete).
Ticket data persisted in localStorage via useTicketStore.
Pinia keeps session and ticket state reactive across all components.

🧪 Testing Notes

Forms and buttons have data-testid attributes for integration testing.
You can write tests with Vitest or Jest (optional).
