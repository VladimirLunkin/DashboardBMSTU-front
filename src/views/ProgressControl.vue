<template>
  <div>
    <event-info v-model="eventInfo" />
    <table>
      <caption>
        <h1>Контроль успеваемости</h1>
      </caption>
      <tr>
        <td colspan="20">
          <select v-model="selectedCourse" class="table__select">
            <option
              v-for="course in getCourses"
              :value="course.id"
              :key="course.id"
            >
              {{ course.course_name }}
            </option>
          </select>
          <select v-model="selectedGroup" class="table__select">
            <option
              v-for="group in getGroups"
              :value="group.groupId"
              :key="group.groupId"
            >
              {{ group.groupCode }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Студент</th>
        <template v-for="event in getEventNames" :key="event.eventId">
          <th>{{ event.eventName }}</th>
        </template>
      </tr>
      <tr v-for="student in getStudents" :key="student.studentId">
        <td>{{ convertToShortName(student) }}</td>
        <template
          v-for="event in getEvents(student.studentId)"
          :key="event.eventId"
        >
          <td
            @click="OpenEventInfo(student.studentId, event.eventId)"
            class="event"
          >
            <img :src="getEventIcon(event.status)" class="event__status-icon" />
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import EventInfo from "@/components/EventInfoSupervisor";
import { mapGetters } from "vuex";

export default {
  name: "ProgressControlView",
  data() {
    return {
      eventInfo: {
        isModalVisible: false,
        studentId: 0,
        eventId: 0,
      },
      selectedCourse: this.$store.getters.getCurrentCourseId,
      selectedGroup: this.$store.getters.getCurrentGroupId,
    };
  },
  components: { EventInfo },
  computed: {
    ...mapGetters({
      getStudents: "getStudents",
      getEventNames: "getSupervisorEventTitle",
      getSupervisorEvents: "getSupervisorEvents",
      getCourses: "getCourses",
      getGroups: "getGroups",
    }),
  },
  methods: {
    getEvents(studentId) {
      return this.getSupervisorEvents(studentId);
    },
    getEventIcon(status) {
      if (status === 2) {
        status = "2.1";
      }
      if (status === 3) {
        status = "3.1";
      }
      return require(`@/assets/icons/status_${status}.svg`);
    },
    OpenEventInfo(studentId, eventId) {
      this.eventInfo = { studentId, eventId };
      this.eventInfo.isModalVisible = true;
    },
    convertToShortName(student) {
      return (
        student.lastName +
        " " +
        student.firstName[0] +
        ". " +
        student.middleName[0] +
        "."
      );
    },
  },
  watch: {
    selectedGroup() {
      this.$store.commit("setSupervisorCurrentGroup", this.selectedGroup);
      setTimeout(this.$store.dispatch("GetSupervisorTable"), 1000);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

caption {
  margin: 24px 0 0;
  min-width: 550px;
}

th,
td {
  padding: 3px 18px;
}

td {
  cursor: pointer;
}

.event__status-icon {
  width: 20px;
  margin: auto;
}

.table__select {
  border-radius: $r-2;
  padding: 3px 6px;
  margin: 12px;
}
</style>
