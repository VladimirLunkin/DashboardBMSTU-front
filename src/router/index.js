import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import Progress from "@/views/Progress";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/progress",
    name: "progress",
    component: Progress,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
