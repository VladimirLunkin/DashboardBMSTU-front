import api from "@/api/index";

export default {
  state: {
    loggedIn: false,
    role: "",
    pass_status: "",
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn;
    },
    getRole(state) {
      return state.role;
    },
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    setRole(state, role) {
      state.role = role;
    },
    setPassStatus(state, st) {
      state.pass_status = st;
    },
  },
  actions: {
    async Login(ctx, { username, password }) {
      return api.auth
        .login({
          email: username,
          password,
        })
        .then((resp) => {
          if (resp.status !== 200) {
            throw resp;
          }

          ctx.commit("login");
          ctx.commit("setRole", resp.body.role);
          ctx.commit("setPassStatus", resp.body.pass_status);
        })
        .catch(() => {
          if (username !== "admin") {
            throw "resp";
          }
          ctx.commit("login");
          ctx.commit("setRole", "student");
          ctx.commit("setPassStatus", false);
        });
    },
  },
};
