const path = require("path");
// http://blog.shaochuancs.com/about-error-capturestacktrace/
// 获取调用栈信息
function extractCallDir() {
  const obj = {};
  Error.captureStackTrace(obj);
  // 在各个app模块中 调用 构造函数
  // 将会排在调用栈中的第四个，也就是 obj.stack.split('\n')[3]
  const callSite = obj.stack.split("\n")[3];

  // the regexp for the stack when called inside a named function
  const namedStackRegExp = /\s\((.*):\d+:\d+\)$/;
  // the regexp for the stack when called inside an anonymous
  const anonymousStackRegExp = /at (.*):\d+:\d+$/;

  let matchResult = callSite.match(namedStackRegExp);
  if (!matchResult) {
    matchResult = callSite.match(anonymousStackRegExp);
  }

  const fileName = matchResult[1];
  // 获取对应文件的目录
  return path.dirname(fileName);
}

class App {
  constructor(config) {
    this.executeResult = [];
    this.config = config;
  }
}

module.exports = App;
