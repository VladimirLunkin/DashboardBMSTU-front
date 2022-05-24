import axios from "axios";

export default function (instance) {
  const setCSRF = () => {
    instance.defaults.headers["x-csrf-token"] = sessionStorage.getItem("csrf");
  };
  return {
    getStudent() {
      setCSRF();
      return instance.get("student");
    },
    getGroup() {
      setCSRF();
      return instance.get("student/group");
    },
    getCoursesTable() {
      setCSRF();
      return instance.get("student/table");
    },
    uploadFile(eventId, payload) {
      setCSRF();
      let formData = new FormData();
      formData.append("file", payload);
      return axios.post(
        `https://bmstu.site/api/v1/student/event/${eventId}/file`,
        // `http://localhost:8001/api/v1/student/event/${eventId}/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
