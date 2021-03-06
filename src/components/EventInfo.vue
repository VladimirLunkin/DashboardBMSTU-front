<template>
  <div v-if="eventInfo.isModalVisible" class="modal" ref="modal">
    <div class="event">
      <div class="modal__header">
        <div class="modal__header-title">
          <h3 class="header-title__course-name">{{ courseName }}</h3>
          <img
            :src="require('@/assets/icons/caret_right.svg')"
            class=""
            alt=""
          />
          <h3 class="header-title__event-name">{{ eventName }}</h3>
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
            <img
              @click="DeleteFile(index)"
              :src="require('@/assets/icons/delete.svg')"
              class="event__delete-icon"
              alt=""
            />
          </div>
        </div>
        <div v-if="isComment" class="event__description">
          <h4>Комментарий</h4>
          <div>{{ event.comment }}</div>
        </div>
        <f-button
          v-model="newFile"
          :event-id="event.eventId"
          class="event__upload-button"
          v-if="isUploadButton"
          >Загрузить файл</f-button
        >
        <d-button
          v-if="isSubmitButton"
          @click="SubmitFiles"
          class="event__submit-button"
          >Отправить на проверку</d-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DButton from "@/components/common/DButton";
import FButton from "@/components/common/FButton";
import api from "@/api";

export default {
  name: "EventInfo",
  components: { DButton, FButton },
  props: {
    modelValue: Object,
  },
  data() {
    return {
      event: {},
      newFile: "",
    };
  },
  emits: ["update:modelValue"],
  computed: {
    ...mapGetters(["getCourseName", "getEventName", "getEvent"]),
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
      return require("@/assets/icons/status_" + this.event.status + ".svg");
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
          value: this.convertFullDate(this.event.eventDate),
        },
        {
          name: "Дедлайн:",
          icon: require("@/assets/icons/calendar_event.svg"),
          value: this.convertFullDate(this.event.deadline),
        },
        {
          name: "Дней до дедлайна:",
          icon: require("@/assets/icons/hourglass_empty.svg"),
          value: this.getDeadlineDays(this.event.deadline),
        },
      ];
    },
    courseName() {
      return this.getCourseName(this.eventInfo.courseId);
    },
    eventName() {
      return this.event.eventName;
    },
    isUploadFiles() {
      if (!this.event.files || !this.event.files.length) {
        return false;
      }
      return this.event.files.length > 0;
    },
    isComment() {
      return this.event.comment && this.event.comment.length > 0;
    },
    isUploadButton() {
      const s = this.event.status;
      return (0 < s && s < 4) || s === 6;
    },
    isSubmitButton() {
      return this.newFile !== "";
    },
  },
  methods: {
    downloadFile(index) {
      console.log("open file: ", this.event.files[index]);
      if (!this.event.files[index]) {
        return;
      }
      return `${api.URL}/student/file/${this.event.files[index]}`;
    },
    Close() {
      this.eventInfo.isModalVisible = false;
    },
    OpenFile(index) {
      console.log("open file: ", this.event.files[index]);
      if (!this.event.files[index]) {
        return;
      }
      this.$store.dispatch("DownloadFile", this.event.files[index]);
    },
    DeleteFile(index) {
      console.log("delete file: ", this.event.files[index]);
    },
    SubmitFiles() {
      this.$store.dispatch("UpdateEventStatus", {
        eventId: this.event.eventId,
        status: 2,
      });
      this.newFile = "";
    },
    getDeadlineDays(dateStr) {
      const date = new Date(dateStr);
      return ((date - Date.now()) / (1000 * 60 * 60 * 24)) | 0;
    },
    convertFullDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    convertShortDate(dateStr) {
      const date = new Date(dateStr);
      return date.getDay() + "." + date.getMonth();
    },
  },
  watch: {
    eventInfo() {
      this.event = this.getEvent(
        this.eventInfo.courseId,
        this.eventInfo.eventId
      );
    },
    newFile() {
      if (this.newFile !== "") {
        if (!this.event.files) {
          this.event.files = [];
        }
        this.event.files.push(this.newFile);
      }
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
  margin-left: 12px;
}

.header-title__course-name {
  max-width: 400px;
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

.event__upload-button {
  justify-content: center;
  margin-bottom: 20px;
}

.event__submit-button {
  margin-bottom: 20px;
  background: $color-green;
  width: 230px;
}

.event__submit-button:active {
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
