import api from "@/api";

export default {
  state: {
    id: 10,
  },
  getters: {},
  mutations: {
    setSupervisor(state, supervisor) {
      state.id = supervisor.id;
    },
    clearSupervisor(state) {
      state.id = 0;
    },
  },
  actions: {
    async UpdateSupervisor(ctx) {
      return api.supervisor.getSupervisor().then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setSupervisor", {
          id: resp.data.id,
        });
      });
    },
    async GetSupervisorTable(ctx) {
      await api.supervisor.getCourses().then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setSupervisorCourses", resp.data);
      });

      const courseId = this.getters.getCurrentCourseId;
      await api.supervisor.getGroupsOnCourse(courseId).then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setSupervisorGroups", resp.data);
      });

      const groupId = this.getters.getCurrentGroupId;
      await api.supervisor.getStudentsFromGroup(groupId).then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setSupervisorStudents", resp.data);
      });

      await api.supervisor.getEvents(courseId).then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setSupervisorEventsCommon", resp.data);
      });

      const students = this.getters.getStudents;

      for (let i = 0; i < students.length; i++) {
        await api.supervisor
          .getStudentEvents(students[i].studentId, courseId)
          .then((resp) => {
            if (resp.status !== 200) {
              throw resp;
            }

            ctx.commit("setSupervisorStudentEvents", {
              studentId: students[i].studentId,
              events: resp.data,
            });
          });
      }
    },
  },
};
