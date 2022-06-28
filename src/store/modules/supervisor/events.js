import api from "@/api";

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
      console.log(event);
      console.log(eventCommon);

      return {
        eventId: eventId,
        eventDate: eventCommon.eventDate,
        deadline: eventCommon.deadline,
        status: event.status,
        eventName: eventCommon.eventName,
        description: eventCommon.description,
        files: event.uploadFiles,
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
    setSupervisorEventStatus(state, { studentId, eventId, status }) {
      let i = 0;
      while (i < state.events[studentId].length) {
        if (state.events[studentId][i].eventId === eventId) {
          state.events[studentId][i] = status;
          return;
        }
        i++;
      }
    },
    clearEvents(state) {
      state.eventsCommon = [];
      state.events = {};
    },
  },
  actions: {
    async SupervisorUpdateEventStatus(ctx, { studentId, eventId, status }) {
      return api.supervisor
        .updateEventStatus(eventId, { status })
        .then((resp) => {
          if (resp.status !== 200) {
            throw resp;
          }
          ctx.commit("setSupervisorEventStatus", {
            studentId,
            eventId,
            status,
          });
        });
    },
  },
};
