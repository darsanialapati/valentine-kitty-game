let treats = 0;
let quest = 0;
let kittensFound = 0;

const quests = [
  { title: "Quest 1", text: "What’s really the cutest thing here?", answer: "hrishi" },
  { title: "Quest 2", text: "I’m soft, small, and jump when happy. What am I?", answer: "hrishukesh" },
  { title: "Quest 3", text: "I love naps, cuddles, and snacks. Who could I be?", answer: "me" }
];

const treatCount = document.getElementById("treatCount");
const treatTray = document.getElementById("treatTray");
const kitty = document.getElementById("kitty");

function updateTreats(num) {
  treats += num;
  treatCount.innerText = treats;
  renderTreatTray();
}

function renderTreatTray() {
  treatTray.innerHTML = "";
  for (let i = 0; i < treats; i++) {
    const fish = document.createElement("span");
    fish.className = "fish";
    fish.innerText = "🐟";
    fish.draggable = true;

    fish.ondragend = () => {
      fish.remove();
      treats--;
      treatCount.innerText = treats;

      if (treats === 0) {
        kitty.src = "kitty-happy.gif";
        setTimeout(() => {
          document.getElementById("letter").classList.remove("hidden");
        }, 1200);
      }
    };

    treatTray.appendChild(fish);
  }
}

/* Navigation helpers */
function hideAll() {
  document.querySelectorAll(".levelScreen, #bird, #kittenGame").forEach(el =>
    el.classList.add("hidden")
  );
}

function showLevel1Intro() {
  hideAll();
  document.getElementById("level1Intro").classList.remove("hidden");
}

function startLevel1() {
  hideAll();
  loadQuest();
}

function loadQuest() {
  const q = quests[quest];
  document.getElementById("game").classList.remove("hidden");
  questTitle.innerText = q.title;
  questText.innerText = q.text;
}

function submitAnswer() {
  const input = answer.value.toLowerCase();
  if (input === quests[quest].answer) {
    updateTreats(2);
    quest++;
    if (quest < quests.length) loadQuest();
    else {
      hideAll();
      document.getElementById("level2Intro").classList.remove("hidden");
    }
  }
}

function startLevel2() {
  hideAll();
  bird.classList.remove("hidden");

  document.addEventListener("mousemove", e => {
    bird.style.left = Math.random() * window.innerWidth + "px";
    bird.style.top = Math.random() * window.innerHeight + "px";
  });

  bird.onclick = () => {
    updateTreats(3);
    hideAll();
    document.getElementById("level3Intro").classList.remove("hidden");
  };
}

function startLevel3() {
  hideAll();
  const game = document.getElementById("kittenGame");
  game.classList.remove("hidden");
  game.innerHTML = "";
  kittensFound = 0;

  for (let i = 0; i < 10; i++) {
    const k = document.createElement("div");
    k.className = "kitten";
    k.innerText = "🐱";
    k.style.left = Math.random() * 90 + "vw";
    k.style.top = Math.random() * 90 + "vh";

    k.onclick = () => {
      k.remove();
      kittensFound++;
      if (kittensFound === 10) {
        updateTreats(5);
        hideAll();
        document.getElementById("finalScene").classList.remove("hidden");
        kitty.ondragover = e => e.preventDefault();
      }
    };
    game.appendChild(k);
  }
}

/* Hearts */
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "💖";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}, 400);
