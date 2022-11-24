const fn = {
  getName: (callback) => {
    const name = "Mike";
    setTimeout(() => {
      callback(name);
    }, 3000);
  },

  makeError: (callback) => {
    const name = "Mike";
    setTimeout(() => {
      throw new Error("서버 에러");
    }, 3000);
  },

  getAge: () => {
    const age = 30;
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(age);
      }, 3000);
    });
  },

  makeError2: () => {
    const age = 30;
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej("error");
      }, 3000);
    });
  },

  makeError3: () => {},
};

module.exports = { fn };
