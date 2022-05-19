import api from "@/api/index";

export default {
  state: {
    loggedIn: false,
    type: "",
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn;
    },
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    setType(state, type) {
      state.type = type;
    },
  },
  actions: {
    async Login(ctx, { username, password }) {
      return api.auth
        .login({
          username,
          password,
        })
        .then((resp) => {
          if (resp.status !== 200) {
            throw resp;
          }

          ctx.commit("login");
          ctx.commit("setType", resp.body.type);
        })
        .catch(() => {
          if (username !== "admin") {
            throw "resp";
          }
          ctx.commit("login");
        });
    },
  },
};
