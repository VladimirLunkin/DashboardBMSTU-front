<template>
  <div>
    <event-info v-model="eventInfo" />
    <table>
      <caption>
        <h1>Контроль успеваемости</h1>
      </caption>
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
  data() {
    return {
      eventInfo: {
        isModalVisible: false,
        studentId: 0,
        eventId: 0,
      },
    };
  },
  components: { EventInfo },
  computed: {
    ...mapGetters({
      getStudents: "getShortStudents",
      getEventNames: "getSupervisorEventTitle",
      getSupervisorEvents: "getSupervisorEvents",
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
</style>
