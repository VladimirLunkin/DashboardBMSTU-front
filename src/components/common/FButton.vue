<template>
  <div class="file__button">
    <input
      @change="AddFile"
      v-show="false"
      id="file-input"
      type="file"
      ref="file"
      name="file"
      multiple
    />
    <label for="file-input" class="icon-upload input__upload-file"
      ><slot></slot
    ></label>
  </div>
</template>

<script>
export default {
  name: "FButton",
  props: {
    eventId: String,
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    AddFile() {
      this.file = this.$refs.file.files[0];
      this.$api.student
        .uploadFile(this.eventId, this.file)
        .then(() => {
          console.log("Ok!!!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.file__button {
  display: flex;
}

.input__upload-file {
  width: 200px;
  height: 30px;

  padding-top: 3px;

  font-weight: bold;

  color: $color-white;
  background: $color-dark-blue;
  border-radius: $r-2;

  text-align: center;

  cursor: pointer;
}

.input__upload-file:active {
  background: #214a75;
}

[class^="icon-"]::before,
[class*=" icon-"]::before {
  margin-right: 6px;
  vertical-align: middle;
  font-size: 24px;
}
</style>
