import { MemoryMainRepository } from "../models/MemoryMainRepository";

export class MainService {
  static repository = new MemoryMainRepository();

  static async getAllCourse() {
    return await this.repository.findAllCourse();
  }
}
