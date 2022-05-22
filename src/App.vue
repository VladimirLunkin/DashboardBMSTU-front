<template>
  <nav-bar v-if="getLoggedIn" class=""></nav-bar>
  <div class="my-container">
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  components: {
    NavBar,
  },
  computed: mapGetters(["getLoggedIn"]),
  created() {
    router.push({ name: "progress" });
    return;
    // if (!this.$store.loggedIn) {
    //   this.$store
    //     .dispatch("GetUser")
    //     .then(() => {
    //       if (this.getPassStatus) {
    //         router.push({ name: "home" });
    //       } else {
    //         router.push({ name: "profile" });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       router.push({ name: "login" });
    //     });
    //
    //   return;
    // }
    // if (!this.$store.pass_status) {
    //   router.push({ name: "profile" });
    //   return;
    // }
  },
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
  justify-content: center;
}
</style>
