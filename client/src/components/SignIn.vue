<template>
  <form @submit.prevent="handleSignIn" class="flex flex-col gap-4 w-88 mt-4">
    <h2 class="text-xl p-2">Sign In</h2>
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      required
      class="p-2 bg-gray-800"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      required
      class="p-2 bg-gray-800"
    />
    <button type="submit" class="tb-button">Sign In</button>

    <!-- Display error message if login fails -->
    <div v-if="loginError" class="error-message">
      {{ loginError }}
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

export default {
  name: "SignIn",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const loginError = ref(""); // To track login errors

    const handleSignIn = async () => {
      try {
        // Attempt to log in the user
        await authStore.login(email.value, password.value);

        // If login is successful, navigate to the dashboard
        // You can check the response in authStore to determine success or failure
        if (authStore.token) {
          router.push("/dashboard");
          window.location.reload();
        } else {
          loginError.value = "Invalid email or password"; // If no token, it's a failed login
        }
      } catch (error) {
        console.error("Sign-in error:", error);
        loginError.value =
          "An error occurred while logging in. Please try again.";
      }
    };

    return {
      email,
      password,
      loginError, // Bind error message to template
      handleSignIn,
    };
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 14px;
}
</style>
