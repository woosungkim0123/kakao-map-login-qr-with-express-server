import { Error } from "../error/Error";
import { DbMainRepository } from "../models/DbMainRepository";
import { MemoryMainRepository } from "../models/MemoryMainRepository";

export class MainService {
  // 메모리 저장소
  static repository = new MemoryMainRepository();
  // 데이터베이스 이용시
  // static repository = new DbMainRepository();

  static async getAllCourse() {
    return await this.repository.findAllCourse();
  }

  static async updateVisitedStatus(code) {
    const course = await this.repository.findOne(code);
    if (!course) throw Error.NOT_FOUND;
    if (course.visited === "Y") throw Error.CONFLICT;

    await this.repository.updateStatus(code);
  }
}
