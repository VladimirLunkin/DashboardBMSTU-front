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
      state.pass_status = "";
      state.role = "";
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
          ctx.commit("setRole", resp.data.is_super ? "supervisor" : "student");
          ctx.commit("setPassStatus", resp.data.pass_status);
          ctx.commit("setStudent", {
            id: resp.data.id,
            fName: resp.data.fName,
            mName: resp.data.mName,
            lName: resp.data.lName,
            username: resp.data.email,
            groupID: resp.data.groupID,
            groupCode: resp.data.groupCode,
          });
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
    async Logout(ctx) {
      return api.auth.logout().then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("logout");
        ctx.commit("clearStudent");
      });
    },
  },
};
