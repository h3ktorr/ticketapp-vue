<template>
  <main class="hero container">
    <section class="hero-left">
      <h1>TicketApp</h1>
      <p className="lead">Manage support tickets smoothly across teams — built with love.</p>
      <div class="cta">
        <router-link to="/auth/signup" class="btn primary">Get Started</router-link>
        <router-link to="/auth/login" class="btn primary">Login</router-link>
      </div>
    </section>
    <aside className="hero-right">
        <div className="decor-circle circle1" aria-hidden></div>
        <div className="decor-circle circle2" aria-hidden></div>
      </aside>
    <img src="../assets/wave.svg" class="hero-wave" alt="decorative wave" />
  </main>
</template>

