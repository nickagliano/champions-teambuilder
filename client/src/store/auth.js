import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || "",
  }),
  actions: {
    async login(email, password) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/users/sign_in",
          {
            user: { email, password },
          }
        );
        this.token = res.headers.authorization;
        this.user = res.data;
        localStorage.setItem("token", this.token);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
