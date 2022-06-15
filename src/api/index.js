import instance from "@/api/instance";
import { apiURL } from "@/api/const";
import auth from "@/api/auth";
import student from "@/api/student";
import supervisor from "@/api/supervisor";

export default {
  auth: auth(instance),
  student: student(instance),
  supervisor: supervisor(instance),
  URL: apiURL,
};
