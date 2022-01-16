const querystring = require("querystring");
const createJdAxiosInstance = require("../../../common/jdAxios");
const App = require("../App");
const api = {
  checkIn: "/client.action?functionId=signBeanAct",
};

class JD extends App {
  constructor(config) {
    super(config);
    this.axiosInstance = createJdAxiosInstance(this.config);
  }

  async checkIn() {
    let data;
    try {
      data = await this.axiosInstance.post(
        api.checkIn,
        querystring.stringify({
          body: '{"rnVersion":"4.7","fp":"-1","eid":"","shshshfp":"-1","userAgent":"-1","shshshfpa":"-1","referUrl":"-1","jda":"-1"}',
          build: "167903",
          client: "apple",
          clientVersion: "10.3.0",
          d_brand: "apple",
          d_model: "iPhone10,3",
          ef: 1,
          eid: this.config.eid,
          ep: this.config.ep,
          sign: "eb9cc807c352b682d3728219d5468c85",
          ext: '{"prstate":"0"}',
          isBackground: "N",
          joycious: 72,
          lang: "zh_CN",
          networklibtype: "JDNetworkBaseAF",
          networkType: "wifi",
          partner: "apple",
          rfs: "0000",
          scope: "0",
          st: 1640619617861,
          sv: "121",
          uemps: "0-0",
        })
      );
      const { status } = data;
      //console.log(data);
      if (status === "1") {
        this.executeResult.push(`签到成功`);
      } else if (status === "2") {
        this.executeResult.push(`已经签到过`);
      } else {
        this.executeResult.push(`未处理返回`);
      }
    } catch (e) {
      this.executeResult.push(`请求失败`);
      console.log(e);
    }
  }

  shake() {}

  async execute() {
    this.executeResult = ["京东"];
    await this.checkIn();
    await this.shake();
    return this.executeResult;
  }
}

module.exports = JD;
