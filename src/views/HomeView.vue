<template>
  <div class="home">
    sedwed
    <div @click="OpenEventInfo">wsefdwed</div>
    <event-info-supervisor v-model="eventInfo"></event-info-supervisor>
  </div>
</template>

<script>
import EventInfoSupervisor from "@/components/EventInfoSupervisor";

export default {
  name: "HomeView",
  data() {
    return {
      eventInfo: {
        isModalVisible: false,
        studentId: 0,
        eventId: 0,
      },
    };
  },
  components: {
    EventInfoSupervisor,
  },
  methods: {
    OpenEventInfo() {
      this.eventInfo = { studentId: 0, eventId: 0 };
      this.eventInfo.isModalVisible = true;
    },
  },
};
</script>
