
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../models/UserRepository.js";
import { Error } from "../error/Error.js";

export class UserService {
  static repository = UserRepository;
  static jwtSecretKey = process.env.SECRET_KEY;
  static jwtExpire = process.env.JWT_EXPIRE

  static _createJwtToken(no) {
    return jwt.sign({ no }, this.jwtSecretKey, { expiresIn: this.jwtExpire });
  }
  static async join({ id, pw, name }) {
    const user = await this.repository.findById(id);
    if(user) throw Error.ID_EXIST;
    const hashedPw = await bcrypt.hash(pw, 8);
    const { insertId } = await this.repository.save({ id, pw: hashedPw, name })
    const token = this._createJwtToken(insertId);
    return { token, user : { id ,name }};
  }
  static async login({id, pw}) {
    const user = await this.repository.findById(id);
    if(!user) throw Error.UN_AUTHORIZED;
    const isValidPassword = await bcrypt.compare(pw, user.u_pw);
    if(!isValidPassword) throw Error.UN_AUTHORIZED;
    const token = this._createJwtToken(user.u_no);
    delete user.u_no;
    delete user.u_pw;
    return { token, user };
  }
  
  static async findUser(no) {
    const user = await this.repository.findByNo(no);
    if(!user) throw Error.NOT_USER_FOUND;

    delete user.u_no;
    delete user.u_pw;

    return user;
  }
}
