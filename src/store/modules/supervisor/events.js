export default {
  state: {
    eventsCommon: [],
    events: {},
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
        if (state.eventsCommon[i].eventId === eventId) {
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
    setSupervisorEventsCommon(state, eventsCommon) {
      state.eventsCommon = eventsCommon;
    },
    setSupervisorStudentEvents(state, { studentId, events }) {
      state.events[studentId] = events;
    },
    clearEvents(state) {
      state.eventsCommon = [];
      state.events = {};
    },
  },
  action: {},
};
