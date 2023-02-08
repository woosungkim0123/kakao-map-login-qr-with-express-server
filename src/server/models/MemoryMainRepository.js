let courses = [
  { no: 1,
    name: "영진",
    code: "YUNGJIN",
    latitude: 35.87555082502176,
    longitude: 128.6816374505427,
    visited: "N",
  },
  {
    no: 2,
    name: "국밥",
    code: "GUKBOB",
    latitude: 35.87583123506328,
    longitude: 128.6817532073904,
    visited: "N",
  },
  {
    no: 3,
    name: "흑돼지",
    code: "JEJUPIG",
    latitude: 35.87664030121222,
    longitude: 128.68155341448463,
    visited: "N",
  },
  {
    no: 4,
    name: "지하철",
    code: "SUBWAY2",
    latitude: 35.87623769570281,
    longitude: 128.68104555230227,
    visited: "N",
  },
];

export class MemoryMainRepository {
  
  async findAllCourse() {
    return courses;
  }
  async findOne(code) {
    return courses.find((e) => e.code === code);
  }
  async updateStatus(code) {
    courses = courses.map((course) => course.code === code ? { ...course, visited: "Y" } : course );
  }
}
