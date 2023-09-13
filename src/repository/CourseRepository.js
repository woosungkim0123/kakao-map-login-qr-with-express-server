import db from "../config/db";

export class CourseRepository {
  static async findAllCourse(u_no) {
    const QUERY = `SELECT *, IFNULL((SELECT 'Y' FROM visited WHERE user_no=? AND c_no=course_no), 'N') AS visited
    FROM course  `;
    return db.execute(QUERY,[u_no]).then((result) => result[0]);
  }

  static async findCourseByQrCode(qrCode) {
    const QUERY = `SELECT * FROM course WHERE course_qr = ?`;
    return db.execute(QUERY, [qrCode]).then((result) => result[0][0]);
  }

  static async findUsersCourse(user_no, course_no) {
    const QUERY = `SELECT * FROM users_course WHERE user_no = ? AND course_no = ?`;
    return db.execute(QUERY, [user_no, course_no]).then((result) => result[0][0]);
  }

  static async findOne({u_no, code }) {
    const QUERY = `SELECT *, IFNULL((SELECT 'Y' FROM visited WHERE user_no=? AND c_no=course_no), 'N') AS visited FROM course WHERE code = ?`;
    return db.execute(QUERY, [u_no, code]).then((result) => result[0][0]);
  }
  static async updateStatus({ u_no, c_no }) {
    const QUERY = `INSERT INTO visited (user_no, course_no) VALUES (?, ?)`;
    db.execute(QUERY, [u_no, c_no]);
  }
}
