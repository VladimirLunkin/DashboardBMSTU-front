export default function (instance) {
  const setCSRF = () => {
    instance.defaults.headers["x-csrf-token"] = sessionStorage.getItem("csrf");
  };
  return {
    allCourses(payload) {
      setCSRF();
      return instance.get("student/progress", payload);
    },
    uploadFile(eventId, payload) {
      setCSRF();
      return instance.post(`event/${eventId}/file`, payload);
    },
    downloadFile(eventId) {
      setCSRF();
      return instance.get(`event/${eventId}/file`);
    },
    deleteFile(eventId) {
      setCSRF();
      return instance.delete(`event/${eventId}/file`);
    },
  };
}
