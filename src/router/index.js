import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import Progress from "@/views/Progress";
import ProgressControl from "@/views/ProgressControl";

const routes = [
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
  {
    path: "/control",
    name: "control",
    component: ProgressControl,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
