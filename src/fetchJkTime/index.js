const createJkAxiosInstance = require("../common/jkAxios");
const {
  fetchArticle,
  fetchM38U,
  clearBrowserAndPage,
} = require("./fetchArticle");
const { cookies_str } = require("./cookie");
const jkAxios = createJkAxiosInstance();

const Api = {
  getLectureInfo: "v3/column/info",
  getLectureList: "/v3/lecture/list",
  getArticles: "/v1/column/articles",
  getChapters: "/v1/chapters",
  getArticle: "/v1/article",
};

async function getLectureIds() {
  try {
    const { list } = await jkAxios.post(Api.getLectureList, {
      label_id: 0,
      type: 0,
    });
    return list.map((item) => item.pid);
  } catch (e) {
    console.log("获取课程失败", e);
    return [];
  }
}

async function getLecture(id) {
  const lecture = await jkAxios.post(Api.getLectureInfo, {
    product_id: id,
    with_recommend_article: false,
  });
  return lecture;
}

async function getChapters(cid) {
  const chapters = await jkAxios.post(Api.getChapters, {
    cid,
  });
  const map = {};
  chapters.map((chapter, index) => {
    map[chapter.id] = `${index + 1}-${chapter.title}`;
  });
  return map;
}

async function getArticleVideoM38U(id) {
  const { hls_videos } = await jkAxios.post(
    Api.getArticle,
    {
      id,
    },
    {
      headers: {
        cookie: cookies_str,
      },
    }
  );
  return hls_videos.hd.url;
}

async function getArticles(cid, chapterMap, lecture, isVideo) {
  if (isVideo) {
    console.log("视频课程，暂时不支持爬取");
    return;
  }
  const { list } = await jkAxios.post(Api.getArticles, {
    cid,
    order: "earliest",
    prev: 0,
    sample: false,
    size: 500,
  });
  for (let i = 0; i < list.length; i++) {
    list[i].chapterTitle = chapterMap[list[i].chapter_id] || "";
    list[i].lectureTitle = lecture.title || "";
    if (isVideo) {
      const m38u = await getArticleVideoM38U(list[i].id);
      await fetchM38U(m38u);
    } else {
      await fetchArticle(list[i]);
    }
  }
}

async function fetchLecture(cid) {
  const lecture = await getLecture(cid);
  console.log(`当前爬取课程名称<<${lecture.title}>>`);
  const chapterMap = await getChapters(cid);
  await getArticles(cid, chapterMap, lecture, lecture.is_video);
  console.log(`<<${lecture.title}>>爬取完成`);
}

async function startFetch() {
  console.log("开始爬取极客时间课程");
  const ids = await getLectureIds();
  for (let i = 0; i < ids.length; i++) {
    const cid = ids[i];
    try {
      await fetchLecture(cid);
    } catch (e) {
      console.log(`爬取${cid}出错`, e);
      break;
    }
  }
  await clearBrowserAndPage();
}

//startFetch();

module.exports = {
  fetchLecture,
  startFetch,
};
