import instance from "@/api/instance";
import auth from "@/api/auth";
import courses from "@/api/courses";

export default {
  auth: auth(instance),
  courses: courses(instance),
};
