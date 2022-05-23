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
    clearSupervisorCourses(state) {
      state.courses = [];
    },
  },
  actions: {},
};
