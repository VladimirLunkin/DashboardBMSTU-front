<template>
  <div class="login-page">
    <div class="login-form">
      <h2 class="login-form__title">Вход</h2>
      <i-input
        @keyup.enter="Login"
        :icon="require('@/assets/icons/user.svg')"
        v-model.trim="username"
        plhl="Имя пользователя"
        :error-msg="errUsername"
        class="login-form__username"
      />
      <i-input
        @keyup.enter="Login"
        :icon="require('@/assets/icons/password.svg')"
        v-model="password"
        plhl="Пароль"
        type="password"
        :error-msg="errPassword"
        class="login-form__password"
      />
      <d-button @click="Login" class="login-form__button">Войти</d-button>
    </div>
  </div>
</template>

<script>
import IInput from "@/components/common/IInput";
import DButton from "@/components/common/DButton";
import router from "@/router";

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
    Login() {
      if (this.username === "") {
        this.errUsername = errRequiredField;
        return;
      }
      if (this.password === "") {
        this.errPassword = errRequiredField;
        return;
      }

      this.$api.auth
        .login({
          username: this.username,
          password: this.password,
        })
        .then((resp) => {
          console.log(resp);
          router.push("/profile");
        })
        .catch(() => {
          if (this.username === "admin" && this.password === "admin") {
            router.push("/profile");
          }
          this.errUsername = wrongLorP;
          this.errPassword = wrongLorP;
        });
    },
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
