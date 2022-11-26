const user = require("./mock");

const mockFn = jest.fn();

mockFn();
mockFn(1);

test("함수는 2번 호출됩니다.", () => {
  expect(mockFn.mock.calls.length).toBe(2);
});

test("2번째로 호출된 함수에 전달된 첫 번째 인수는 1 입니다.", () => {
  expect(mockFn.mock.calls[1][0]).toBe(1);
});

const mockFn2 = jest.fn();

// 숫자 들어있는 배열 반복하면서 1증가시켜준 값을 콜백함수에 전달해주는 함수임
function forEachAdd1(arr) {
  arr.forEach((num) => {
    // fn(num+1) -> 여기에 들어갈 함수 아직 작성 안했음. -> 함수먼저 작성하지 말고 빠르고 간단한 테스트 위해 mock함수 사용.
    mockFn2(
      (() => {
        return num + 1;
      })()
    );
  });
}

forEachAdd1([10, 20, 30]);

test("함수 호출은 3번 됩니다.", () => {
  expect(mockFn2.mock.calls.length).toBe(3);
});

test("전달된 값은 11, 21, 31 입니다.", () => {
  expect(mockFn2.mock.calls[0][0]).toBe(11);
  expect(mockFn2.mock.calls[1][0]).toBe(21);
  expect(mockFn2.mock.calls[2][0]).toBe(31);
});

const mockFn3 = jest.fn((num) => num + 1);

mockFn3(10);
mockFn3(20);
mockFn3(30);

test("함수 호출은 3번 됩니다.", () => {
  console.log(mockFn3.mock.results);
  expect(mockFn3.mock.calls.length).toBe(3);
});

test("10에서 1 증가한 값이 반환된다.", () => {
  expect(mockFn3.mock.results[0].value).toBe(11);
  expect(mockFn3.mock.results[1].value).toBe(21);
  expect(mockFn3.mock.results[2].value).toBe(31);
});

// 리턴값 일부 고정시켜서 그 값 무조건 나오도록 하기 -> mockReturnValueOnce() 사용
const mockFn4 = jest.fn();

mockFn4
  .mockReturnValueOnce(10)
  .mockReturnValueOnce(20)
  .mockReturnValueOnce(30)
  .mockReturnValueOnce(40);

mockFn4();
mockFn4();
mockFn4();
mockFn4();

test("결과 확인용", () => {
  console.log(mockFn4.mock.results);
  expect("dd").toBe("dd");
});

// mock함수 예시
const mockFn5 = jest.fn();

mockFn5
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true);

// 홀수만 리턴하는 함수
const result = [1, 2, 3, 4, 5].filter((num) => mockFn5(num));

test("홀수는 1, 3, 5", () => {
  expect(result).toStrictEqual([1, 3, 5]);
});

// 비동기 mock 함수 흉내내기 (mockResolvedValue 사용해야 함.)

const mockFn6 = jest.fn();

mockFn6.mockResolvedValue({ name: "Mike" });

test("받아온 이름은 Mike", () => {
  mockFn6().then((res) => {
    expect(res.name).toBe("Mike");
  });
});

// 유저 생성 사용 예시

jest.mock("./mock.js");

// user.createUser사용 시 mockReturnValue를 통해 실제 user.createUser는 호출되지 않는다.
user.createUser.mockReturnValue({ name: "Mike" });
// 다만 {name:"Mike"}를 반환해주는 mock함수가 동작할 뿐임.

test("유저를 만든다", () => {
  const newuser = user.createUser("Mike");
  expect(newuser.name).toBe("Mike"); // -> 모킹했기 때문에 함수가 실제로 호출되지 않는다!
});

// 함수 몇번 호출된건지, 전달받은게 있는지, 마지막 함수에서 특정 값 받았는지 여부 확인 메서드
const mockFn7 = jest.fn();

mockFn7(10, 20);
mockFn7();
mockFn7(30, 40);

test("한 번 이상 호출?", () => {
  expect(mockFn7).toBeCalled();
});

test("정확히 3번 호출?", () => {
  expect(mockFn7).toBeCalledTimes(3);
});

test("10이랑 20 전달받은 함수 있는지?", () => {
  expect(mockFn7).toBeCalledWith(10, 20);
});

test("마지막 함수는 30이랑 40 받았는지?", () => {
  expect(mockFn7).lastCalledWith(30, 40);
});
