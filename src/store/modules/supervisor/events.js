import api from "@/api";

export default {
  state: {
    eventsCommon: [
      {
        eventId: 0,
        eventDate: "06.12.2022",
        deadline: "06.30.2022",
        eventName: "eventCommon",
        description: "eventCommon.description",
      },
    ],
    events: {
      0: [
        {
          eventId: 0,
          status: 2,
          comment: "жопа",
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
    setSupervisorNewComment(state, { studentId, eventId, comment }) {
      let i = 0;
      while (i < state.events[studentId].length) {
        if (state.events[studentId][i].eventId === eventId) {
          state.events[studentId][i].comment = comment;
          return;
        }
        i++;
      }
    },
    setSupervisorEventStatus(state, { studentId, eventId, status }) {
      let i = 0;
      console.log(studentId, eventId, status);
      console.log(state.events);
      while (i < state.events[studentId].length) {
        if (state.events[studentId][i].eventId === eventId) {
          state.events[studentId][i].status = status;
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
    async SupervisorAddNewComment(ctx, { studentId, eventId, comment }) {
      return api.supervisor.addNewComment(eventId, { comment }).then((resp) => {
        if (resp.status !== 200) {
          throw resp;
        }
        ctx.commit("setSupervisorNewComment", {
          studentId,
          eventId,
          comment,
        });
      });
    },
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
