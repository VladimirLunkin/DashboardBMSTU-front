export default function (instance) {
  const setCSRF = () => {
    instance.defaults.headers["x-csrf-token"] = sessionStorage.getItem("csrf");
  };
  return {
    allCourses(payload) {
      setCSRF();
      return instance.get("student/progress", payload);
    },
  };
}
