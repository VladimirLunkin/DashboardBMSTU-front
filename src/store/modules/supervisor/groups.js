export default {
  state: {
    groups: [
      {
        groupId: 0,
        groupCode: "ИУ5-75Б",
        students: [
          {
            id: 0,
            fName: "0fName",
            mName: "0mName",
            lName: "0lName",
          },
          {
            id: 1,
            fName: "1fName",
            mName: "1mName",
            lName: "1lName",
          },
          {
            id: 2,
            fName: "2fName",
            mName: "mName",
            lName: "lName",
          },
          {
            id: 3,
            fName: "3fName",
            mName: "mName",
            lName: "lName",
          },
          {
            id: 4,
            fName: "4fName",
            mName: "mName",
            lName: "lName",
          },
        ],
      },
      {
        groupId: 1,
        groupCode: "ИУ5-85Б",
        students: [
          {
            id: 0,
            fName: "0fName",
            mName: "0mName",
            lName: "0lName",
          },
          {
            id: 1,
            fName: "1fName",
            mName: "1mName",
            lName: "1lName",
          },
          {
            id: 2,
            fName: "2fName",
            mName: "mName",
            lName: "lName",
          },
          {
            id: 3,
            fName: "3fName",
            mName: "mName",
            lName: "lName",
          },
          {
            id: 4,
            fName: "4fName",
            mName: "mName",
            lName: "lName",
          },
        ],
      },
    ],
    currentGroupId: 0,
  },
  getters: {
    getCurrentGroupId(state) {
      return state.currentGroupId;
    },
    getGroups(state) {
      return state.groups;
    },
    getSupervisorGroup(state) {
      let i = 0;
      while (i < state.groups.length) {
        if (state.groups[i].groupId === state.currentGroupId) {
          return state.groups[i].students;
        }
        i++;
      }

      return [];
    },
  },
  mutations: {
    setSupervisorCurrentGroup(state, groupId) {
      state.currentGroupId = groupId;
    },
    setSupervisorGroups(state, groups) {
      state.groups = groups;
      if (groups.length > 0) {
        state.currentGroupId = groups[0].groupId;
      }
    },
    clearGroups(state) {
      state.groups = [];
      state.currentGroupId = 0;
    },
  },
  actions: {},
};
