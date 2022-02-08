const { fetchLecture, startFetch } = require("../../src/fetchJkTime");
const {
  fetchArticle,
  clearBrowserAndPage,
  fetchM38U,
} = require("../../src/fetchJkTime/fetchArticle");

// (async () => {
//   await fetchArticle({
//     id: 84351,
//     article_title: "05 | 敏捷开发到底是想解决什么问题？",
//   });
//   await clearBrowserAndPage();
// })();

// (async () => {
//   await fetchLecture(100020001);
// })();

(async () => {
  await startFetch();
})();
