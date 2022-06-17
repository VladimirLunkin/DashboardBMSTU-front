<template>
  <div class="profile-info">
    <img class="profile-info__avatar" :src="profile.ava" />
    <h2 class="profile-info__title">Профиль</h2>
    <div class="profile-info__table">
      <ul>
        <li
          v-for="(value, name) in profile.info"
          :key="name"
          class="profile__table-row"
        >
          <span>{{ name }}:&nbsp;</span>
          <span>{{ value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo",
  props: {
    profile: Object,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: $r-3;
  padding: 15px;
}

.profile-info__avatar {
  width: 160px;
  height: 160px;
}

.profile-info__title {
}

.profile-info__table {
  margin: 12px;
}
</style>
