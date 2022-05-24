<template>
  <div class="login-page">
    <div class="login-form">
      <h2 class="login-form__title">Вход</h2>
      <i-input
        @keyup.enter="LoginSubmit"
        :icon="require('@/assets/icons/user.svg')"
        v-model.trim="username"
        plhl="Имя пользователя"
        :error-msg="errUsername"
        class="login-form__username"
      />
      <i-input
        @keyup.enter="LoginSubmit"
        :icon="require('@/assets/icons/password.svg')"
        v-model="password"
        plhl="Пароль"
        type="password"
        :error-msg="errPassword"
        class="login-form__password"
        ref="passs"
      />
      <d-button @click="LoginSubmit" class="login-form__button">Войти</d-button>
    </div>
  </div>
</template>

<script>
import IInput from "@/components/common/IInput";
import DButton from "@/components/common/DButton";
import router from "@/router";
import { mapGetters } from "vuex";

const wrongLorP = "неверный логин или пароль";
const errRequiredField = "заполните поле";

export default {
  name: "LoginView",
  components: {
    IInput,
    DButton,
  },
  data() {
    return {
      username: "",
      password: "",
      errUsername: "",
      errPassword: "",
    };
  },
  methods: {
    LoginSubmit() {
      if (this.username === "") {
        this.errUsername = errRequiredField;
        return;
      }
      if (this.password === "") {
        this.errPassword = errRequiredField;
        return;
      }

      this.$store
        .dispatch("Login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$store
            .dispatch("Update" + this.getRole)
            .then(() => {
              if (!this.getPassStatus) {
                router.push({ name: "profile" });
                return;
              }
              if (this.isSupervisor) {
                router.push({ name: "control" });
              }
              if (this.isStudent) {
                router.push({ name: "progress" });
              }
            })
            .catch(() => {
              this.$store.dispatch("Logout");
              router.push({ name: "login" });
            });
        })
        .catch(() => {
          this.errUsername = wrongLorP;
          this.errPassword = wrongLorP;
        });
    },
  },
  computed: {
    ...mapGetters(["getPassStatus", "getRole", "isSupervisor", "isStudent"]),
  },
  watch: {
    username() {
      if (this.errUsername === wrongLorP) {
        this.errPassword = "";
      }
      this.errUsername = "";
    },
    password() {
      if (this.errPassword === wrongLorP) {
        this.errUsername = "";
      }
      this.errPassword = "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.login-page {
  display: contents;
  justify-content: center;
}

.login-form {
  width: 360px;
  margin-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: $color-white;
  border-radius: $r-3;
}

.login-form__title {
  height: 30px;
  margin: 60px 0;
}

.login-form__username,
.login-form__password {
  margin-bottom: 15px;
}

.login-form__button {
  margin-bottom: 60px;
}
</style>
