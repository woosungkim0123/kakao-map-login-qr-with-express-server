import db from "../config/db";

export class CourseRepository {
  static async findAllCourse(u_no) {
    const QUERY = `SELECT *, IFNULL((SELECT 'Y' FROM visited WHERE user_no=? AND c_no=course_no), 'N') AS visited
    FROM course  `;
    return db.execute(QUERY,[u_no]).then((result) => result[0]);
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
