import axios from "axios";
import { apiURL } from "@/api/const";

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
      return axios.post(`${apiURL}student/event/${eventId}/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    downloadFile(fileName) {
      setCSRF();
      return instance.get(`student/file/${fileName}`);
    },
    downloadFileTest(eventId) {
      setCSRF();
      return instance.get(`student/event/${eventId}/file`);
    },
    deleteFile(eventId) {
      setCSRF();
      return instance.delete(`event/${eventId}/file`);
    },
    updateEventStatus(eventId, payload) {
      setCSRF();
      return instance.put(`student/event/${eventId}/status`, payload);
    },
  };
}
