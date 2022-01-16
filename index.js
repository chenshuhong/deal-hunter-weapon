const autoSignIn = require("./src/autoSignIn");
const {secKill,appoint} = require("./src/secKill");

// 自动签到
exports.autoSignIn = async (event, context) => {
  await autoSignIn(event, context);
  return event;
};

//预约
exports.appoint =  async (event,context) => {
  await appoint(event,context)
}


// 抢购
exports.secKill = async (event, context) => {
  await secKill(event, context);
  return event;
};
