<template>
  <div class="update-pass">
    <h2 class="update-pass__title">Смена пароля</h2>
    <i-input
      :icon="require('@/assets/icons/password.svg')"
      v-model="password"
      plhl="Пароль"
      type="password"
      :error-msg="errPass"
      class="update-pass__password"
    />
    <i-input
      :icon="require('@/assets/icons/password.svg')"
      v-model="newPassword"
      plhl="Новый пароль"
      type="password"
      :error-msg="errNewPass"
      class="update-pass__new-password"
    />
    <i-input
      :icon="require('@/assets/icons/password.svg')"
      v-model="repPassword"
      plhl="Повторите пароль"
      type="password"
      :error-msg="errRepPass"
      class="update-pass__repeat-password"
    />
    <d-button @click="Save" class="update-pass__button">Сохранить</d-button>
  </div>
</template>

<script>
import IInput from "@/components/common/IInput";
import DButton from "@/components/common/DButton";

const rePass = new RegExp("[a-zA-Z0-9].{5,20}");

export default {
  name: "UpdatePassword",
  data() {
    return {
      password: "",
      newPassword: "",
      repPassword: "",
      errPass: "",
      errNewPass: "",
      errRepPass: "",
    };
  },
  methods: {
    Save() {
      if (!rePass.test(this.newPassword)) {
        this.errNewPass = "слишком простой пароль";
        return;
      }
      if (this.newPassword !== this.repPassword) {
        this.errNewPass = "пароли не совпадают";
        this.errRepPass = "пароли не совпадают";
        return;
      }

      this.$api.auth
        .updatePass({
          password: this.newPassword,
        })
        .catch(() => {
          this.errPass = "неверный пароль";
        });

      return true;
    },
  },
  watch: {
    password() {
      this.errPass = "";
    },
    newPassword() {
      this.errNewPass = "";
      this.errRepPass = "";
    },
    repPassword() {
      this.errNewPass = "";
      this.errRepPass = "";
    },
  },
  components: {
    IInput,
    DButton,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.update-pass {
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: $color-light-gray;
  border-radius: $r-3;
}

.update-pass__title {
  height: 30px;
  margin: 30px 0;
}

.update-pass__password,
.update-pass__new-password,
.update-pass__repeat-password {
  margin-bottom: 5px;
}

.update-pass__button {
  margin-bottom: 30px;
}
</style>
