<template>
  <div class="profile">
    <div class="profile__info">
      <img class="profile__avatar" :src="require('@/assets/student.svg')" />
      <h2 class="profile__title">Профиль</h2>
      <div class="profile__table">
        <ul>
          <li
            v-for="(value, name) in profile"
            :key="name"
            class="profile__table-row"
          >
            <span>{{ name }}:&nbsp;</span>
            <span>{{ value }}</span>
          </li>
        </ul>
      </div>
    </div>
    <update-password class="profile__update-pass" />
  </div>
</template>

<script>
import UpdatePassword from "@/components/UpdatePassword";
import { mapGetters } from "vuex";

export default {
  name: "StudentProfileView",
  components: { UpdatePassword },
  computed: {
    ...mapGetters(["fullName", "getCourse", "getGroupCode"]),
    profile() {
      return {
        Имя: this.fullName,
        Курс: this.getCourse,
        Группа: this.getGroupCode,
      };
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

.profile__info {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 30px;
}

.profile__avatar {
  width: 160px;
  height: 160px;
}

.profile__title {
}

.profile__table {
  margin: 12px;
}

//.profile__table-row {
//
//}

.profile__update-pass {
  margin: 30px;
}
</style>
