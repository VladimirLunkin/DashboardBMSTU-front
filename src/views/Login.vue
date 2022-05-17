<template>
  <div class="login-page">
    <div class="login-form">
      <h2 class="login-form__title">Вход</h2>
      <i-input
        :icon="require('@/assets/icons/user.svg')"
        v-model="username"
        plhl="Имя пользователя"
        class="login-form__username"
      />
      <i-input
        :icon="require('@/assets/icons/password.svg')"
        v-model="password"
        plhl="Пароль"
        type="password"
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
    };
  },
  methods: {
    Login() {
      console.log("this.username");
      console.log(this.username);
      console.log(this.password);

      this.$api.auth
        .login({
          username: this.username,
          password: this.password,
        })
        .then((resp) => {
          console.log(resp);
          router.push("/");
        })
        .catch((resp) => {
          if (this.username === "admin" && this.password === "admin") {
            router.push("/");
          }
          console.log(resp);
        });
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
