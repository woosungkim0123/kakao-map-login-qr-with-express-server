import { MemoryMainRepository } from "../models/MemoryMainRepository.js";

export class MainService {
  static repository = new MemoryMainRepository();

  static async getAllCourse() {
    return await this.repository.findAllCourse();
  }

  static async updateVisitedStatus(code) {
    const course = await this.repository.findOne(code);
    if(!course) throw { status : 404, code : "NOT_FOUND", message : "요청하신 QR 정보가 존재하지 않습니다." };
    if(course.visited === "Y") throw { status : 409, code : "CONFLICT", message : "이미 완료된 코스입니다." };
    await this.repository.updateStatus(code);
    const a = await this.repository.findAllCourse();
    console.log(a)
  }
}
