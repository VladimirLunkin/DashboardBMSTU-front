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
    // getShortStudents(state) {
    //   const i = state.currGroup;
    //   if (!state.groups.length || state.groups.length < i || i < 0) {
    //     return [];
    //   }
    //   return state.groups[i].students.map((st) => {
    //     if (st.fName.length < 1 || st.mName.length < 1 || st.lName.length < 1) {
    //       return {};
    //     }
    //     return {
    //       id: st.id,
    //       shortName: st.lName + " " + st.fName[0] + ". " + st.mName[0] + ".",
    //     };
    //   });
    // },
    // getShortStudent: (state) => (studentId) => {
    //   const curr = state.currGroup;
    //   if (!state.groups.length || state.groups.length < curr || curr < 0) {
    //     return "";
    //   }
    //   const group = state.groups[curr].students;
    //
    //   let i = 0;
    //   while (i < group.length) {
    //     if (group[i].id === studentId) {
    //       return (
    //         group[i].lName +
    //         " " +
    //         group[i].fName[0] +
    //         ". " +
    //         group[i].mName[0] +
    //         "."
    //       );
    //     }
    //     i++;
    //   }
    //
    //   return "";
    // },
  },
  mutations: {
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
