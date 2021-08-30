const puppeteer = require("puppeteer");
const scrollPageToBottom = require("puppeteer-autoscroll-down");

async function scrapeLeaguePatches(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  // loops while next page button exists
  while (
    (await page.click(
      "#gatsby-focus-wrapper > div > div.style__Wrapper-sc-1ynvx8h-0.style__ResponsiveWrapper-sc-1ynvx8h-6.gLoTys.eELrEI > div > div.style__LoadMoreContainer-sc-1ynvx8h-4.gaHuXn > button"
    )) === !null
  ) {
    await scrollPageToBottom(page);

    await page.click(
      "#gatsby-focus-wrapper > div > div.style__Wrapper-sc-1ynvx8h-0.style__ResponsiveWrapper-sc-1ynvx8h-6.gLoTys.eELrEI > div > div.style__LoadMoreContainer-sc-1ynvx8h-4.gaHuXn > button"
    );
  }

  await page.waitForTimeout(2500);

  const els = await page.$$("ol li");

  const patchNotes = [];

  for (let i = 0; i < els.length; i++) {
    const img = await els[i].$eval("img", (i) => i.getAttribute("src"));

    const h2 = await els[i].$eval("h2", (h) => h.innerText);

    const link = await els[i].$eval("a", (a) => a.getAttribute("href"));

    const time = await (
      await els[i].$eval("time", (d) => d.getAttribute("datetime"))
    ).slice(0, 10);

    const date = new Date(time);

    patchNotes.push({ title: h2, img: img, link: link, date: date });
  }

  browser.close();

  return { patchNotes };
}

async function scrapeWarcraftPatches(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1000 });
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  // loops while next page button exists
  while (
    (await page.click(
      "#main > div > div.Pane-content > div > div.Pane-content > div > div.align-right > div > div:nth-child(2) > a > div > div > div"
    )) === !null
  ) {
    await scrollPageToBottom(page);

    await page.click(
      "#main > div > div.Pane-content > div > div.Pane-content > div > div.align-right > div > div:nth-child(2) > a > div > div > div"
    );
  }

  await scrollPageToBottom(page);

  await page.waitForTimeout(2500);

  const els = await page.$$(
    "#main > div > div.Pane-content > div > div.Pane-content > div > div.padding-bottom-huge > div.List--vertical.List--separatorAll.List--full > div > div > div > div"
  );

  const patchNotes = [];

  for (let i = 0; i < els.length; i++) {
    const img = await els[i].$eval("img", (i) => i.getAttribute("src"));

    const h2 = await els[i].$eval("div.NewsBlog-title", (h) => h.innerText);

    const link = await els[i].$eval("a", (a) => a.getAttribute("href"));

    const time = await (
      await els[i].$eval("time", (d) => d.getAttribute("datetime"))
    ).slice(0, 10);

    const date = new Date(time);

    patchNotes.push({ title: h2, img: img, link: link, date: date });
  }

  browser.close();

  return { patchNotes };
}

async function scrapeHeartstonePatches(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  // await page.evaluate((_) => {
  //   window.scrollTo(0, 0);
  // });

  while (
    (await page.click(
      "#NewsHome > div > div.ContentSection > div.NewsHomeApp__LoadMoreContainer-sc-1f4x52y-4.jEyIwT > button"
    )) === !null
  ) {
    await scrollPageToBottom(page);

    await page.click(
      "#NewsHome > div > div.ContentSection > div.NewsHomeApp__LoadMoreContainer-sc-1f4x52y-4.jEyIwT > button"
    );
  }

  await page.waitForTimeout(2500);

  const els = await page.$$("a.ArticleListItem");

  const patchNotes = [];

  for (let i = 0; i < els.length; i++) {
    const img = await els[i].$eval("img", (i) => i.getAttribute("src"));

    const h2 = await els[i].$eval("h3", (h) => h.innerText);

    const links = await els[i].getProperty("href");
    const link = await links.jsonValue();

    const time = await els[i].$eval("time", (d) => d.innerText);

    const date = new Date(time);

    patchNotes.push({ title: h2, img: img, link: link, date: date });
  }

  browser.close();

  return { patchNotes };
}

async function scrapeOverwatchPatches(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  await page.evaluate((_) => {
    window.scrollTo(0, 0);
  });

  await scrollPageToBottom(page);

  while (
    page.url() !== "https://playoverwatch.com/en-gb/news/patch-notes/live"
  ) {
    await scrollPageToBottom(page);

    await page.click(
      "#site > section > div.Container.PatchNotes-list > div.PatchNotes-body > div.PatchNotesPagination > a.PatchNotesPaginationLink.PatchNotesPaginationLink--next"
    );
  }
  await scrollPageToBottom(page);

  const els = await page.$$(".PatchNotes-patch");

  const patchNotes = [];

  for (let i = 0; i < els.length; i++) {
    // const h2 = await els[i].$eval("h3", (h) => h.innerText);

    let h2;

    try {
      h2 = await els[i].$eval(".PatchNotes-patchTitle", (h) => h.innerText);
    } catch (error) {
      console.log(error);
    }

    const links = await els[i].getProperty("baseURI");
    const link = await links.jsonValue();

    const times = await els[i].getProperty("id");
    const time = await times.jsonValue();

    const date = new Date(time);

    patchNotes.push({ title: h2, link: link, date: date });
  }

  browser.close();

  return { patchNotes };
}

module.exports = {
  scrapeLeaguePatches,
  scrapeWarcraftPatches,
  scrapeHeartstonePatches,
  scrapeOverwatchPatches,
};
