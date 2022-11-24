// https://jestjs.io/docs/en/expect
const { fn2 } = require("./fn");

test("이름과 나이를 전달받아서 객체를 반환해줘 toEqual 사용", () => {
  // 객체나 배열은 재귀적으로 돌면서 값을 확인해야하기에, toEqual을 써 주어야 한다.
  expect(fn2.makeUser("Mike", 30)).toEqual({
    name: "Mike",
    age: 30,
  });
});

// gender라는 프로퍼티가 undefined지만, 체크를 해주는 게 맞을거임. 보다 엄격하게 테스트하고자 하면 toStrictEqual 쓰자.
test("이름과 나이를 전달받아서 객체를 반환해줘 - strictEqual사용", () => {
  // 객체나 배열은 재귀적으로 돌면서 값을 확인해야하기에, toEqual을 써 주어야 한다.
  expect(fn2.makeUser("Mike", 30)).toStrictEqual({
    name: "Mike",
    age: 30,
    gender: undefined,
  });
});

test("toBeNull, toBeUndefined, toBeDefined, toBeTruthy, toBeFalsy 사용 예시", () => {
  expect(null).toBeNull();
  expect(fn2.add(1, -1)).toBeFalsy();
  expect(fn2.add("hello", "world")).toBeTruthy();
  expect(undefined).toBeUndefined();
  expect("qwer").toBeDefined();
});

// toBeGreaterThan, toBeGreaterThanOrEqual, toBeLessThan, toBeLessThanOrEqual -> 이상, 이하, 초과, 미만 판별
test("ID는 10자 이하여야 합니다.", () => {
  const id = "THE_BLACK";
  expect(id.length).toBeLessThanOrEqual(10);
});

// js는 소수점더하기 제대로 계산 못함.
// 소수를 이진수로 변환하면 몇몇 값은 무한 소수가 되어버려서 뒷부분을 자르고 표현됨 -> toBeCloseTo 를사용하면 됨.
test("0.1 더하기 0.2는 0.3 입니다.", () => {
  expect(fn2.add(0.1, 0.2)).toBeCloseTo(0.3);
});

// 문자열 관련 테스트 - 정규 표현식 사용
test("Hello World에 a란 글자가 있나?", () => {
  expect("Hello World").toMatch(/H/); // -> 대소문자 당연히 구별.
  // 대소문자 구별 위해서는 /H/i 와 같이 뒤에 i 붙이면 됨.
});

// 배열에서 특정 요소가 존재하는가?
test("유저 리스트에 Mike가 있는가?", () => {
  const user = "Mike";
  const userList = ["Tom", "Jane", "Mike", "Kai"];
  expect(userList).toContain(user);
});

// 예외 발생 확인
test("이거 에러 나나요?", () => {
  expect(() => fn2.throwErr()).toThrow();
  expect(() => fn2.throwErr()).toThrow("xx"); // 어떤 에러인지 특정 오류를 확인하기 위해서는 인수에 내용을 전달하면 됨. (인수랑 다르면 테스트 실패임.)
});
