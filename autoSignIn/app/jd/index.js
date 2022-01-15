const axios = require("axios");
const querystring = require("querystring");
const App = require("../App");
const api = {
  checkIn: "/client.action?functionId=signBeanAct",
};

class JD extends App {
  constructor(config) {
    super(config);
    this.axiosInstance = axios.create({
      baseURL: "https://api.m.jd.com",
      headers: {
        "User-Agent": "JD4iPhone/167169 (iPhone; iOS 13.4.1; Scale/3.00)",
        Host: "api.m.jd.com",
        Cookie: this.config.cookie,
        "J-E-H": this.config.jeh,
        "J-E-C": this.config.jec,
      },
      // fiddler 代理
      // proxy: {
      //   host: "127.0.0.1",
      //   port: 6868,
      // },
    });
    this.axiosInstance.interceptors.response.use(function (response) {
      const { data: responseData, status, statusText } = response;
      const { code, data } = responseData;
      //console.log(response);
      //console.log(responseData);
      if (code === "0") {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
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
          eid: "eidI26E60113OUNEMEM1MkItNDVBOC00Mg==VY8MfHo7p/kBlRwJwlqILmlikBgIc+vKAs7cwTCX6y0vEFp54SSFmHXwNHhGHRTH1U11IBgLjwsuwkC7",
          ep: '{"ciphertype":5,"cipher":{"screen":"CJOyDIeyDNC2","area":"CJvpCJYmCV81CNS1EV81CNGyCm==","wifiBssid":"DQPvDzc1DJvtENrsYWDtCJczEWVrYwU3Y2GyZtUmD2Y=","osVersion":"CJGkCm==","uuid":"aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09","adid":"C0DPG0C0DzcjCNO1Gy00DJTQBUO4HJKjHNdMCtDPHtK1G0Y3","openudid":"ENU2CtDwZwC5ZWYyZwGnZQCmCJO1ZJCnCNDrCQVrZNOnC2VwDWZwYG=="},"ts":1640618677,"hdid":"JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=","version":"1.0.3","appname":"com.360buy.jdmobile","ridx":-1}',
          ext: '{"prstate":"0"}',
          isBackground: "N",
          joycious: 72,
          lang: "zh_CN",
          networklibtype: "JDNetworkBaseAF",
          networkType: "wifi",
          partner: "apple",
          rfs: "0000",
          scope: "0",
          sign: "eb9cc807c352b682d3728219d5468c85",
          st: 1640619617861,
          sv: "121",
          uemps: "0-0",
          uts: "0f31TVRjBStfMwHXHyWm7jqAlxM8hu0vlQfuaeqyzQm5HS1pFa0bWBh3HxJIF/LmN6rcxTnyLl42921hRjwcQmbNax039xbZ5WZLOhmgRpnP6/CjZPWm5yte8r9QdarzsL+h7Hi4qYPf+KfhW+rThv5FOwUK2umUYG/LkZB6m07s6DAlhdUoA6497fg3s/z3HgWQPEOPYpI28Mw1EM13JA==",
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
