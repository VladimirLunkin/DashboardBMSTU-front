<template>
  <div class="home">
    <event-info :event-info="eventInfo"></event-info>
  </div>
</template>

<script>
import EventInfo from "@/components/EventInfo";

export default {
  name: "HomeView",
  data() {
    return {
      eventInfo: {
        owner: "Эксплуатация АСОИУ",
        name: "Лаб 3",
      },
    };
  },
  components: {
    EventInfo,
  },
};
</script>
