import axios from "axios";

const instance = axios.create({
  baseURL: "https://bmstu.site/api/v1/",
  // baseURL: "http://localhost:8001/api/v1/",
  withCredentials: true,
  headers: {
    accept: "application/json",
  },
});

export default instance;
