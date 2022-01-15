const autoSignIn = require("./autoSignIn");
const secKill = require("./secKill");
exports.autoSignIn = async (event, context) => {
  await autoSignIn(event, context);
  return event;
};

exports.secKill = async (event, context) => {
  await secKill(event, context);
  return event;
};
