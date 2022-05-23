import instance from "@/api/instance";
import auth from "@/api/auth";
import student from "@/api/student";

export default {
  auth: auth(instance),
  student: student(instance),
};
