const { fn } = require("./beforeAfterTest");

let num = 0;

// 각 테스트 전체 실행 전
beforeAll(async () => {
  user = await fn.connectUserDB();
});

// 각 테스트 전체 실행 후
afterAll(() => {
  return fn.disconnectDB();
});

// 값이 계속 초기화됨.
test("이름은 Mike", () => {
  expect(user.name).toBe("Mike");
});

test("나이는 30", () => {
  expect(user.age).toBe(30);
});

test("성별은 남성", () => {
  expect(user.gender).toBe("male");
});

describe("Car 관련 직업", () => {
  // 각 테스트 전체 실행 전
  beforeAll(async () => {
    car = await fn.connectUserCarDB();
  });

  // 각 테스트 전체 실행 후
  afterAll(() => {
    return fn.disconnectCarDB();
  });
  let car;
  test("차 이름은 z4", () => {
    expect(car.name).toBe("z4");
  });

  test("브랜드는 bmw", () => {
    expect(car.brand).toBe("bmw");
  });

  test("색상은 red", () => {
    expect(car.color).toBe("red");
  });
});

// // 각 테스트 시작 전 실행되는 코드
// beforeEach(async () => {
//   user = await fn.connectUserDB();
// });

// // 테스트 직후 실행되는 코드
// afterEach(() => {
//   return fn.disconnectDB();
// });

// test("0 더하기 2은 2이야", () => {
//   num = fn.add(num, 2);
//   expect(num).toBe(2);
// });

// test("0 더하기 3은 3이야", () => {
//   num = fn.add(num, 3);
//   expect(num).toBe(3);
// });
