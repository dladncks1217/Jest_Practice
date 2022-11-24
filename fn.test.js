const { fn } = require("./fn");

test("1은 1이야", () => {
  expect(1).toBe(1);
});

test("2 더하기 3은 5야.", () => {
  expect(fn.add(2, 3)).toBe(5);
});

test("3 더하기 3은 5가 아니야.", () => {
  expect(fn.add(3, 3)).not.toBe(5); // toBe 부분에서 사용하는 함수를 "Matcher"라고 한다.
  // toBe는 숫자, 문자 등 primitive Type 값 비교 시 사용.
});
