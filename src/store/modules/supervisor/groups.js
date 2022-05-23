export default {
  state: {
    groups: [
      {
        id: 0,
        code: "ИУ5-75Б",
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
        id: 1,
        code: "ИУ5-85Б",
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
    currGroup: 1,
  },
  getters: {
    getShortStudents(state) {
      const i = state.currGroup;
      if (!state.groups.length || state.groups.length < i || i < 0) {
        return [];
      }
      return state.groups[i].students.map((st) => {
        if (st.fName.length < 1 || st.mName.length < 1 || st.lName.length < 1) {
          return {};
        }
        return {
          id: st.id,
          shortName: st.lName + " " + st.fName[0] + ". " + st.mName[0] + ".",
        };
      });
    },
    getShortStudent: (state) => (studentId) => {
      const curr = state.currGroup;
      if (!state.groups.length || state.groups.length < curr || curr < 0) {
        return "";
      }
      const group = state.groups[curr].students;

      let i = 0;
      while (i < group.length) {
        if (group[i].id === studentId) {
          return (
            group[i].lName +
            " " +
            group[i].fName[0] +
            ". " +
            group[i].mName[0] +
            "."
          );
        }
        i++;
      }

      return "";
    },
    // getTable(state) {
    //   return state.courses;
    // },
    // getMaxEvents(state) {
    //   let maxLength = 0;
    //   state.courses.forEach((v) => {
    //     if (v.events.length > maxLength) {
    //       maxLength = v.events.length;
    //     }
    //   });
    //
    //   return maxLength;
    // },
    // getCourseName: (state) => (courseId) => {
    //   return state.courses[courseId].courseName;
    // },
  },
  mutations: {
    // setCourses(state, courses) {
    //   state.courses = courses;
    // },
    clearGroups(state) {
      state.groups = [];
    },
  },
  actions: {},
};
