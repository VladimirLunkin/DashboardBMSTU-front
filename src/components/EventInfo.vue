<template>
  <div v-if="isModalVisible" class="modal" ref="modal">
    <div class="event">
      <div class="modal__header">
        <div class="modal__header-title">
          <h3 class="">{{ eventInfo.owner }}</h3>
          <img
            :src="require('@/assets/icons/caret_right.svg')"
            class=""
            alt=""
          />
          <h3 class="">{{ eventInfo.eventName }}</h3>
        </div>
        <img
          @click="Close"
          :src="require('@/assets/icons/close.svg')"
          class="modal__close-icon"
          alt=""
        />
      </div>
      <div>Body Body Body</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventInfo",
  props: {
    modelValue: Boolean,
    eventInfo: {
      owner: String,
      eventName: String,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    isModalVisible: {
      get() {
        return this.modelValue;
      },
      set(isModalVisible) {
        this.$emit("update:modelValue", isModalVisible);
      },
    },
  },
  methods: {
    Close() {
      this.isModalVisible = false;
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
  width: 400px;
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
</style>
