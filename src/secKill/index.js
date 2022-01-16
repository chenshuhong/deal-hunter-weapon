const createJdAxiosInstance = require("../common/jdAxios");
const querystring = require("querystring");
const { jd } = require("../../config/csh.config");
const jdAxiosInstance = createJdAxiosInstance(jd);
const Api = {
  appoint: "/client.action?functionId=appoint",
};
// 对商品进行预约
exports.appoint = async (event, context) => {
  let data;
  try {
    data = await jdAxiosInstance.post(
      Api.appoint,
      querystring.stringify({
        body: '{"isShowCode":"0","autoAddCart":"1","check":"0","skuId":"100008411859","type":"4","appointMoreTimeFlag":false,"mad":"0"}',
        build: "167922",
        client: "apple",
        clientVersion: "10.3.2",
        d_brand: "apple",
        d_model: "iPhone10,3",
        ef: 1,
        eid: jd.eid,
        ep: jd.ep,
        ext: '{"prstate":"0","pvcStu":"1"}',
        isBackground: "N",
        joycious: 71,
        lang: "zh_CN",
        networklibtype: "JDNetworkBaseAF",
        networkType: "wifi",
        partner: "apple",
        rfs: "0000",
        scope: "01",
        sign: "a818b9ffd7f71bd9282cae9cf9598544",
        st: 1642329894506,
        sv: "110",
        uemps: "0-0",
        uts: "0f31TVRjBStbllmYJH6D3Q/d/9FKk8hcOcU9Sf9hb2BjilqAfvbKI/sjVxHR0CIaeidvfhkkEPB5mKgMAd6oeH/ND/ve0vjlOCanO6TRPX2ySHdhACy7KZFXl7a9OdfHH4Zu9paRcz9aCslZq2s4KSJ8G+9XteEyRfQf24QekxJSXCNu24ni+n+JYvn4G73O0U48RNB3SXTDX58264TlMg==",
      }),
      {
        headers: {
          "Activity-Path": "http://coupon.m.jd.com/seckill/seckillList",
          unpl: "JF8EAKJnNSttD0MHURoEH0cZSVlQW10ISx8GP2MAAFtdQlYCSFBJFxF7XlVdXhRKFx9vZxRXX1NOXQ4aCysiEEpcVlxYCkwfA19XNVddaEpkBRwHGxoQTFxdWVQMThIAZ2INU1tbe2QCGwsrIiBOXFVfXw9CFgtsVwRkX1lKVwwSAB0REXsWOl8QCEwSA2dnAlVUX0JQAB4BExcYTFtXbl8ISxUFX2Q",
        },
      }
    );
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

// 对商品进行秒杀
exports.secKill = async (event, context) => {
  console.log(event, context);
};
