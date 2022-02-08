const axios = require("axios");
module.exports = function createJkAxiosInstance(config) {
  const jkAxiosInstance = axios.create({
    baseURL: "https://time.geekbang.org/serv",
    headers: {
      Host: "time.geekbang.org",
      Origin: "https://time.geekbang.org",
      Referer:
        "https://time.geekbang.org/resource?plus=0&m=0&d=0&c=0&sort=2&order=desc",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    },
    //fiddler 代理
    // proxy: {
    //   host: "127.0.0.1",
    //   port: 8888,
    // },
  });
  jkAxiosInstance.interceptors.response.use(
    function (response) {
      const { data: responseData, status, statusText } = response;
      const { code, data, echo } = responseData;
      if (code === 0) {
        return data;
      } else {
        return Promise.reject(echo);
      }
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  return jkAxiosInstance;
};
