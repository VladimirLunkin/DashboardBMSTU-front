import api from "@/api";

export default {
  state: {
    courses: [
      {
        courseId: 0,
        courseName: "Эксплуатация АСОИУ",
      },
      {
        courseId: 1,
        courseName: "Беспроводные сети",
      },
      {
        courseId: 2,
        courseName: "Русский язык делового общения",
      },
    ],
  },
  getters: {},
  mutations: {
    setSupervisorCourses(state, courses) {
      state.courses = courses;
    },
    clearSupervisorCourses(state) {
      state.courses = [];
    },
  },
  actions: {
    async GetSupervisorCourses(ctx) {
      return api.supervisor.getCourses().then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setSupervisorCourses", resp.data);
      });
    },
  },
};
