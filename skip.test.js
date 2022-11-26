const { fn } = require("./fn");

let num = 0;

test("0 더하기 1은 1", () => {
  expect(fn.add(num, 1)).toBe(1);
});

test("0 더하기 2은 2", () => {
  expect(fn.add(num, 2)).toBe(2);
});

test("0 더하기 3은 3", () => {
  expect(fn.add(num, 3)).toBe(3);
});

// test.skip하면 그것만 단독 스킵 가능 (only 없을때 )
test.skip("0 더하기 4은 4", () => {
  expect(fn.add(num, 4)).toBe(4);
  num = 10;
});

// test.only를 하게 되면 이 케이스만 테스트를 하는 것을 확인할 수 있음.
test.only("0 더하기 5은 5", () => {
  expect(fn.add(num, 5)).toBe(5);
});
