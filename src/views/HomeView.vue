<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg" />
    <i-input data="a" :icon="require('@/assets/icons/user.svg')" plhl="Имя" />
    <i-button icon="show">Icon</i-button>
    <update-password></update-password>
  </div>
</template>

<script>
import IInput from "@/components/common/IInput";
import IButton from "@/components/common/IButton";
import UpdatePassword from "@/components/UpdatePassword";

export default {
  name: "HomeView",
  components: {
    UpdatePassword,
    IButton,
    IInput,
  },
};
</script>
