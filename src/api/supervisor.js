export default function (instance) {
  const setCSRF = () => {
    instance.defaults.headers["x-csrf-token"] = sessionStorage.getItem("csrf");
  };
  return {
    getSupervisor() {
      setCSRF();
      return instance.get("supervisor");
    },
    getCourses() {
      setCSRF();
      return instance.get("supervisor/courses");
    },
    getGroupsOnCourse(courseId) {
      setCSRF();
      return instance.get(`course/${courseId}/group`);
    },
    getStudentsFromGroup(groupId) {
      setCSRF();
      return instance.get(`group/${groupId}/students`);
    },
    getEvents(courseId) {
      setCSRF();
      return instance.get(`course/${courseId}/events`);
    },
    getStudentEvents(studentId, courseId) {
      setCSRF();
      return instance.get(`supervisor/student/${studentId}/course/${courseId}`);
    },
  };
}
