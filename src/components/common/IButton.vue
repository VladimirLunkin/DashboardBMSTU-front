<template>
  <d-button :class="IconClass">
    <slot></slot>
  </d-button>
</template>

<script>
import DButton from "@/components/common/DButton";

export default {
  name: "IButton",
  components: {
    DButton,
  },
  props: {
    icon: String,
    name: String,
  },
  computed: {
    IconClass() {
      return "icon-" + this.icon;
    },
  },
};
</script>

<style scoped lang="scss">
[class^="icon-"]::before,
[class*=" icon-"]::before {
  margin-right: 6px;
  vertical-align: middle;
  font-size: 24px;
}
</style>
