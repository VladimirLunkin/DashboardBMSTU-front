<template>
  <button class="d-button"><slot></slot></button>
</template>

<script>
export default {
  name: "DButton",
  props: {
    name: String,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.d-button {
  width: 200px;
  height: 30px;

  font-weight: bold;

  color: $color-white;
  background: $color-dark-blue;
  border-radius: $r-2;
}

.d-button:active {
  background: #214a75;
}
</style>
