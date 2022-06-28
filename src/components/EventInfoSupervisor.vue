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
        <div v-if="isOKButton" class="event__new_comment">
          <textarea
            v-model="newComment"
            rows="2"
            placeholder="Оставить комментарий"
            class="event__new_comment_field"
          />
          <d-button class="event__new_comment_button" @click="SendComment"
            >Отправить</d-button
          >
        </div>
        <i-button
          v-if="isOKButton"
          @click="OKButton"
          icon="check_all"
          class="event__ok-button"
          >Принять</i-button
        >
        <i-button
          v-if="isProtectedButton"
          @click="ProtectedButton"
          icon="check_all"
          class="event__protected-button"
          >Защищено</i-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IButton from "@/components/common/IButton";
import { apiURL } from "@/api/const";
import store from "@/store/index";
import DButton from "@/components/common/DButton";

export default {
  // name: "EventInfo",
  props: {
    modelValue: Object,
  },
  components: { DButton, IButton },
  data() {
    return {
      newComment: "",
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
    isProtectedButton() {
      return this.event.status === 4;
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
      return `${apiURL}supervisor/student/${this.eventInfo.studentId}/file/${this.event.files[index]}`;
    },
    Close() {
      this.eventInfo.isModalVisible = false;
    },
    SendComment() {
      if (this.newComment === "") {
        return;
      }

      const newComment = this.newComment;

      store
        .dispatch("SupervisorAddNewComment", {
          studentId: this.eventInfo.studentId,
          eventId: this.event.eventId,
          comment: newComment,
        })
        .then(() => {
          this.event.comment = newComment;
          this.event.status = 3;
          this.newComment = "";
        });
    },
    OKButton() {
      console.log("ok");
      store
        .dispatch("SupervisorUpdateEventStatus", {
          studentId: this.eventInfo.studentId,
          eventId: this.event.eventId,
          status: 4,
        })
        .then(() => {
          this.event.status = 4;
        });
    },
    ProtectedButton() {
      console.log("ttt");
      store
        .dispatch("SupervisorUpdateEventStatus", {
          studentId: this.eventInfo.studentId,
          eventId: this.event.eventId,
          status: 5,
        })
        .then(() => {
          this.event.status = 5;
        });
    },
    getDeadlineDays(dateStr) {
      const date = new Date(dateStr);
      return ((date - Date.now()) / (1000 * 60 * 60 * 24)) | 0;
    },
    convertFullDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
  },
  watch: {
    eventInfo() {
      this.event = this.getEvent(
        this.eventInfo.studentId,
        this.eventInfo.eventId
      );
      console.log(this.event);
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
.event__upload-files,
.event__new_comment {
  margin: 20px 12px;
  text-align: left;
}

.event__new_comment {
  display: flex;
  flex-direction: column;
  background: $color-light-gray;
  border-radius: 12px;
}

.event__new_comment_field {
  background: $color-light-gray;
  resize: vertical;
  margin: 12px 6px;
  padding: 3px 6px;
}

.event__new_comment_button {
  place-self: center;
  margin-bottom: 12px;
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
  background: $color-light-green;
}

.event__ok-button:active {
  background: rgba(105, 182, 38, 0.6);
}

.event__protected-button {
  margin-bottom: 20px;
  background: $color-green;
}

.event__protected-button:active {
  background: rgba(0, 145, 46, 0.6);
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
