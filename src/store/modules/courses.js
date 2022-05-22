export default {
  state: {
    courses: [
      {
        courseId: 0,
        courseName: "Эксплуатация АСОИУ",
        events: [
          {
            eventId: 0,
            eventDate: 1,
            deadline: 1,
            status: 5,
            eventName: "Лаб 1",
          },
          {
            eventId: 1,
            eventDate: 1,
            deadline: 1,
            status: 4,
            eventName: "Лаб 2",
          },
          {
            eventId: 2,
            eventDate: 1,
            deadline: 1,
            status: 3,
            eventName: "РК 1",
          },
          {
            eventId: 3,
            eventDate: 1,
            deadline: 1,
            status: 2,
            eventName: "Лаб 3",
          },
        ],
      },
      {
        courseId: 1,
        courseName: "Беспроводные сети",
        events: [
          {
            eventId: 0,
            eventDate: 1,
            deadline: 1,
            status: 5,
            eventName: "Лаб 1",
          },
          {
            eventId: 1,
            eventDate: 1,
            deadline: 1,
            status: 4,
            eventName: "Лаб 2",
          },
          {
            eventId: 2,
            eventDate: 1,
            deadline: 1,
            status: 3,
            eventName: "Лаб 3",
          },
          {
            eventId: 3,
            eventDate: 1,
            deadline: 1,
            status: 1,
            eventName: "ДЗ",
          },
          {
            eventId: 4,
            eventDate: 1,
            deadline: 1,
            status: 0,
            eventName: "Лаб 4",
          },
        ],
      },
    ],
  },
  getters: {
    getTable(state) {
      return state.courses;
    },
    getMaxEvents(state) {
      let maxLength = 0;
      state.courses.forEach((v) => {
        if (v.events.length > maxLength) {
          maxLength = v.events.length;
        }
      });

      return maxLength;
    },
  },
  mutations: {
    setCourses(state, courses) {
      state.courses = courses;
    },
    clearCourses(state) {
      state.courses = [];
    },
  },
  actions: {},
};
