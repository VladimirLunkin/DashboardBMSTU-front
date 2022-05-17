<template>
  <nav-bar v-if="loggedIn" class=""></nav-bar>
  <router-view class="view" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.view {
  flex: 1;
}
</style>
<script>
import NavBar from "@/components/common/Navbar";

export default {
  components: {
    NavBar,
  },
  computed: {
    loggedIn() {
      const path = this.$router.currentRoute.value.path;
      return path !== "/login";
    },
  },
};
</script>
