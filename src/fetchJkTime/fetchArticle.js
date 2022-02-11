const puppeteer = require("puppeteer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const axios = require('axios')
const { addCookies } = require("./cookie");
let browser, page;

function mkdir(paths) {
  const p = path.resolve(process.cwd(), ...paths);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
  return p;
}

function trimString(str) {
  return str
    .replace(/\s+/g, "")
    .replace(/[?*:><"]/g, "")
    .replace(/[|\/\\]/g, "-")
    .replace(/[\b]/g, "");
}

async function fetchM38U(url) {
  return new Promise((resolve, reject) => {
    ffmpeg(url)
      .on("error", (error) => {
        reject(new Error(error));
      })
      .on("progress", function (progress) {
        console.log("下载进度: 已完成 " + progress.percent.toFixed(2) + "%。");
      })
      .on("end", () => {
        console.log("下载完成");
        resolve();
      })
      .output("test.mp4")
      .run();
  });
}

async function fetchArticle({ id, article_title, chapterTitle, lectureTitle,audio_download_url }) {
  chapterTitle = trimString(chapterTitle);
  article_title = trimString(article_title);
  lectureTitle = trimString(lectureTitle);
  console.log(`正在爬取<<${article_title}>>`);
  const paths = ["dist", lectureTitle, chapterTitle].filter((item) => item);
  const dirPath = mkdir(paths);
  const pdfPath = path.resolve(dirPath, `${article_title}.pdf`);
  const audioPath = path.resolve(dirPath,`${article_title}.mp3`)
  await fetchAudio(article_title,audioPath,audio_download_url)
  if (fs.existsSync(pdfPath)) {
    console.log(`<<${article_title}>>已经创建过pdf，跳过生成`);
    return;
  }
  await initBrowserAndPage();
  await page.goto(`https://time.geekbang.org/column/article/${id}`, {
    waitUntil: "networkidle0",
  });
  await page.$eval("body", (el) => {
    const pdfHtml = el.querySelectorAll(".simplebar-content")[1].innerHTML;
    el.innerHTML = pdfHtml;
  });
  await page.pdf({ path: pdfPath, format: "a4" });
  console.log(`爬取<<${article_title}>>成功`);
}

async function fetchAudio(article_title,audioPath,audio_download_url){
  if (fs.existsSync(audioPath)) {
    console.log(`<<${article_title}>>已经创建过mp3，跳过生成`);
    return;
  }
  debugger
  const {data} = await axios.get(audio_download_url,{
    responseType:'arraybuffer'
  })
  fs.writeFileSync(audioPath,data)
  console.log(`爬取<<${article_title}>>音频成功`);
}

async function initBrowserAndPage() {
  if (!browser) {
    browser = await puppeteer.launch({
      defaultViewport: {
        width: 1280,
        height: 800,
      },
    });
  }
  if (!page) {
    page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/6.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36"
    );
    await addCookies(page, ".time.geekbang.org");
    // page.setCookies();
  }
}

async function clearBrowserAndPage() {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }
}

module.exports = { fetchArticle, fetchM38U, clearBrowserAndPage };
