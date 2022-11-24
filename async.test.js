const { fn } = require("./async");

test("3초후에 받아온 이름은 Mike", (done) => {
  // 많이 사용되는 패턴은 callback을 사용하는 패턴일것임.
  // 근데 jest는 실행이 끝에 도달하게 되면 그대로 끝남.
  // 이 경우 test함수에 done이라는 콜백함수 하나 전달해줌.
  // done이 호출되기 전까지 jest는 기다리게 된다.
  function callback(name) {
    expect(name).toBe("Mike");
    done();
  }
  fn.getName(callback);
});

// 에러 발생 예정
test("3초후에 받아온 이름은 Mike", (done) => {
  // 예를 들어 API 에러를 감지하고 싶다면 try-catch로 감싸주면 됨.
  function callback(name) {
    try {
      expect(name).toBe("Mike");
      done();
    } catch (err) {
      done();
    }
  }
  fn.makeError(callback);
});

// promise 사용한다면, test함수에 done 사용 안해도 됨! 단, 꼭 return을 해 줘야함. 안그러면 제대로 동작 x
test("3초 후에 받아온 나이는 30", () => {
  return fn.getAge().then((age) => {
    expect(age).toBe(30);
  });
});

// resolves, rejects라는 Matcher도 있음.
test("resolves 사용해 받아온 3초 후에 받아온 나이는 30", () => {
  // 실패 확인하고싶다면 resolves자리에 rejects 넣으면 됨.
  return expect(fn.getAge()).resolves.toBe(30);
});

test("3초후에 에러가 납니다.", () => {
  return expect(fn.makeError2()).rejects.toMatch("error");
});

test("async/await 테스트 예시", async () => {
  const age = await fn.getAge();
  expect(age).toBe(30);
});

test("async/await 테스트 예시", async () => {
  await expect(fn.getAge()).resolves.toBe(30);
});

test("async/await 테스트 예시", async () => {
  await expect(fn.makeError2()).rejects.toMatch("error");
});
