export default {
  state: {
    id: 10,
    fName: "Vladimir",
    mName: "Igorevich",
    lName: "Lunkin",
    username: "",
  },
  getters: {
    fullNameSupervisor(state) {
      return state.fName + " " + state.mName + " " + state.lName;
    },
    shortNameSupervisor(state) {
      if (
        state.fName.length < 1 ||
        state.mName.length < 1 ||
        state.lName.length < 1
      ) {
        return "";
      }
      return state.lName + " " + state.fName[0] + ". " + state.mName[0] + ".";
    },
  },
  mutations: {
    setSupervisor(state, supervisor) {
      state.id = supervisor.id;
      state.fName = supervisor.fName;
      state.mName = supervisor.mName;
      state.lName = supervisor.lName;
      state.username = supervisor.username;
    },
    clearSupervisor(state) {
      state.id = 0;
      state.fName = "";
      state.mName = "";
      state.lName = "";
      state.username = "";
    },
  },
  actions: {},
};
