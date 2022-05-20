<template>
  <div class="profile">
    <profile-info :profile="profile" class="profile__profile-info" />
    <update-password class="profile__update-pass" />
  </div>
</template>

<script>
import ProfileInfo from "@/components/ProfileInfo";
import UpdatePassword from "@/components/UpdatePassword";
import { mapGetters } from "vuex";

export default {
  name: "ProfileView",
  components: { ProfileInfo, UpdatePassword },
  computed: {
    ...mapGetters(["getRole", "fullName", "getCourse", "getGroupCode"]),
    profile() {
      if (this.getRole === "student") {
        return {
          ava: require("@/assets/student.svg"),
          info: {
            Имя: this.fullName,
            Курс: this.getCourse,
            Группа: this.getGroupCode,
          },
        };
      }
      if (this.getRole === "supervisor") {
        return {
          ava: require("@/assets/supervisor.svg"),
          info: {
            Имя: this.fullName,
          },
        };
      }
      return {};
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 150px;

  background: $color-white;
  border-radius: $r-3;
}

.profile__profile-info {
  margin: 30px 0 30px 30px;
}

.profile__update-pass {
  margin: 30px;
}
</style>
