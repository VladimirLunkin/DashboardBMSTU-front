<template>
  <div class="i-input">
    <div class="i-input__field" :class="ValidationClass">
      <img :src="icon" alt="icon" class="i-input__icon" />
      <input
        v-model="value"
        :placeholder="plhl"
        :type="type"
        class="i-input__input"
      />
    </div>
    <span class="i-input__error-text">{{ errorMsg }}</span>
  </div>
</template>

<script>
export default {
  name: "IInput",
  props: {
    icon: String,
    modelValue: String,
    plhl: String,
    type: String,
    errorMsg: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    ValidationClass() {
      return this.errorMsg === "" ? "" : "i-input__field_error";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles.scss";

.i-input {
  height: 45px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.i-input__field {
  width: 200px;
  height: 30px;

  display: flex;
  align-items: center;

  border: 1px solid $color-black;
  border-radius: $r-2;
}

.i-input__field:focus-within {
  border: 2px solid $color-dark-blue;
}

.i-input__field_error {
  border: 2px solid $color-red;
}

.i-input__icon {
  width: 18px;
  height: 18px;
  margin-left: 6px;
}

.i-input__input {
  /* Username */
  flex: 1;
  padding: 0 6px;

  /* text */
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  /* grey */
  color: $color-black;
  background: unset;
  border-radius: $r-2;

  outline: none;
}

input::placeholder {
  color: $color-gray;
}

.i-input__error-text {
  margin-left: 34px;
  font-size: $fs-6;
  color: $color-red;
}
</style>
