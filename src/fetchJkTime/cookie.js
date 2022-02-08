const cookies_str =
  "gksskpitn=8978bd77-cf03-45e2-980c-f70c54975600; LF_ID=1643735877840-6401508-5177338; _ga=GA1.2.1484484681.1643737984; GCID=6b1bb83-1922691-727cbe3-c9810a5; GRID=6b1bb83-1922691-727cbe3-c9810a5; orderInfo={%22list%22:[{%22count%22:1%2C%22image%22:%22https://static001-test.geekbang.org/resource/image/fb/b8/fbd834a6a61e043b770005a217e831b8.png%22%2C%22name%22:%22%E8%B6%85%E7%BA%A7%E4%BC%9A%E5%91%98%22%2C%22sku%22:100104401%2C%22price%22:{%22sale%22:49900%2C%22market%22:69900}}]%2C%22invoice%22:false%2C%22app_id%22:3%2C%22ignore%22:%22service|student%22%2C%22exitPayTips%22:{%22isPvip%22:true}%2C%22backLabel%22:{%22scene%22:%22isPvip%22}%2C%22shareSaleCode%22:%222%252F5MwqymgMN7RAjEHULcNDXS2ODbUzKHnpwzntW8f7k%253D%22}; _gid=GA1.2.926981217.1643870266; gk_exp_uid=NWIzOWJkNGNhNzA2YzdkYTg3ZGU3NWY0YmY4N2FlOTE=|1643975347813766509|6edccbe4eca2a7bae4406194a7a5fd8ae7d4f15ceb413c3c78e095d8214b4a5f; GCESS=BgME1oH_YQ0BAQYElR.zRgwBAQoEAAAAAAEIt1csAAAAAAAHBE_hqd8EBAAvDQACBNaB_2ELAgYACQEBCAEDBQQAAAAA; Hm_lvt_59c4ff31a9ee6263811b23eb921a5083=1643870266,1643870295,1643870324,1644134866; Hm_lvt_022f847c4e3acd44d4a2481d9187f1e6=1643870324,1643967529,1644134839,1644134866; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%222906039%22%2C%22first_id%22%3A%2217ec419bef0117b-024b68dbcf5138-f791539-921600-17ec419bef1985%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Ftime.geekbang.org%2Fcolumn%2Farticle%2F39922%22%2C%22%24latest_utm_source%22%3A%22geektime-search-pc%22%2C%22%24latest_utm_medium%22%3A%2248%22%2C%22%24latest_utm_campaign%22%3A%22group-free%22%2C%22%24latest_utm_content%22%3A%22textlink%22%2C%22%24latest_utm_term%22%3A%22geektime-search-pc%22%7D%2C%22%24device_id%22%3A%2217eb64b09575b9-05929555f67aae-f791539-921600-17eb64b0958f21%22%7D; _gat=1; gk_process_ev={%22referrer%22:%22https://time.geekbang.org/resource%22%2C%22utime%22:1644141150187%2C%22count%22:3%2C%22referrerTarget%22:%22%22%2C%22target%22:%22%22}; Hm_lpvt_59c4ff31a9ee6263811b23eb921a5083=1644141182; Hm_lpvt_022f847c4e3acd44d4a2481d9187f1e6=1644141182; SERVERID=1fa1f330efedec1559b3abbcb6e30f50|1644141188|1644141081";

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
