export default {
  state: {
    courses: [
      {
        id: 4,
        course_name: "Эксплуатация АСОИУ",
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
    currentCourseId: 4,
  },
  getters: {
    getCurrentCourseId(state) {
      return state.currentCourseId;
    },
    getCourses(state) {
      return state.courses;
    },
  },
  mutations: {
    setSupervisorCourses(state, courses) {
      state.courses = courses;
      if (courses.length > 0) {
        state.currentCourseId = courses[0].id;
      }
    },
    clearSupervisorCourses(state) {
      state.courses = [];
      state.currentCourseId = 0;
    },
  },
  actions: {},
};
