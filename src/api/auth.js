export default function (instance) {
  const setCSRF = () => {
    instance.defaults.headers["x-csrf-token"] = sessionStorage.getItem("csrf");
  };
  return {
    login(payload) {
      setCSRF();
      return instance.post("user/login", payload);
    },
    logout() {
      return instance.get("user/logout");
    },
    updatePass(payload) {
      return instance.put("user/login", payload);
    },
    getUser() {
      return instance.get("user");
    },
  };
}
