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
      setCSRF();
      return instance.get("user/logout");
    },
    updatePass(payload) {
      setCSRF();
      return instance.put("user/login", payload);
    },
    getUser() {
      setCSRF();
      return instance.get("user");
    },
  };
}
