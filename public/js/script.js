const datePicker = document.getElementById("date");
const lol = document.querySelector(".lol");
const wow = document.querySelector(".wow");
const hs = document.querySelector(".hs");
const ow = document.querySelector(".ow");
const tipsBottom = document.querySelector(".tips-container__bottom");
const tipsTop = document.querySelector(".tips-container__top");
const question = document.querySelector(".question");
const chosenGame = document.querySelector(".chosen-game");
const logoCard = document.querySelector(".logo-container__card");
const logoContainer = document.querySelector(".logo-container");
const pLogo = document.querySelector(".p-logo");
const banner = document.querySelector(".banner");
const overlay = document.querySelector(".overlay");
const errorMsg = document.querySelector(".error-prompt");
const searchText = document.querySelector(".search-text");
const submitText = document.querySelector(".search button");

let owImgs = ["ow1.jpeg", "ow2.jpg", "ow3.png"];
let owNum = Math.floor(Math.random() * 3);

let lolLoadingTips = [
  "You can place Wards and drink Potions while channeling a spell, such as Recall.",
  "You can watch your own Minions on the minimap to figure out where your opponent's Minions are.",
  "League of Legends changes frequently. Make sure to read your tooltips regularly to keep up to date!",
  "Champions are most vulnerable to attack when they are in the middle of an action, like attacking a Minion.",
  "A sushi restaurant in China once offered discounts based on League rank.",
  "Life happens. We get it. But for players who keep leaving games, LeaverBuster will issue a penalty.",
];
let wowLoadingTips = [
  "Your spell casting can be cancelled by moving, jumping or hitting the escape key.",
  "Being polite while in a group with others will get you invited back!",
  "Remember to take all things in moderation (even World of Warcraft!)",
  "You can hide your interface with <Alt>-Z and take screenshots with <Print Screen>.",
  "Nearby questgivers that are awaiting your return are shown as a yellow question mark on your mini-map.",
  "Ensure that all party members are on the same stage of an escort quest before beginning it",
];
let hsLoadingTips = [
  "Each week there's a crazy new way to play in Tavern Brawl!",
  "Buckle up. Hearthstone Duels features some of the most powerful decks you've ever seen.",
  "Complete quests to earn Gold. Gold can be used to buy packs or enter The Arena.",
  "Play mode will match you against someone of similar skill!",
  "If you run out of quests, come back tomorrow for a new one!",
  "Play Hearthstone on the phone, tablet and computer. Use the same card collection on all three!",
];
let owLoadingTips = [
  "Team composition matters! A well rounded team increases your chance of winning.",
  "Offense heroes are flexible and mobile threats, capable of engaging enemies in any situation.",
  "When low on health, disengage and use the health packs located around the map.",
  "Use the side passages and objects in the map to conceal your location and movement from the enemy.",
  "Tank heroes excel at taking and holding map objectives, as well as disrupting the enemy team.",
  "Look out for enemies trying to flank you from behind or above.",
];

let randNum = Math.floor(Math.random() * 6);
let endDate;
let endDateFormat;

let isLoading = false;
let islol = false;
let iswow = false;
let ishs = false;
let isow = false;

submitText.addEventListener("click", (e) => {
  e.preventDefault();
  const search = searchText.value.toLowerCase().replace(/\s/g, "");

  lol.classList.add("hide");
  wow.classList.add("hide");
  hs.classList.add("hide");
  ow.classList.add("hide");

  if (search === "") {
    lol.classList.remove("hide");
    wow.classList.remove("hide");
    hs.classList.remove("hide");
    ow.classList.remove("hide");
    pLogo.classList.add("hide");
  }

  if (
    (search === "lol") |
    (search === "league") |
    (search === "leagueoflegends")
  ) {
    lol.classList.remove("hide");
    wow.classList.add("hide");
    hs.classList.add("hide");
    ow.classList.add("hide");
    pLogo.classList.remove("hide");
  }
  if (
    (search === "wow") |
    (search === "warcraft") |
    (search === "worldofwarcraft")
  ) {
    lol.classList.add("hide");
    wow.classList.remove("hide");
    hs.classList.add("hide");
    ow.classList.add("hide");
    pLogo.classList.remove("hide");
  }
  if ((search === "hs") | (search === "hearthstone")) {
    wow.classList.add("hide");
    lol.classList.add("hide");
    hs.classList.remove("hide");
    ow.classList.add("hide");
    pLogo.classList.remove("hide");
  }
  if ((search === "ow") | (search === "overwatch")) {
    wow.classList.add("hide");
    hs.classList.add("hide");
    lol.classList.add("hide");
    ow.classList.remove("hide");
    pLogo.classList.remove("hide");
  }

  searchText.value = "";
});

lol.addEventListener("click", () => {
  wow.classList.add("hide");
  hs.classList.add("hide");
  ow.classList.add("hide");
  datePicker.classList.remove("hide");
  pLogo.classList.remove("hide");
  question.innerText = "When did you last play?";
  overlay.classList.remove("hide");
  islol = true;
});
wow.addEventListener("click", () => {
  lol.classList.add("hide");
  hs.classList.add("hide");
  ow.classList.add("hide");
  datePicker.classList.remove("hide");
  pLogo.classList.remove("hide");
  question.innerText = "When did you last play?";
  overlay.classList.remove("hide");
  iswow = true;
});
hs.addEventListener("click", () => {
  wow.classList.add("hide");
  lol.classList.add("hide");
  ow.classList.add("hide");
  datePicker.classList.remove("hide");
  pLogo.classList.remove("hide");
  question.innerText = "When did you last play?";
  overlay.classList.remove("hide");
  ishs = true;
});
ow.addEventListener("click", () => {
  wow.classList.add("hide");
  hs.classList.add("hide");
  lol.classList.add("hide");
  datePicker.classList.remove("hide");
  pLogo.classList.remove("hide");
  question.innerText = "When did you last play?";
  overlay.classList.remove("hide");
  isow = true;
});

datePicker.addEventListener("change", () => {
  endDate = document.querySelector(".end-date").value;

  if (new Date(endDate).getDate() >= new Date().getDate())
    errorMsg.classList.remove("hide");

  if (new Date(endDate) >= new Date()) return;

  errorMsg.style.visibility = "hidden";

  submitDate();
  startAnimate();
  datePicker.classList.add("hide");
  tipsBottom.classList.remove("hide");
  question.classList.add("hide");
  overlay.classList.add("hide");
});

function newEl(type, attrs = {}) {
  const el = document.createElement(type);
  for (let attr in attrs) {
    const value = attrs[attr];
    if (attr === "innerText") el.innerText = value;
    else el.setAttribute(attr, value);
  }
  return el;
}

function startAnimate() {
  if (islol) {
    lol.classList.add("animate");
    let tip = newEl("p", { innerText: lolLoadingTips[randNum] });
    tipsBottom.innerHTML = "";
    tipsBottom.appendChild(tip);
  }
  if (iswow) {
    wow.classList.add("animate");
    let tip = newEl("p", { innerText: wowLoadingTips[randNum] });
    tipsBottom.innerHTML = "";
    tipsBottom.appendChild(tip);
  }
  if (ishs) {
    hs.classList.add("animate");
    let tip = newEl("p", { innerText: hsLoadingTips[randNum] });
    tipsBottom.innerHTML = "";
    tipsBottom.appendChild(tip);
  }
  if (isow) {
    ow.classList.add("animate");
    let tip = newEl("p", { innerText: owLoadingTips[randNum] });
    tipsBottom.innerHTML = "";
    tipsBottom.appendChild(tip);
  }
}

function submitDate() {
  endDate = document.querySelector(".end-date").value;

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ endDate }),
  });

  if (islol) {
    loadLoLPatchNotes("https://euw.leagueoflegends.com/");
  }
  if (iswow) {
    loadWoWPatchNotes("https://worldofwarcraft.com");
  }
  if (ishs) {
    loadHSPatchNotes();
  }
  if (isow) {
    loadOWPatchNotes("https://playoverwatch.com/en-gb/news/patch-notes/live");
  }
}

async function loadLoLPatchNotes(url) {
  const res = await fetch("/patchNotesLoL");
  const patchNotes = await res.json();
  lol.classList.remove("animate");
  logoContainer.classList.add("hide");
  tipsBottom.querySelector("p").style.animation = "fade-out 1.2s ease-out";
  tipsBottom.classList.add("hide");
  tipsTop.classList.remove("hide");
  pLogo.classList.add("hide");
  // tips.remove();

  banner.classList.remove("hide");
  banner.innerHTML = `
  <img src="imgs/lolbanner.png" alt="">
        <h1>League of Legends</h1>
        <h2>League of Legends is a team-based game with over 140 champions to make epic plays with.</h2>
        <ul class="social-media">
            <li>
                <a class="website" target="_blank" href="https://www.leagueoflegends.com/en-gb/">
                    <i class="fas fa-globe-americas"></i>
                </a>
            </li>
            <li>
                <a class="twitter" target="_blank" href="https://twitter.com/leagueoflegends">
                    <i class="fab fa-twitter"></i>
                </a>
            </li>
            <li>
                <a class="twitch" target="_blank" href="https://www.twitch.tv/directory/game/League%20of%20Legends">
                    <i class="fab fa-twitch"></i>
                </a>
            </li>
            <li>
                <a class="youtube" target="_blank" href="https://www.youtube.com/user/riotgamesinc">
                    <i class="fab fa-youtube"></i>
                </a>
            </li>
        </ul>
  `;

  const container = document.querySelector(".card-container");
  container.innerHTML = "";
  container.classList.remove("hide");

  tipsTop.innerHTML = `<p>You've missed ${
    patchNotes.length > 1 ? patchNotes.length + " patches" : "1 patch"
  } since you left.
  </p>`;

  if (patchNotes.length === 1) {
    tipsTop.style.transform = "translateY(6rem)";
  }

  if (patchNotes.length === 0) {
    tipsTop.style.transform = "translateY(5rem)";
    tipsTop.innerHTML = "<p>You've missed no patches since you left<p>";
  }

  patchNotes.forEach((patch) => {
    const card = newEl("div", { class: "card" });
    const title = newEl("h4", { class: "title", innerText: patch.title });
    const link = newEl("a", {
      href: `${url}${patch.link}`,
      innerText: "View Patch >",
      target: "_blank",
    });
    const img = newEl("img", { src: patch.img });
    const div = newEl("div");

    div.appendChild(title);
    div.appendChild(link);
    card.appendChild(div);
    card.appendChild(img);
    container.appendChild(card);
  });
}
async function loadWoWPatchNotes(url) {
  const res = await fetch("/patchNotesWoW");
  const patchNotes = await res.json();
  wow.classList.remove("animate");
  logoContainer.classList.add("hide");
  tipsBottom.querySelector("p").style.animation = "fade-out 1.2s ease-out";
  tipsBottom.classList.add("hide");
  tipsTop.classList.remove("hide");
  pLogo.classList.add("hide");

  banner.classList.remove("hide");
  banner.innerHTML = `
  <img src="imgs/wowbanner.png" alt="">
        <h1>World of Warcraft</h1>
        <h2>Join thousands of mighty heroes in Azeroth, a world of magic and limitless adventure.</h2>
        <ul class="social-media">
            <li>
                <a class="website" target="_blank" href="https://worldofwarcraft.com/en-us/">
                    <i class="fas fa-globe-americas"></i>
                </a>
            </li>
            <li>
                <a class="twitter" target="_blank" href="https://twitter.com/warcraft">
                    <i class="fab fa-twitter"></i>
                </a>
            </li>
            <li>
                <a class="twitch" target="_blank" href="https://www.twitch.tv/directory/game/World%20of%20Warcraft">
                    <i class="fab fa-twitch"></i>
                </a>
            </li>
            <li>
                <a class="youtube" target="_blank" href="https://www.youtube.com/user/WorldofWarcraft">
                    <i class="fab fa-youtube"></i>
                </a>
            </li>
        </ul>
  `;

  const container = document.querySelector(".card-container");
  container.innerHTML = "";
  container.classList.remove("hide");

  tipsTop.innerHTML = `<p>You've missed ${
    patchNotes.length > 1 ? patchNotes.length + " patches" : "1 patch"
  } since you left.
  </p>`;

  if (patchNotes.length === 1) {
    tipsTop.style.transform = "translateY(6rem)";
  }

  if (patchNotes.length === 0) {
    tipsTop.style.transform = "translateY(5rem)";
    tipsTop.innerHTML = "<p>You've missed no patches since you left<p>";
  }

  patchNotes.forEach((patch) => {
    const card = newEl("div", { class: "card" });
    const title = newEl("h4", { class: "title", innerText: patch.title });
    const link = newEl("a", {
      href: `${url}${patch.link}`,
      innerText: "View Patch >",
      target: "_blank",
    });
    const img = newEl("img", { src: patch.img });
    const div = newEl("div");

    div.appendChild(title);
    div.appendChild(link);
    card.appendChild(div);
    card.appendChild(img);
    container.appendChild(card);
  });
}
async function loadHSPatchNotes() {
  const res = await fetch("/patchNotesHS");
  const patchNotes = await res.json();
  hs.classList.remove("animate");
  logoContainer.classList.add("hide");
  tipsBottom.querySelector("p").style.animation = "fade-out 1.2s ease-out";
  tipsBottom.classList.add("hide");
  tipsTop.classList.remove("hide");
  pLogo.classList.add("hide");

  // tips.remove();
  banner.classList.remove("hide");
  banner.innerHTML = `
  <img src="imgs/hsbanner.png" alt="">
        <h1>Hearthstone</h1>
        <h2>Hearthstone is a fast-paced strategy card game from Blizzard Entertainment.</h2>
        <ul class="social-media">
            <li>
                <a class="website" target="_blank" href="https://playhearthstone.com/en-us">
                    <i class="fas fa-globe-americas"></i>
                </a>
            </li>
            <li>
                <a class="twitter" target="_blank" href="https://twitter.com/PlayHearthstone">
                    <i class="fab fa-twitter"></i>
                </a>
            </li>
            <li>
                <a class="twitch" target="_blank" href="https://www.twitch.tv/directory/game/Hearthstone">
                    <i class="fab fa-twitch"></i>
                </a>
            </li>
            <li>
                <a class="youtube" target="_blank" href="https://www.youtube.com/Hearthstone">
                    <i class="fab fa-youtube"></i>
                </a>
            </li>
        </ul>
  `;

  const container = document.querySelector(".card-container");
  container.innerHTML = "";
  container.classList.remove("hide");

  tipsTop.innerHTML = `<p>You've missed ${
    patchNotes.length > 1 ? patchNotes.length + " patches" : "1 patch"
  } since you left.
  </p>`;

  if (patchNotes.length === 1) {
    tipsTop.style.transform = "translateY(6rem)";
  }

  if (patchNotes.length === 0) {
    tipsTop.style.transform = "translateY(5rem)";
    tipsTop.innerHTML = "<p>You've missed no patches since you left<p>";
  }

  patchNotes.forEach((patch) => {
    const card = newEl("div", { class: "card" });
    const title = newEl("h4", { class: "title", innerText: patch.title });
    const link = newEl("a", {
      href: patch.link,
      innerText: "View Patch >",
      target: "_blank",
    });
    const img = newEl("img", { src: patch.img });
    const div = newEl("div");

    div.appendChild(title);
    div.appendChild(link);
    card.appendChild(div);
    card.appendChild(img);
    container.appendChild(card);
  });
}

async function loadOWPatchNotes(url) {
  // endDateFormat = "/" + endDate.replace(/-/g, "/").slice(0, 7);

  const res = await fetch("http://localhost:3000/patchNotesOW");
  const patchNotes = await res.json();
  ow.classList.remove("animate");
  logoContainer.classList.add("hide");
  tipsBottom.querySelector("p").style.animation = "fade-out 1.2s ease-out";
  tipsBottom.classList.add("hide");
  tipsTop.classList.remove("hide");
  pLogo.classList.add("hide");

  // tips.remove();
  banner.classList.remove("hide");
  banner.innerHTML = `
  <img src="imgs/owbanner.png" alt="" loading=lazy>
        <h1>Overwatch</h1>
        <h2>Overwatch is a vibrant team-based shooter set on a near-future earth.</h2>
        <ul class="social-media">
            <li>
                <a class="website" target="_blank" href="https://playoverwatch.com/en-gb/">
                    <i class="fas fa-globe-americas"></i>
                </a>
            </li>
            <li>
                <a class="twitter" target="_blank" href="https://twitter.com/playoverwatch">
                    <i class="fab fa-twitter"></i>
                </a>
            </li>
            <li>
                <a class="twitch" target="_blank" href="https://www.twitch.tv/directory/game/Overwatch">
                    <i class="fab fa-twitch"></i>
                </a>
            </li>
            <li>
                <a class="youtube" target="_blank" href="https://www.youtube.com/PlayOverwatch">
                    <i class="fab fa-youtube"></i>
                </a>
            </li>
        </ul>
  `;

  const container = document.querySelector(".card-container");
  container.innerHTML = "";
  container.classList.remove("hide");

  tipsTop.innerHTML = `<p>You've missed ${
    patchNotes.length > 1 ? patchNotes.length + " patches" : "1 patch"
  } since you left.
  </p>`;

  if (patchNotes.length === 1) {
    tipsTop.style.transform = "translateY(6rem)";
  }

  if (patchNotes.length === 0) {
    tipsTop.style.transform = "translateY(5rem)";
    tipsTop.innerHTML = "<p>You've missed no patches since you left<p>";
  }

  patchNotes.forEach((patch) => {
    const card = newEl("div", { class: "card" });
    const title = newEl("h4", { class: "title", innerText: patch.title });
    const link = newEl("a", {
      // href: `${url}${endDateFormat}`,
      href: patch.link,
      innerText: "View Patch >",
      target: "_blank",
    });
    const img = newEl("img", { src: `/imgs/${owImgs[owNum]}` });
    const div = newEl("div");

    div.appendChild(title);
    div.appendChild(link);
    card.appendChild(div);
    card.appendChild(img);
    container.appendChild(card);
  });
}
