import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import Progress from "@/views/Progress";
import ProgressControl from "@/views/ProgressControl";
import store from "@/store/index";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters.getLoggedIn) {
        next({ name: "profile" });
      } else {
        store
          .dispatch("GetUser")
          .then(() => {
            store
              .dispatch("Update" + store.getters.getRole)
              .then(() => {
                next({ name: "dashboard" });
              })
              .catch((err) => {
                console.log("Update" + store.getters.getRole);
                console.log(err);
                next();
              });
          })
          .catch((err) => {
            console.log("GetUser");
            console.log(err);
            next();
          });
      }
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!store.getters.getLoggedIn) {
        next({ name: "login" });
      } else {
        store
          .dispatch("GetUser")
          .then(() => {
            store
              .dispatch("Update" + store.getters.getRole)
              .then(next)
              .catch((err) => {
                console.log("Update" + store.getters.getRole);
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("GetUser");
            console.log(err);
          });
      }
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: "",
    beforeEnter: (to, from, next) => {
      if (!store.getters.getLoggedIn) {
        next({ name: "login" });
      } else {
        if (store.getters.isSupervisor) {
          next({ name: "control" });
        } else if (store.getters.isStudent) {
          next({ name: "progress" });
        }
      }
    },
  },
  {
    path: "/progress",
    name: "progress",
    component: Progress,
    beforeEnter: (to, from, next) => {
      if (!store.getters.getLoggedIn) {
        next({ name: "login" });
      } else if (!store.getters.getPassStatus) {
        next({ name: "profile" });
      } else {
        store
          .dispatch("UpdateCoursesTable")
          .then(next)
          .catch((err) => {
            console.log("UpdateCoursesTable");
            console.log(err);
          });
      }
    },
  },
  {
    path: "/control",
    name: "control",
    component: ProgressControl,
    beforeEnter: (to, from, next) => {
      if (!store.getters.getLoggedIn) {
        next({ name: "login" });
      } else if (!store.getters.getPassStatus) {
        next({ name: "profile" });
      } else {
        store
          .dispatch("GetSupervisorTable")
          .then(next)
          .catch((err) => {
            console.log("UpdateCoursesTable");
            console.log(err);
          });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
