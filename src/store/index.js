import { createStore } from "vuex";
import user from "@/store/modules/user";
import student from "@/store/modules/student";

export default createStore({
  modules: {
    user,
    student,
  },
});
