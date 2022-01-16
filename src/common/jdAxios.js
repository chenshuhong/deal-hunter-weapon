const axios = require("axios");
module.exports = function createJdAxiosInstance(config) {
  const jdAxiosInstance = axios.create({
    baseURL: "https://api.m.jd.com",
    headers: {
      "User-Agent": "JD4iPhone/167169 (iPhone; iOS 13.4.1; Scale/3.00)",
      Host: "api.m.jd.com",
      Cookie: config.cookie,
      "J-E-H": config.jeh,
      "J-E-C": config.jec,
      jda: config.jda,
    },
    //fiddler 代理
    proxy: {
      host: "127.0.0.1",
      port: 6868,
    },
  });
  jdAxiosInstance.interceptors.response.use(function (response) {
    const { data: responseData, status, statusText } = response;
    const { code, data, echo } = responseData;
    if (code === "0") {
      return data;
    } else {
      return Promise.reject(echo);
    }
  });
  return jdAxiosInstance;
};
