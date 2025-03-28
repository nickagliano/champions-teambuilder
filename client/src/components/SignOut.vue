<template>
  <button @click="handleSignOut" class="tb-button">Sign Out</button>
</template>

<script>
import { useAuthStore } from "../store/auth";

export default {
  methods: {
    handleSignOut() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push("/sign-in"); // Redirect to the login page or home after sign out
    },
  },
};
</script>
