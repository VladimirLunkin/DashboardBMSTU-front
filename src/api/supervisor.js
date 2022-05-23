export default function (instance) {
  const setCSRF = () => {
    instance.defaults.headers["x-csrf-token"] = sessionStorage.getItem("csrf");
  };
  return {
    getSupervisor() {
      setCSRF();
      return instance.get("supervisor");
    },
  };
}
