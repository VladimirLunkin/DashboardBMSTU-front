<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg" />
    <i-input data="a" :icon="require('@/assets/icons/user.svg')" plhl="Имя" />
    <i-button icon="show">Icon</i-button>
  </div>
</template>

<script>
// @ is an alias to /src
import IInput from "@/components/common/IInput";
import IButton from "@/components/common/IButton";

export default {
  name: "HomeView",
  components: {
    IButton,
    IInput,
  },
};
</script>
