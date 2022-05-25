import api from "@/api";

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
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
            files: ["Экспл_АСОИУ_Отчет_по_Лаб.1.docx", "скриншоты.pdf"],
            comment:
              "Обновите титульник. В 5 пункте ошибка в расчетах. Перестроить график из 7 пункта.",
          },
          {
            eventId: 1,
            eventDate: 1,
            deadline: 1,
            status: 4,
            eventName: "Лаб 2",
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
            files: ["Экспл_АСОИУ_Отчет_по_Лаб.2.docx"],
          },
          {
            eventId: 2,
            eventDate: 1,
            deadline: 1,
            status: 3,
            eventName: "РК 1",
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
            files: [],
          },
          {
            eventId: 3,
            eventDate: 1,
            deadline: 1,
            status: 2,
            eventName: "Лаб 3",
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
            files: [],
          },
          {
            eventId: 4,
            eventDate: 1,
            deadline: 1,
            status: 6,
            eventName: "Лаб 4",
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
            files: ["скриншоты.pdf"],
            comment:
              "Обновите титульник. В 5 пункте ошибка в расчетах. Перестроить график из 7 пункта.",
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
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
          },
          {
            eventId: 1,
            eventDate: 1,
            deadline: 1,
            status: 4,
            eventName: "Лаб 2",
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
          },
          {
            eventId: 2,
            eventDate: 1,
            deadline: 1,
            status: 3,
            eventName: "Лаб 3",
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
          },
          {
            eventId: 3,
            eventDate: 1,
            deadline: 1,
            status: 1,
            eventName: "ДЗ",
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
          },
          {
            eventId: 4,
            eventDate: 1,
            deadline: 1,
            status: 0,
            eventName: "Лаб 4",
            description:
              "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
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
    getEvent: (state) => (courseId, eventId) => {
      let events = [];
      let i = 0;
      while (i < state.courses.length) {
        if (state.courses[i].courseId === courseId) {
          events = state.courses[i].events;
          break;
        }
        i++;
      }

      let event = [];
      i = 0;
      while (i < events.length) {
        if (events[i].eventId === eventId) {
          event = events[i];
          break;
        }
        i++;
      }
      return event;
    },
    getEventName: (state) => (courseId, eventId) => {
      return state.courses[courseId].events[eventId].eventName;
    },
    getCourseName: (state) => (courseId) => {
      let courseName = "";
      let i = 0;
      while (i < state.courses.length) {
        if (state.courses[i].courseId === courseId) {
          courseName = state.courses[i].courseName;
          break;
        }
        i++;
      }
      return courseName;
    },
  },
  mutations: {
    setCourses(state, courses) {
      state.courses = courses;
    },
    clearCourses(state) {
      state.courses = [];
    },
    setEventStatus(state, eventId, status) {
      let i = 0; // по курсам
      let j = 0; // по эвентам
      while (i < state.courses.length) {
        j = 0;
        while (j < state.courses[i].events.length) {
          if (state.courses[i].events[j].eventId === eventId) {
            state.courses[i].events[j].status = status;
            return;
          }
          j++;
        }
        i++;
      }
    },
  },
  actions: {
    async UpdateCoursesTable(ctx) {
      return api.student.getCoursesTable().then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }

        ctx.commit("setCourses", resp.data.courses);
      });
    },
    async UploadFile(ctx, { eventId, file }) {
      return api.student.uploadFile(eventId, file).then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }
        console.log("Ok!!!");
        return resp.data.file;
      });
    },
    async DownloadFile(ctx, fileName) {
      return api.student.downloadFile(fileName).then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }
        console.log("file download");
      });
    },
    async UpdateEventStatus(ctx, { eventId, status }) {
      return api.student.updateEventStatus(eventId, { status }).then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }
        console.log("file download");
        ctx.commit("setEventStatus", {
          eventId,
          status,
        });
      });
    },
  },
};
