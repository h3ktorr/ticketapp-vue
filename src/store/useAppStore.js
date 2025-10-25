import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const isSidebarOpen = ref(false);

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  return { isSidebarOpen, toggleSidebar };
});
