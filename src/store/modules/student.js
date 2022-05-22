import {stat} from "@babel/core/lib/gensync-utils/fs";

export default {
  state: {
    id: 0,
    fName: "Vladimir",
    mName: "Igorevich",
    lName: "Lunkin",
    username: "",
    groupID: "",
    groupCode: "ИУ5-35Б",
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
    getCourse(state) {
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
      state.fName = student.fName;
      state.mName = student.mName;
      state.lName = student.lName;
      state.username = student.username;
      state.groupID = student.groupID;
      state.groupCode = student.groupCode;
    },
    clearStudent(state) {
      state.id = 0;
      state.fName = "";
      state.mName = "";
      state.lName = "";
      state.username = "";
      state.groupID = "";
      state.groupCode = "";
      state.courses = [];
    },
  },
  actions: {},
};
