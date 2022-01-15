const axios = require("axios");
const App = require("../App");

/*---------------配置-----------------*/
const api = {
  getTodayStatus: "/growth_api/v1/get_today_status",
  checkIn: "/growth_api/v1/check_in",
  getLotteryConfig: "/growth_api/v1/lottery_config/get",
  drawLottery: "/growth_api/v1/lottery/draw",
  dipLucky: "/growth_api/v1/lottery_lucky/dip_lucky",
};

class JueJin extends App {
  constructor(config) {
    super(config);
    this.axiosInstance = axios.create({
      baseURL: "https://api.juejin.cn",
      headers: {
        cookie: this.config,
      },
    });
    this.axiosInstance.interceptors.response.use(function (response) {
      const { data, status, statusText } = response;
      return data;
    });
  }
  // 签到
  async checkIn() {
    let { error, isCheck } = await this.getTodayCheckStatus();
    if (error) {
      this.executeResult.push(`查询签到失败:${error}`);
      return;
    }
    if (isCheck) {
      this.executeResult.push("今日已参与签到");
      return;
    }
    let { err_no, data } = await this.axiosInstance({
      url: api.checkIn,
      method: "post",
      headers: { cookie: this.cookie },
    });
    if (err_no) {
      this.executeResult.push(`今日掘金签到失败:${JSON.stringify(data)}`);
    } else {
      this.executeResult.push(`签到成功！当前积分：${data.sum_point}`);
    }
  }

  // 查询今日是否已经签到
  async getTodayCheckStatus() {
    let { err_no, err_msg, data } = await this.axiosInstance.get(
      api.getTodayStatus
    );
    return { error: err_no !== 0 && err_msg, isCheck: data };
  }

  // 抽奖
  async draw() {
    let { error, isDraw } = await this.getTodayDrawStatus();
    if (error) {
      this.executeResult.push("查询抽奖次数失败");
      return;
    }
    if (isDraw) {
      this.executeResult.push("今日已无免费抽奖次数");
      return;
    }
    let { err_no, data } = await this.axiosInstance.post(api.drawLottery);
    if (err_no) {
      this.executeResult.push("免费抽奖失败");
    } else {
      this.executeResult.push(`恭喜抽到：${data.lottery_name}`);
    }
  }

  // 获取今天免费抽奖的次数
  async getTodayDrawStatus() {
    let { err_no, data } = await this.axiosInstance.get(api.getLotteryConfig);
    if (err_no) {
      return { error: true, isDraw: false };
    } else {
      return { error: false, isDraw: data.free_count === 0 };
    }
  }

  // 沾喜气增加幸运值
  async dipLucky() {
    let { err_no, data } = await this.axiosInstance.post(api.dipLucky, {
      lottery_history_id: "7005733067977719816",
    });
    if (err_no !== 0) {
      this.executeResult.push("沾喜气失败");
    } else {
      if (!data.has_dip) {
        this.executeResult.push("沾喜气成功");
        await this.dipLucky();
      } else {
        this.executeResult.push("今天粘喜气次数已经用完");
      }
    }
  }

  async execute() {
    this.executeResult = ["掘金"];
    await this.checkIn();
    await this.dipLucky();
    await this.draw();
    return this.executeResult;
  }
}
module.exports = JueJin;
