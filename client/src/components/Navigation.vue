<template>
  <div class="flex min-h-screen">
    <div class="bg-gray-800 w-18 flex flex-col shadow-lg">
      <h2 class="text-white text-2xl m-4 font-semibold">TB</h2>
      <ul class="space-y-4">
        <li v-if="authStore.token">
          <router-link
            to="/dashboard"
            class="nav text-white flex items-center hover:bg-gray-800 p-2 text-xs rounded"
          >
            <i class="fas fa-tachometer-alt mr-2"></i> Dash
          </router-link>
        </li>
        <li v-if="!authStore.token">
          <router-link
            to="/sign-in"
            class="nav text-white flex items-center hover:bg-gray-700 p-2 text-xs rounded"
          >
            <i class="fas fa-sign-in-alt mr-2"></i> Sign In
          </router-link>
        </li>
        <li v-if="!authStore.token">
          <router-link
            to="/sign-up"
            class="nav text-white flex items-center hover:bg-gray-700 p-2 text-xs rounded"
          >
            <i class="fas fa-user-plus mr-2"></i> Sign Up
          </router-link>
        </li>
        <li v-if="authStore.token">
          <button
            @click="handleLogout"
            class="nav text-white flex items-center hover:bg-gray-700 p-2 rounded text-xs cursor-pointer"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../store/auth"; // Adjust path if necessary
import { useRouter } from "vue-router";

export default {
  name: "Navigation",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
      authStore.logout();
      router.push("/sign-in"); // Navigate to the login page after logout
    };

    return {
      authStore,
      handleLogout,
    };
  },
};
</script>

<style scoped>
/* You can add custom styles if needed */
</style>
