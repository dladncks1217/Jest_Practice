const { fn } = require("./fn");

// 밖에있는 beforeEach는 항상 안에있는 beforeEach보다 먼저 실행된다.
beforeAll(() => console.log("밖 beforeAll")); // 1
beforeEach(() => console.log("밖 beforeEach")); // 2, 6
afterAll(() => console.log("밖 afterAll")); // 마지막
afterEach(() => console.log("밖 afterEach")); // 4, 10

test("0 + 1 = 1", () => {
  expect(fn.add(0, 1)).toBe(1); // 3
});

describe("Car 관련 작업", () => {
  beforeAll(() => console.log("안 beforeAll")); // 5
  beforeEach(() => console.log("안 beforeEach")); // 7
  afterAll(() => console.log("안 afterAll")); // 9
  afterEach(() => console.log("안 afterEach")); // 마지막 -1

  test("0 + 1 = 1", () => {
    expect(fn.add(0, 1)).toBe(1); // 8
  });
});
