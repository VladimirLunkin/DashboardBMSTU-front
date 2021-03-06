import api from "@/api";

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

      return "0";
    },
    getGroupCode(state) {
      return state.groupCode;
    },
    getSemester(state) {
      let group = state.groupCode;

      if (!group.length || group.length < 1) {
        return "";
      }

      let i = 0;
      while (i < group.length - 1) {
        if (group[i] === "-") {
          return parseInt(group[i + 1], 10);
        }
        i++;
      }

      return "0";
    },
  },
  mutations: {
    setStudent(state, student) {
      state.id = student.id;
      state.groupID = student.groupID;
    },
    setGroup(state, group) {
      state.groupCode = group.groupCode;
    },
    clearStudent(state) {
      state.id = 0;
      state.groupID = "";
      state.groupCode = "";
    },
  },
  actions: {
    async UpdateStudent(ctx) {
      api.student
        .getGroup()
        .then((resp) => {
          if (resp.status !== 200) {
            throw resp;
          }

          ctx.commit("setGroup", {
            groupCode: resp.data.groupCode,
          });
        })
        .catch(() => {
          console.log("!!! запрос на группу студента не сработал !!!");
          ctx.commit("setGroup", {
            groupCode: "ИУ5-85Б",
          });
        });
      return api.student.getStudent().then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setStudent", {
          id: resp.data.id,
          groupID: resp.data.groupId,
        });
      });
    },
  },
};
