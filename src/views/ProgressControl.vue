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
        <template v-for="event in getEventNames" :key="event.id">
          <th>{{ event.eventName }}</th>
        </template>
      </tr>
      <tr v-for="student in getStudents" :key="student.id">
        <td>{{ student.shortName }}</td>
        <template v-for="event in getEvents(student.id)" :key="event.eventId">
          <td @click="OpenEventInfo(student.id, event.eventId)" class="event">
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
  async created() {
    await this.$store.dispatch("GetSupervisorTable").catch((resp) => {
      alert("запрос GetSupervisorTable");
      console.log(resp);
    });
  },
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
      getStudents: "getShortStudents",
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
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

caption {
  margin-bottom: 24px;
}

th,
td {
  padding: 6px 18px;
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
