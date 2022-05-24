import api from "@/api";

export default {
  state: {
    students: [],
  },
  getters: {
    getStudents(state) {
      return state.students;
    },
  },
  mutations: {
    setSupervisorStudents(state, students) {
      state.students = students;
    },
    clearSupervisorStudents(state) {
      state.students = [];
    },
  },
  actions: {
    async UpdateCurrentStudents(ctx, groupId) {
      return api.supervisor.getStudentsFromGroup(groupId).then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setSupervisorStudents", resp.data);
      });
    },
  },
};
