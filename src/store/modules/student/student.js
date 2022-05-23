export default {
  state: {
    id: 0,
    groupID: "",
    groupCode: "ИУ5-35Б",
  },
  getters: {
    getCourseNumber(state) {
      let group = state.groupCode;

      if (!group.length || group.length < 1) {
        return "";
      }

      let i = 0;
      while (i < group.length - 1) {
        if (group[i] === "-") {
          return ((parseInt(group[i + 1], 10) + 1) / 2) | 0;
        }
        i++;
      }

      return "a";
    },
    getGroupCode(state) {
      return state.groupCode;
    },
  },
  mutations: {
    setStudent(state, student) {
      state.id = student.id;
      state.groupID = student.groupID;
      state.groupCode = student.groupCode;
    },
    clearStudent(state) {
      state.id = 0;
      state.groupID = "";
      state.groupCode = "";
    },
  },
  actions: {},
};
