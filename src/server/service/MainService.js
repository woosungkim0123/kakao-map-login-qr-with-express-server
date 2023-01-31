import { MemoryMainRepository } from "../models/MemoryMainRepository.js";

export static class MainService {
  static repository = new MemoryMainRepository();

  static async getAllCourse() {
    return await this.repository.findAllCourse();
  }
}
