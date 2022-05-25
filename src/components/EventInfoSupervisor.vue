<template>
  <div v-if="eventInfo.isModalVisible" class="modal" ref="modal">
    <div class="event">
      <div class="modal__header">
        <div class="modal__header-title">
          <h3 class="">{{ supShortName() }}</h3>
          <img
            :src="require('@/assets/icons/caret_right.svg')"
            class=""
            alt=""
          />
          <h3 class="">{{ eventName }}</h3>
        </div>
        <img
          @click="Close"
          :src="require('@/assets/icons/close.svg')"
          class="modal__close-icon"
          alt=""
        />
      </div>
      <div class="event__body">
        <table class="event__table">
          <tr v-for="(value, name) in eventTable" :key="name">
            <td>{{ value.name }}</td>
            <td class="event__cell">
              <img :src="value.icon" class="event__cell-icon" />
              <span>{{ value.value }}</span>
            </td>
          </tr>
        </table>
        <div class="event__description">
          <h4>Описание</h4>
          <div>{{ event.description }}</div>
        </div>
        <div v-if="isUploadFiles" class="event__upload-files">
          <h4>Загруженные файлы</h4>
          <div
            v-for="(file, index) in event.files"
            class="event__files-list"
            :key="index"
          >
            <span>{{ (index + 1).toString() + "." }}</span>
            <a :href="downloadFile(index)" class="event__file">{{ file }}</a>
          </div>
        </div>
        <div v-if="isComment" class="event__description">
          <h4>Комментарий</h4>
          <div>{{ event.comment }}</div>
        </div>
        <i-button
          v-if="isOKButton"
          @click="OKButton"
          icon="check_all"
          class="event__ok-button"
          >Принять</i-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IButton from "@/components/common/IButton";

export default {
  // name: "EventInfo",
  props: {
    modelValue: Object,
  },
  components: { IButton },
  data() {
    return {
      event: {},
    };
  },
  emits: ["update:modelValue"],
  computed: {
    ...mapGetters({
      getEvent: "getSupervisorEvent",
    }),
    eventInfo: {
      get() {
        return this.modelValue;
      },
      set(eventInfo) {
        this.$emit("update:modelValue", eventInfo);
      },
    },
    getEventStatus() {
      const statusName = [
        "Не выдано",
        "Выдано",
        "На проверке",
        "Требуются правки",
        "Выполнено",
        "Защищено",
        "Просрочено",
      ];
      return statusName[this.event.status];
    },
    getIconStatus() {
      let status = this.event.status;
      if (status === 2) {
        status = "2.1";
      }
      if (status === 3) {
        status = "3.1";
      }
      return require(`@/assets/icons/status_${status}.svg`);
    },
    getDeadlineDays() {
      return 5; // TODO
    },
    eventTable() {
      return [
        {
          name: "Статус:",
          icon: this.getIconStatus,
          value: this.getEventStatus,
        },
        {
          name: "Выдано в работу:",
          icon: require("@/assets/icons/calendar.svg"),
          value: this.event.eventDate,
        },
        {
          name: "Дедлайн:",
          icon: require("@/assets/icons/calendar_event.svg"),
          value: this.event.deadline,
        },
        {
          name: "Дней до дедлайна:",
          icon: require("@/assets/icons/hourglass_empty.svg"),
          value: this.getDeadlineDays,
        },
      ];
    },
    eventName() {
      return this.event.eventName;
    },
    isUploadFiles() {
      console.log(this.event);
      console.log(this.event.files);
      // console.log(this.event.files.length);
      if (!this.event.files || !this.event.files.length) {
        return false;
      }
      return this.event.files.length > 0;
    },
    isComment() {
      return this.event.comment && this.event.comment.length > 0;
    },
    isOKButton() {
      return this.event.status === 2;
    },
  },
  methods: {
    supShortName() {
      return this.$store.getters.getShortStudent(this.eventInfo.studentId);
    },
    downloadFile(index) {
      console.log("open file: ", this.event.files[index]);
      if (!this.event.files[index]) {
        return;
      }
      // return `http://localhost:8001/api/v1/supervisor/student/${this.eventInfo.studentId}/file/${this.event.files[index]}`;
      return `https://bmstu.site/api/v1/supervisor/student/${this.eventInfo.studentId}/file/${this.event.files[index]}`;
    },
    Close() {
      this.eventInfo.isModalVisible = false;
    },
    OKButton() {
      console.log("ok");
    },
  },
  watch: {
    eventInfo() {
      this.event = this.getEvent(
        this.eventInfo.studentId,
        this.eventInfo.eventId
      );
    },
  },
  mounted() {
    let vm = this;
    document.addEventListener("click", function (e) {
      if (e.target === vm.$refs["modal"]) {
        vm.Close();
      }
    });
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(64, 64, 64, 0.4);
}

.event {
  min-width: 400px;
  max-width: 600px;
  padding: 12px;

  background: $color-white;
  border-radius: $r-3;
}

.modal__header {
  display: flex;
  flex-direction: row;
}

.modal__header-title {
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: row;
}

.modal__close-icon {
  cursor: pointer;
}

.event__table,
.event__description,
.event__upload-files {
  margin: 20px 12px;
  text-align: left;
}

td {
  padding: 6px 12px 6px 0;
}

.event__cell {
  display: flex;
  flex-direction: row;
}

.event__cell-icon,
.event__delete-icon {
  width: 18px;
  margin-right: 6px;
  cursor: pointer;
}

.event__ok-button {
  margin-bottom: 20px;
  background: $color-green;
}

.event__ok-button:active {
  background: $color-light-green;
}

.event__files-list {
  display: flex;
  flex-direction: row;
  margin-top: 6px;
}

.event__file {
  margin-left: 6px;
  flex: 1;
}
</style>
