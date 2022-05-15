<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg" />
    <i-input data="a" :icon="require('@/assets/icons/user.svg')" plhl="Имя" />
  </div>
</template>

<script>
// @ is an alias to /src
import IInput from "@/components/common/IInput";

export default {
  name: "HomeView",
  components: {
    IInput,
  },
};
</script>
