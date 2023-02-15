import { Error } from "../error/Error";
import { CourseRepository } from "../models/CourseRepository";

export class CourseService {
  static repository = CourseRepository;

  static async getAllCourse(u_no) {
    return await this.repository.findAllCourse(u_no);
  }

  static async updateVisitedStatus({ u_no, code }) {
    const course = await this.repository.findOne({ u_no, code });
    if (!course) throw Error.NOT_FOUND;
    if (course.visited === "Y") throw Error.CONFLICT;

    await this.repository.updateStatus({ u_no, c_no : course.c_no });
  }
}
