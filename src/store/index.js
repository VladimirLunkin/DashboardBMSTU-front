import { createStore } from "vuex";
import user from "@/store/modules/user";
import student from "@/store/modules/student";
import courses from "@/store/modules/courses";

export default createStore({
  modules: {
    user,
    student,
    courses,
  },
});
