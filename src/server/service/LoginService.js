import { Error } from "../error/Error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MemoryUsersRepository } from "../models/MemoryUsersRepository.js";
import { DbUsersRepository } from "../models/DbUsersRepository.js";

export class LoginService {
  // 메모리 저장소
  static repository = new MemoryUsersRepository();
  // 데이터베이스 이용시
  //static repository = new DbUsersRepository();
  static jwtSecretKey = process.env.SECRET_KEY;
  static jwtExpire = process.env.JWT_EXPIRE

  static _createJwtToken(id) {
    return jwt.sign({ id }, this.jwtSecretKey, { expiresIn: this.jwtExpire });
  }

  static async login(id, pw) {
    const user = await this.repository.findById(id);
    if(!user) throw Error.UN_AUTHORIZED;
    const isValidPassword = await bcrypt.compare(pw, user.pw);
    if(!isValidPassword) throw Error.UN_AUTHORIZED;
    const token = this._createJwtToken(user.id);
    return token;
  }
  static async join({ id, pw, name }) {
    const user = await this.repository.findById(id);
    if(user) throw Error.ID_EXIST;
    const hashedPw = await bcrypt.hash(pw, 8);
    await this.repository.save({id, pw: hashedPw, name})
  }

}
