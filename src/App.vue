<template>
  <nav-bar v-if="getLoggedIn" class=""></nav-bar>
  <div class="my-container">
    <my-loader v-if="getLoader" />
    <router-view v-show="!getLoader" />
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
import { mapGetters } from "vuex";
import MyLoader from "@/components/Loader";
import router from "@/router";

export default {
  created() {
    router.push({ name: "profile" });
  },
  components: {
    MyLoader,
    NavBar,
  },
  computed: mapGetters(["getLoggedIn", "getLoader"]),
};
</script>

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
}

.my-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12px;
}
</style>
