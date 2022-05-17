<template>
  <div class="navbar">
    <img :src="require('@/assets/logo.svg')" class="navbar__logo" />
    <span class="navbar__title">DashboardBMSTU</span>
    <span class="icon-user_circle navbar__user">Лункин&nbsp;В.&nbsp;И.</span>
    <img :src="require('@/assets/icons/menu.svg')" class="navbar__menu" />
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.navbar {
  height: 60px;
  width: 100vw;

  background: $color-dark-blue;
  color: $color-white;

  display: flex;
  flex-direction: row;
  align-items: center;
}

.navbar__logo {
  flex: 0;
  margin: 0 40px;
}

.navbar__title {
  flex: 1;
  text-align: start;

  font-weight: 500;
  font-size: 24px;
}

.icon-user_circle:before {
  font-size: 24px;
  margin-right: 6px;
}

.navbar__user {
  flex: 0;

  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
}

.navbar__menu {
  flex: 0;
  font-size: xx-large;
  padding: 0 30px;
}
</style>
