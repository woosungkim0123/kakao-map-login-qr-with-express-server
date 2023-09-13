import Exception from "../handler/Exception";
import { CourseRepository } from "../repository/CourseRepository";


export const updateCourseVisitedStatus = async ({ user, qrCode, latitude, longitude }) => {
  console.log(user, qrCode, latitude, longitude) 
  const course = await CourseRepository.findCourseByQrCode(qrCode);
  if (!course) throw Exception.QR_BAD_REQUEST;
  const isVisited = await CourseRepository.findUsersCourse(user.user_no, course.course_no);
  if (isVisited) throw Exception.ALREADY_VISTED;
  console.log(isVisited)
  // 반경원로직 생각해야함
  

  const { u_no } = user;

    await this.repository.updateStatus({ u_no, c_no : course.c_no });
}

