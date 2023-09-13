import db from "../config/db";

export default class UserRepository {

  static async findById(id) {
    const QUERY = `SELECT * FROM users WHERE user_id=?`;
    return db.execute(QUERY, [id]).then((result) => result[0][0]);
  }

  static async findByNo(no) {
    const QUERY = `SELECT * FROM users WHERE user_no=?`;
    return db.execute(QUERY, [no]).then((result) => result[0][0]);
  }
  
  static async save({ user_id, password = "", username = "", email = "", image = "", provider = "" }) {
    const QUERY = `
      INSERT INTO users 
        (user_id, user_password, user_name, user_email, user_image, user_provider) 
      VALUES 
        (?, ?, ?, ?, ?, ?)`;
    return db.execute(QUERY, [user_id, password, username, email, image, provider]).then((result) => result[0]);
  }

  static async findByIdAndProvider(id, provider) {
    const QUERY = `SELECT user_no, user_id, user_name, user_provider FROM users WHERE user_id=? AND user_provider=?`;

    return db.execute(QUERY, [id, provider]).then((result) => result[0][0]);
  }
}
