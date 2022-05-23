export default {
  state: {
    eventsCommon: [
      {
        id: 0,
        // courseId: 0, TODO ???
        eventName: "ЛР 1",
        eventDate: "2022-05-23",
        deadline: "2022-05-23",
        description:
          "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
      },
      {
        id: 1,
        // courseId: 0, TODO ???
        eventName: "ЛР 2",
        eventDate: "2022-05-23",
        deadline: "2022-05-23",
        description:
          "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
      },
      {
        id: 2,
        // courseId: 0, TODO ???
        eventName: "ЛР 3",
        eventDate: "2022-05-23",
        deadline: "2022-05-23",
        description:
          "Установка операционной системы Ubuntu. Настройка прав доступа различным категориям пользователей.",
      },
    ],
    events: {
      // ключ studentId, значене - список его евнтов на курсе
      0: [
        {
          eventId: 0,
          uploadedFiles: ["скриншоты.pdf"],
          status: 6,
        },
        {
          eventId: 1,
          uploadedFiles: ["скриншоты.pdf"],
          status: 5,
        },
        {
          eventId: 2,
          uploadedFiles: ["скриншоты.pdf"],
          status: 4,
        },
      ],
      1: [
        {
          eventId: 0,
          uploadedFiles: ["скриншоты.pdf"],
          status: 3,
        },
        {
          eventId: 1,
          uploadedFiles: ["скриншоты.pdf"],
          status: 2,
        },
        {
          eventId: 2,
          uploadedFiles: ["скриншоты.pdf"],
          status: 1,
        },
      ],
      2: [
        {
          eventId: 0,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
        {
          eventId: 1,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
        {
          eventId: 2,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
      ],
      3: [
        {
          eventId: 0,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
        {
          eventId: 1,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
        {
          eventId: 2,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
      ],
      4: [
        {
          eventId: 0,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
        {
          eventId: 1,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
        {
          eventId: 2,
          uploadedFiles: ["скриншоты.pdf"],
          status: 0,
        },
      ],
    },
  },
  getters: {
    getSupervisorEventTitle(state) {
      return state.eventsCommon;
    },
    getSupervisorEvents: (state) => (studentId) => {
      return state.events[studentId];
    },
    getSupervisorEvent: (state) => (studentId, eventId) => {
      let eventCommon = {};
      let i = 0;
      while (i < state.eventsCommon.length) {
        if (state.eventsCommon[i].id === eventId) {
          eventCommon = state.eventsCommon[i];
          break;
        }
        i++;
      }

      let event = {};
      i = 0;
      while (i < state.events[studentId].length) {
        if (state.events[studentId][i].eventId === eventId) {
          event = state.events[studentId][i];
          break;
        }
        i++;
      }

      return {
        eventId: eventId,
        eventDate: eventCommon.eventDate,
        deadline: eventCommon.deadline,
        status: event.status,
        eventName: eventCommon.eventName,
        description: eventCommon.description,
        files: event.uploadedFiles,
        comment: event.comment,
      };
    },
  },
  mutations: {
    clearEvents(state) {
      state.events = [];
    },
  },
  action: {},
};
