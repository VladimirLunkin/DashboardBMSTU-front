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
  },
};
