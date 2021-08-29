const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const scraper = require("./scraper");
const app = express();
const port = process.env.PORT || 3000;

let endDate;

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/js", express.static(__dirname + "public/js"));

app.use(expressLayouts);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", async (req, res) => {
  endDate = req.body.endDate;

  res.send("success");
});

app.get("/patchNotesLoL", async (req, res) => {
  const patchNotes = await scraper.scrapeLeaguePatches(
    "https://euw.leagueoflegends.com/en-gb/news/tags/patch-notes"
  );

  const result = patchNotes.patchNotes.filter((patch) => {
    let ed = new Date(endDate);

    return patch.date > ed;
  });

  res.send(result);
});

app.get("/patchNotesWoW", async (req, res) => {
  const patchNotes = await scraper.scrapeWarcraftPatches(
    "https://worldofwarcraft.com/en-us/content-update-notes"
  );

  const result = patchNotes.patchNotes.filter((patch) => {
    let ed = new Date(endDate);

    return patch.date > ed;
  });

  res.send(result);
});

app.get("/patchNotesHS", async (req, res) => {
  const patchNotes = await scraper.scrapeHeartstonePatches(
    "https://playhearthstone.com/en-us/news/patchnotes"
  );

  const result = patchNotes.patchNotes.filter((patch) => {
    let ed = new Date(endDate);

    return patch.date > ed;
  });

  res.send(result);
});

app.get("/patchNotesOW", async (req, res) => {
  endDateFormat = "/" + endDate.replace(/-/g, "/").slice(0, 7);

  const patchNotes = await scraper.scrapeOverwatchPatches(
    `https://playoverwatch.com/en-gb/news/patch-notes/live${endDateFormat}`
    // `https://playoverwatch.com/en-gb/news/patch-notes/live`
  );

  const result = patchNotes.patchNotes.filter((patch) => {
    const ed = new Date(endDate);

    return patch.date > ed;
  });

  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
