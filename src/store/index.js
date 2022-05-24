import { createStore } from "vuex";
import user from "@/store/modules/user";
import student from "@/store/modules/student/student";
import studentCourses from "@/store/modules/student/courses";
import Supervisor from "@/store/modules/supervisor/supervisor";
import SupervisorCourses from "@/store/modules/supervisor/courses";
import SupervisorEvents from "@/store/modules/supervisor/events";
import SupervisorGroups from "@/store/modules/supervisor/groups";
import SupervisorStudents from "@/store/modules/supervisor/students";

export default createStore({
  modules: {
    user,
    student,
    studentCourses,
    Supervisor,
    SupervisorCourses,
    SupervisorEvents,
    SupervisorGroups,
    SupervisorStudents,
  },
});
