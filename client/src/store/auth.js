import { defineStore } from "pinia";
import axios from "axios";

import { BASE_URL } from "../common/apiService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || "",
  }),

  actions: {
    async login(email, password) {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/v1/auth/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { token, user } = res.data;

        // Save the token in localStorage
        localStorage.setItem("token", token);

        // Optionally, save the user data in localStorage as well
        localStorage.setItem("user", JSON.stringify(user));

        // Store user data and token in Pinia store
        this.token = token;
        this.user = user;
      } catch (error) {
        console.error("Login error:", error);
        this.error = "Invalid credentials. Please try again.";
      }
    },
    logout() {
      this.token = "";
      this.user = null;

      // Remove token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
