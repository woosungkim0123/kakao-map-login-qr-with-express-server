let memoryNo = 2;
let users = [
  { 
    no: 1,
    name: "김철수",
    id: "test",
    pw: "$2b$08$xMyGa3P7wVl6/mHqfXG0VuwMibd0g0hihVtZEndIeOl1qXj44CHlO", // 123456
  },
];
export class MemoryUsersRepository {
  async findById(id) {
    return users.find((user) => user.id === id);
  }
  async save({id, pw, name}) {
    users.push({ no : memoryNo, name, id, pw });
    memoryNo++;
  }
}
