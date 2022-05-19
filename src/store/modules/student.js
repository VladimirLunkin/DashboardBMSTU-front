export default {
  state: {
    id: 0,
    fName: "Vladimir",
    mName: "Igorevich",
    lName: "Lunkin",
    username: "",
    groupID: "",
    groupCode: "",
    courses: [],
  },
  getters: {
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
  },
  mutations: {},
  actions: {},
};
