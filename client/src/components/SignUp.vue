<template>
  <div class="w-88">
    <h2 class="text-xl mt-4">Create a New Account</h2>
    <form @submit.prevent="handleSubmit" class="mt-4 flex flex-col gap-4">
      <div class="form-group flex flex-col items-start gap-2">
        <label for="email" class="text-gray-300">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
          class="form-control p-2 w-full rounded bg-gray-800"
        />
      </div>

      <div class="form-group flex flex-col items-start gap-2">
        <label for="password" class="text-gray-300">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
          class="form-control p-2 w-full rounded bg-gray-800"
        />
      </div>

      <div class="form-group flex flex-col items-start gap-2">
        <label for="password_confirmation" class="text-gray-300">
          Confirm Password
        </label>
        <input
          type="password"
          id="password_confirmation"
          v-model="password_confirmation"
          placeholder="Confirm your password"
          required
          class="form-control p-2 w-full rounded bg-gray-800"
        />
      </div>

      <button type="submit" class="btn btn-primary mt-4 tb-button">
        Sign Up
      </button>
    </form>

    <div v-if="error" class="alert alert-danger mt-2">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import api from "../common/apiService";

export default {
  name: "Signup",
  setup() {
    const email = ref("");
    const password = ref("");
    const password_confirmation = ref("");
    const error = ref("");

    const authStore = useAuthStore();

    const handleSubmit = async () => {
      error.value = "";
      try {
        console.log("Making the requetst!");
        console.log(email.value);
        console.log(password.value);
        // Make a POST request to create the user
        const response = await api.post("/api/v1/users", {
          registration: {
            user: {
              email: email.value,
              password: password.value,
              password_confirmation: password_confirmation.value,
            },
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        // If successful, you can handle the response (e.g., login the user or redirect to another page)
        console.log("User created successfully:", response.data);
        authStore.login(email.value, password.value); // Log in the user after successful signup
      } catch (err) {
        console.error("Signup error:", err);
        error.value =
          "An error occurred while creating your account. Please try again.";
      }
    };

    return {
      email,
      password,
      password_confirmation,
      error,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Optional: Add your custom styles here */
</style>
