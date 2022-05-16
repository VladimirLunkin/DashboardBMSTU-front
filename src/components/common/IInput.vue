<template>
  <div class="i-input">
    <img :src="icon" alt="icon" class="i-input__icon" />
    <input
      v-model="value"
      :placeholder="plhl"
      :type="type"
      class="i-input__input"
    />
  </div>
</template>

<script>
export default {
  name: "IInput",
  props: {
    icon: String,
    data: String,
    plhl: String,
    type: String,
  },
  emits: ["update:data"],
  computed: {
    value: {
      get() {
        return this.data;
      },
      set(value) {
        this.$emit("update:data", value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles.scss";

.i-input {
  width: 200px;
  height: 30px;

  display: flex;
  align-items: center;

  border: 1px solid $color-black;
  border-radius: $r-2;
}

.i-input:focus-within {
  border: 2px solid $color-dark-blue;
}

.i-input__icon {
  width: 24px;
  height: 24px;
  margin-left: 6px;
}

.i-input__input {
  /* Username */
  flex: 1;
  height: 30px;
  padding-left: 6px;

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
</style>
