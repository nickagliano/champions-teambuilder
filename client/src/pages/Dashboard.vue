<template>
  <div class="w-full mt-4">
    <h1 class="mb-8">Dashboard</h1>

    <div v-if="!authStore.token"></div>
    <div v-else>
      <p>Welcome, {{ authStore.user.email }}</p>
    </div>

    <button v-if="authStore.token" @click="handleLogout" class="mt-8 tb-button">
      Logout
    </button>
  </div>
</template>

<script>
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

export default {
  name: "Dashboard",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
      authStore.logout();
      router.push("/sign-in");
    };

    return { handleLogout, authStore };
  },
};
</script>

<style scoped>
/* Add your custom styles if necessary */
</style>
