const datePicker = document.getElementById("date");
const lol = document.querySelector(".lol");
const wow = document.querySelector(".wow");
const hs = document.querySelector(".hs");
const ow = document.querySelector(".ow");
const tips = document.querySelector(".tips-container");
const question = document.querySelector(".question");
const chosenGame = document.querySelector(".chosen-game");
const logoCard = document.querySelector(".logo-container__card");
const logoContainer = document.querySelector(".logo-container");
const pLogo = document.querySelector(".p-logo");

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

let randNum = Math.floor(Math.random() * 6);

let isLoading = false;
let islol = false;
let iswow = false;
let ishs = false;
let isow = false;

lol.addEventListener("click", () => {
  wow.classList.add("hide");
  hs.classList.add("hide");
  ow.classList.add("hide");
  datePicker.classList.remove("hide");
  islol = true;
});
wow.addEventListener("click", () => {
  lol.classList.add("hide");
  hs.classList.add("hide");
  ow.classList.add("hide");
  datePicker.classList.remove("hide");
  iswow = true;
});
hs.addEventListener("click", () => {
  wow.classList.add("hide");
  lol.classList.add("hide");
  ow.classList.add("hide");
  datePicker.classList.remove("hide");
  ishs = true;
});
ow.addEventListener("click", () => {
  wow.classList.add("hide");
  hs.classList.add("hide");
  lol.classList.add("hide");
  datePicker.classList.remove("hide");
  isow = true;
});

datePicker.addEventListener("change", () => {
  submitDate();
  startAnimate();
  datePicker.classList.add("hide");
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
    tips.innerHTML = "";
    tips.appendChild(tip);
  }
  if (iswow) {
    wow.classList.add("animate");
    let tip = newEl("p", { innerText: wowLoadingTips[randNum] });
    tips.innerHTML = "";
    tips.appendChild(tip);
  }
  if (ishs) {
    hs.classList.add("animate");
    let tip = newEl("p", { innerText: hsLoadingTips[randNum] });
    tips.innerHTML = "";
    tips.appendChild(tip);
  }
}

function submitDate() {
  const endDate = document.querySelector(".end-date").value;

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
  // if (isow) {
  //   loadOWPatchNotes("https://playoverwatch.com/en-gb/news/patch-notes/live");
  // }
}

async function loadLoLPatchNotes(url) {
  const res = await fetch("/patchNotesLoL");
  const patchNotes = await res.json();
  lol.classList.remove("animate");
  tips.querySelector("p").style.animation = "fade-out 1.2s ease-out";
  tips.remove();

  const container = document.querySelector(".card-container");
  container.innerHTML = "";

  patchNotes.forEach((patch) => {
    const card = newEl("div", { class: "card" });
    const title = newEl("h4", { innerText: patch.title });
    const link = newEl("a", {
      href: `${url}${patch.link}`,
    });
    const img = newEl("img", { src: patch.img });
    img.style.width = "393px";
    img.style.height = "221px";

    link.appendChild(img);
    card.appendChild(title);
    card.appendChild(link);
    container.appendChild(card);
  });
}
async function loadWoWPatchNotes(url) {
  const res = await fetch("/patchNotesWoW");
  const patchNotes = await res.json();
  wow.classList.remove("animate");
  tips.style.animation = "fade-out 1.2s ease-out";
  tips.remove();

  const container = document.querySelector(".card-container");
  container.innerHTML = "";

  patchNotes.forEach((patch) => {
    const card = newEl("div", { class: "card" });
    const title = newEl("h4", { innerText: patch.title });
    const link = newEl("a", {
      href: `${url}${patch.link}`,
    });
    const img = newEl("img", { src: patch.img });
    img.style.width = "393px";
    img.style.height = "221px";

    link.appendChild(img);
    card.appendChild(title);
    card.appendChild(link);
    container.appendChild(card);
  });
}
async function loadHSPatchNotes() {
  const res = await fetch("/patchNotesHS");
  const patchNotes = await res.json();
  hs.classList.remove("animate");
  tips.style.animation = "fade-out 1.2s ease-out";
  tips.remove();

  const container = document.querySelector(".card-container");
  container.innerHTML = "";

  patchNotes.forEach((patch) => {
    const card = newEl("div", { class: "card" });
    const title = newEl("h4", { innerText: patch.title });
    const link = newEl("a", {
      href: patch.link,
    });
    const img = newEl("img", { src: patch.img });
    img.style.width = "393px";
    img.style.height = "221px";

    link.appendChild(img);
    card.appendChild(title);
    card.appendChild(link);
    container.appendChild(card);
  });
}
// async function loadOWPatchNotes(url) {
//   // endDateFormat = "/" + endDate.replace(/-/g, "/").slice(0, 7);

//   const res = await fetch("http://localhost:3000/patchNotesOW");
//   const patchNotes = await res.json();
//   console.log(patchNotes);

//   const container = document.querySelector(".card-container");

//   patchNotes.forEach((patch) => {
//     const card = newEl("div", { class: "card" });
//     const title = newEl("h4", { innerText: patch.title });
//     const link = newEl("a", {
//       href: `${url}${endDateFormat}`,
//     });
//     const img = newEl("img", { src: "./assets/doomfist-screenshot-004.jpeg" });
//     img.style.width = "393px";
//     img.style.height = "221px";

//     link.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(link);
//     container.appendChild(card);
//   });
// }
