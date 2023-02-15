import db from "../config/db";

export class UserRepository {
  static async findById(id) {
    const QUERY = `SELECT u_no, u_id, u_pw, u_name FROM users WHERE u_id=?`;
    return db.execute(QUERY, [id]).then((result) => result[0][0]);
  }
  static async findByNo(no) {
    const QUERY = `SELECT u_no, u_id, u_pw, u_name FROM users WHERE u_no=?`;
    return db.execute(QUERY, [no]).then((result) => result[0][0]);
  }
  
  static async save({id, pw, name}) {
    const QUERY = `INSERT INTO users (u_id, u_pw, u_name) VALUES (?,?,?)`;
    return db.execute(QUERY, [id, pw, name]).then((result) => result[0]);
  }
}
