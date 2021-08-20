const datePicker = document.getElementById("date");
const lol = document.querySelector(".lol");
const wow = document.querySelector(".wow");
const hs = document.querySelector(".hs");
const ow = document.querySelector(".ow");

let islol = false;
let iswow = false;
let ishs = false;
// let isow = false;

// let endDateFormat;

lol.addEventListener("click", () => {
  wow.classList.add("hide");
  hs.classList.add("hide");
  // ow.classList.add("hide");
  datePicker.classList.remove("hide");
  islol = true;
});
wow.addEventListener("click", () => {
  lol.classList.add("hide");
  hs.classList.add("hide");
  // ow.classList.add("hide");
  datePicker.classList.remove("hide");
  iswow = true;
});
hs.addEventListener("click", () => {
  wow.classList.add("hide");
  lol.classList.add("hide");
  // ow.classList.add("hide");
  datePicker.classList.remove("hide");
  ishs = true;
});
// ow.addEventListener("click", () => {
//   wow.classList.add("hide");
//   hs.classList.add("hide");
//   lol.classList.add("hide");
//   datePicker.classList.remove("hide");
//   isow = true;
// });

datePicker.addEventListener("change", () => {
  submitDate();
  startAnimate();
  datePicker.classList.add("hide");
});

function startAnimate() {
  if (islol) {
    lol.classList.add("animate");
  }
  if (iswow) {
    wow.classList.add("animate");
  }
  if (ishs) {
    hs.classList.add("animate");
  }
}

function submitDate() {
  const endDate = document.querySelector(".end-date").value;
  // endDateFormat = endDate;

  fetch("/patchNotes", {
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
    // loadHSPatchNotes("https://playhearthstone.com/");
    loadHSPatchNotes();
  }
  // if (isow) {
  //   loadOWPatchNotes("https://playoverwatch.com/en-gb/news/patch-notes/live");
  // }
}

function newEl(type, attrs = {}) {
  const el = document.createElement(type);
  for (let attr in attrs) {
    const value = attrs[attr];
    if (attr === "innerText") el.innerText = value;
    else el.setAttribute(attr, value);
  }
  return el;
}

async function loadLoLPatchNotes(url) {
  const res = await fetch("/patchNotesLoL");
  const patchNotes = await res.json();
  lol.classList.remove("animate");

  const ctr = document.querySelector(".card-container");

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
    ctr.appendChild(card);
  });
}
async function loadWoWPatchNotes(url) {
  const res = await fetch("/patchNotesWoW");
  const patchNotes = await res.json();
  wow.classList.remove("animate");

  const ctr = document.querySelector(".card-container");

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
    ctr.appendChild(card);
  });
}
async function loadHSPatchNotes() {
  const res = await fetch("/patchNotesHS");
  const patchNotes = await res.json();
  hs.classList.remove("animate");

  const ctr = document.querySelector(".card-container");

  patchNotes.forEach((patch) => {
    const card = newEl("div", { class: "card" });
    const title = newEl("h4", { innerText: patch.title });
    // const link = newEl("a", {
    //   href: `${url}${patch.link}`,
    // });
    const link = newEl("a", {
      href: patch.link,
    });
    const img = newEl("img", { src: patch.img });
    img.style.width = "393px";
    img.style.height = "221px";

    link.appendChild(img);
    card.appendChild(title);
    card.appendChild(link);
    ctr.appendChild(card);
  });
}
// async function loadOWPatchNotes(url) {
//   // endDateFormat = "/" + endDate.replace(/-/g, "/").slice(0, 7);

//   const res = await fetch("http://localhost:3000/patchNotesOW");
//   const patchNotes = await res.json();
//   console.log(patchNotes);

//   const ctr = document.querySelector(".card-container");

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
//     ctr.appendChild(card);
//   });
// }
