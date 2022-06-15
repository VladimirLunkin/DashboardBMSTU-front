<template>
  <div>
    <event-info v-model="eventInfo" />
    <table>
      <caption>
        <h1>{{ getSemester }} семестр</h1>
      </caption>
      <tr>
        <th>Дисциплина</th>
        <th :colspan="getMaxEvents">Успеваемость</th>
      </tr>
      <tr v-for="course in getTable" :key="course.courseId">
        <td>{{ course.courseName }}</td>
        <template v-for="event in getEvent(course.events)" :key="event.eventId">
          <td
            @click="OpenEventInfo(course.courseId, event.eventId)"
            class="event"
          >
            <span>{{ event.eventName }}</span>
            <img :src="getEventIcon(event.status)" class="event__status-icon" />
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EventInfo from "@/components/EventInfo";

export default {
  name: "ProgressView",
  data() {
    return {
      eventInfo: {
        isModalVisible: false,
        courseId: 0,
        eventId: 0,
      },
    };
  },
  components: { EventInfo },
  computed: {
    ...mapGetters(["getTable", "getMaxEvents", "getSemester"]),
  },
  methods: {
    getEvent(course) {
      return course;
    },
    getEventIcon(status) {
      return require(`@/assets/icons/status_${status}.svg`);
    },
    OpenEventInfo(courseId, eventId) {
      this.eventInfo = { courseId, eventId };
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
  padding: 12px;
}

td {
  cursor: pointer;
}

.event__status-icon {
  margin: auto;
}
</style>
