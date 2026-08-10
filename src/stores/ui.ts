import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("ui", () => {
  const consultOpen = ref(false);
  const mobileMenuOpen = ref(false);

  function openConsult() {
    mobileMenuOpen.value = false;
    consultOpen.value = true;
  }

  function closeConsult() {
    consultOpen.value = false;
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false;
  }

  return {
    consultOpen,
    mobileMenuOpen,
    openConsult,
    closeConsult,
    toggleMobileMenu,
    closeMobileMenu,
  };
});
