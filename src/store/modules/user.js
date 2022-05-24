import api from "@/api/index";

function Clear(ctx) {
  ctx.commit("logout");
  ctx.commit("clearCourses");
  ctx.commit("clearStudent");
  ctx.commit("clearSupervisorCourses");
  ctx.commit("clearEvents");
  ctx.commit("clearGroups");
  ctx.commit("clearSupervisor");
}

export default {
  state: {
    loggedIn: false,
    fName: "Vladimir",
    mName: "Igorevich",
    lName: "Lunkin",
    username: "",
    role: "",
    pass_status: false,
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn;
    },
    fullName(state) {
      return state.fName + " " + state.mName + " " + state.lName;
    },
    shortName(state) {
      if (
        state.fName.length < 1 ||
        state.mName.length < 1 ||
        state.lName.length < 1
      ) {
        return "";
      }
      return state.lName + " " + state.fName[0] + ". " + state.mName[0] + ".";
    },
    getRole(state) {
      return state.role;
    },
    isSupervisor(state) {
      return state.role === "Supervisor";
    },
    isStudent(state) {
      return state.role === "Student";
    },
    getPassStatus(state) {
      return state.pass_status;
    },
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
      state.fName = "";
      state.mName = "";
      state.lName = "";
      state.username = "";
      state.role = "";
      state.pass_status = false;
    },
    setUser(state, user) {
      state.fName = user.firstname;
      state.mName = user.middleName;
      state.lName = user.lastname;
      state.username = user.email;
      state.role = user.is_super ? "Supervisor" : "Student";
      state.pass_status = user.pass_status;
    },
  },
  actions: {
    async Login(ctx, { username, password }) {
      return api.auth
        .login({
          email: username,
          password: password,
        })
        .then((resp) => {
          if (resp.status !== 200) {
            throw resp;
          }

          ctx.commit("login");
          ctx.commit("setUser", resp.data);
        });
    },
    async Logout(ctx) {
      Clear(ctx);
      return api.auth.logout().then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }
      });
    },
    async ClearStores(ctx) {
      Clear(ctx);
    },
    async GetUser(ctx) {
      return api.auth.getUser().then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("login");
        ctx.commit("setUser", resp.data);
      });
    },
  },
};
