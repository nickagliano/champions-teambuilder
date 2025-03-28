import axios from "axios";

export const BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
  withXSRFToken: true,
});

export default api;
