import axios from "axios";
import { apiURL } from "@/api/const";

const instance = axios.create({
  baseURL: apiURL,
  withCredentials: true,
  headers: {
    accept: "application/json",
  },
});

export default instance;
