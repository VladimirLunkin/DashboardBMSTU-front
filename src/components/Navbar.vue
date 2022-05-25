<template>
  <div class="navbar">
    <img :src="require('@/assets/logo.svg')" class="navbar__logo" />
    <div class="navbar__home">
      <span @click="Home" class="navbar__home-title">DashboardBMSTU</span>
    </div>
    <div class="navbar__user">
      <h3 @click="Profile" class="icon-user_circle n__u-t">{{ shortName }}</h3>
    </div>
    <img
      @click="Menu"
      :src="require('@/assets/icons/menu.svg')"
      class="navbar__icon-menu"
      alt=""
      ref="navbar-menu"
    />
    <div class="navbar__menu" v-show="menu">
      <span @click="Profile" class="icon-settings navbar__menu-item">
        Настройки
      </span>
      <span @click="Logout" class="icon-logout navbar__menu-item"> Выйти</span>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    Home() {
      router.push({ name: "dashboard" });
    },
    Profile() {
      router.push("/profile");
    },
    Menu() {
      this.menu = !this.menu;
    },
    CloseMenu() {
      this.menu = false;
    },
    Logout() {
      this.$store
        .dispatch("Logout")
        .then(() => {
          router.push("/login");
        })
        .catch((resp) => {
          console.log("logout");
          console.log(resp);
          router.push("/login");
        });
    },
  },
  computed: {
    ...mapGetters(["shortName", "isSupervisor", "isStudent"]),
  },
  mounted() {
    let vm = this;
    document.addEventListener("click", function (e) {
      if (e.target !== vm.$refs["navbar-menu"]) {
        vm.CloseMenu();
      }
    });
  },
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
  align-items: stretch;
}

.navbar__logo {
  flex: 0;
  margin: 0 40px;
}

.navbar__home {
  flex: 1;

  display: flex;
  align-items: center;
}

.navbar__home-title {
  font-weight: 600;
  font-size: 24px;

  cursor: pointer;
}

.navbar__home-title:hover {
  color: #b9fffb;
}

.navbar__user {
  flex: 0;
  padding: 0 12px;

  display: flex;
  align-items: center;

  cursor: pointer;
}

.icon-user_circle:before {
  margin-top: 3px;
  margin-right: 6px;
}

.n__u-t {
  color: $color-white;
  white-space: nowrap;
}

.navbar__user:hover,
.navbar__icon-menu:hover {
  background: rgba(236, 252, 252, 0.1);
}

.navbar__icon-menu {
  flex: 0;
  font-size: xx-large;
  padding: 0 24px;

  cursor: pointer;
}

.navbar__menu {
  position: absolute;
  top: 50px;
  right: 24px;
  padding: 12px;

  background: $color-white;
  border: 1px solid $color-gray;
  border-radius: $r-2;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.navbar__menu-item {
  color: $color-black;
  padding: 6px;

  cursor: pointer;
  text-align: start;
}

.navbar__menu-item:hover {
  background: $background;
  border-radius: $r-2;
  text-decoration: underline;
}

.icon-logout:before,
.icon-settings:before {
  margin-right: 3px;
}
</style>
