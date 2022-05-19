import axios from "axios";

const instance = axios.create({
  baseURL: "http://146.185.209.22:80/api/v1/",
  withCredentials: true,
  headers: {
    accept: "application/json",
  },
});

export default instance;
