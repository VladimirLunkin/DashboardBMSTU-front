import api from "@/api";

export default {
  state: {
    students: [],
  },
  getters: {
    getStudents(state) {
      return state.students;
    },
    getShortStudent: (state) => (studentId) => {
      let i = 0;
      while (i < state.students.length) {
        if (state.students[i].studentId === studentId) {
          const student = state.students[i];
          return (
            student.lastName +
            " " +
            student.firstName[0] +
            ". " +
            student.middleName[0] +
            "."
          );
        }
        i++;
      }
      return "";
    },
  },
  mutations: {
    setSupervisorStudents(state, students) {
      state.students = students.sort(function (a, b) {
        if (a.lastName > b.lastName) {
          return 1;
        }
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.middleName > b.middleName) {
          return 1;
        }
        if (a.middleName < b.middleName) {
          return -1;
        }
        return 0;
      });
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
