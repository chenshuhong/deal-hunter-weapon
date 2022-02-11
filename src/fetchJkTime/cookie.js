const cookies_str =
  "LF_ID=1641821903134-6427875-9992836; _ga=GA1.2.912486374.1641821903; GCID=3b853f3-a614a64-59c3216-e62aab3; GRID=3b853f3-a614a64-59c3216-e62aab3; gksskpitn=2be5641b-9aed-4ecf-9ee8-4da21ffd94c0; _gid=GA1.2.301220025.1644478032; MEIQIA_TRACK_ID=24uQeVmXsNqXDHrjZ8G4fIgYw20; MEIQIA_VISIT_ID=24uQeRtaazjykQhX0BmAR3N8eWJ; gk_exp_uid=Mzg3NjJhMGI2MzI4ZGU0YTEwNjAwOGMzNzJmOWE0Y2Q=|1644478113383755378|032c074791974d2e7563168cd9295e07cd51f662e9d5f882d3177bd0d91678e5; GCESS=BgYExmeMRwkBAQoEAAAAAAUEAAAAAAgBAwMEIcMFYg0BAQEIEWMsAAAAAAACBCHDBWILAgYABAQALw0ABwTmfQPvDAEB; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1644478032,1644478067,1644544780,1644544803; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1644478042,1644478067,1644544780,1644544803; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222908945%22%2C%22first_id%22%3A%2217ee2878d1c78b-0a84abb0f08809-576153e-2073600-17ee2878d1d11d4%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Faccount.infoq.cn%2F%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2F%22%2C%22%24latest_utm_source%22%3A%22related_read%22%2C%22%24latest_utm_medium%22%3A%22article%22%2C%22%24latest_utm_term%22%3A%22related_read%22%7D%2C%22%24device_id%22%3A%2217e443619389bf-04bfa54214d99b-4303066-2073600-17e44361939ea8%22%7D; _gat=1; gk_process_ev={%22count%22:6%2C%22utime%22:1644544796076%2C%22referrer%22:%22https://time.geekbang.org/%22%2C%22target%22:%22%22%2C%22referrerTarget%22:%22page_geektime_login%22}; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1644545133; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1644545133; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1644545133|1644544779";

const addCookies = async (page, domain) => {
  let cookies = cookies_str.split(";").map((pair) => {
    let name = pair.trim().slice(0, pair.trim().indexOf("="));
    let value = pair.trim().slice(pair.trim().indexOf("=") + 1);
    return { name, value, domain };
  });
  await Promise.all(
    cookies.map((pair) => {
      return page.setCookie(pair);
    })
  );
};

module.exports = { addCookies, cookies_str };
