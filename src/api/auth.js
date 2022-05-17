export default function (instance) {
  return {
    login(payload) {
      return instance.post("user/login", payload);
    },
    logout() {
      return instance.get("user/logout");
    },
  };
}
