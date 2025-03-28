import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";

const Dashboard = () => import("../pages/Dashboard.vue");
const SignIn = () => import("../components/SignIn.vue");
const SignUp = () => import("../components/SignUp.vue");

export const routes = [
  {
    path: "/",
    name: "Dashboard",
    meta: {
      title: "Dashboard",
      breadcrumb: "Dashboard",
    },
    component: Dashboard,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      title: "Dashboard",
      breadcrumb: "Dashboard",
    },
    component: Dashboard,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    meta: {
      title: "Sign In",
      breadcrumb: "Sign In",
      publicRoute: true, // Make this route accessible without authentication
    },
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    meta: {
      title: "Sign Up",
      breadcrumb: "Sign Up",
      publicRoute: true, // Make this route accessible without authentication
    },
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.path === from.path) {
      return;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  let isAuthenticated = authStore.token;

  if (to.meta.publicRoute) {
    if (isAuthenticated) {
      next("/dashboard"); // Already logged in, redirect to dashboard
    } else {
      next(); // Allow access to public routes
    }
    return;
  }

  if (!isAuthenticated) {
    window.localStorage.setItem("previousSessionPath", to.fullPath);
    next("/sign-in");
    return;
  }

  next();
});

router.afterEach((to) => {
  document.title = `Teambuilder | ${to.meta.title || "Default Title"}`;
});

export default router;
