<template>
  <div class="app-container">
    <SiteNav />
    <Sidebar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import SiteNav from './components/SiteNav.vue';
import Footer from './components/Footer.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<style>
.app-container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
