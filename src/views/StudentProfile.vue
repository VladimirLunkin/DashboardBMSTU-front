<template>
  <div class="profile">
    <div class="profile__info">
      <img class="profile__avatar" :src="require('@/assets/student.svg')" />
      <h2 class="profile__title">Профиль</h2>
      <div class="profile__table">Table</div>
    </div>
    <update-password class="profile__update-pass" />
  </div>
</template>

<script>
import UpdatePassword from "@/components/UpdatePassword";
export default {
  name: "StudentProfileView",
  components: { UpdatePassword },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.profile__info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile__avatar {
  width: 160px;
  height: 160px;
}

.profile__title {
}

.profile__table {
  margin: 30px;
}
</style>
