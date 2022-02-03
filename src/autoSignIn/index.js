const fs = require("fs");
const path = require("path");
const { sendEmailFromQQ } = require("./util/emailUtils");
const apps = require("./app");

const generateHtml = (executeResults) => {
  let html = "";
  executeResults.map((appExecuteResult) => {
    let appHtml = "";
    appExecuteResult.map((item) => {
      appHtml += item;
      appHtml += "<br>";
    });
    appHtml += "========================";
    appHtml += "<br>";
    html += appHtml;
  });
  return html;
};

module.exports = async (event, context) => {
  const configs = fs.readdirSync(path.resolve(process.cwd(), "config"));
  for (let i = 0; i < configs.length; i++) {
    let name = configs[i].split(".")[0];
    if (name === "config") {
      name = "";
    }
    const config = require(path.resolve(process.cwd(), "config", configs[i]));
    const AppKeys = Object.keys(apps);
    const executeResults = [];
    for (let j = 0; j < AppKeys.length; j++) {
      const AppKey = AppKeys[j];
      if (!config[AppKey]) {
        continue;
      }
      const appInstance = new apps[AppKey](config[AppKey]);
      try {
        executeResults.push(await appInstance.execute());
      } catch (e) {
        console.log(e);
      }
    }
    const html = generateHtml(executeResults);
    if (event) {
      await sendEmailFromQQ("每日签到", html, config.email);
    }
    console.log(name + "签到情况");
    console.log(executeResults.join(";"));
    console.log("============");
  }
};
