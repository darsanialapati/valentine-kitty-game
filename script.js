let treats = 0;
let quest = 0;
let kittensFound = 0;

/* QUESTS */
const quests = [
  { title: "Quest 1", text: "What’s really the cutest thing here? 😼", answer: "hrishi" },
  { title: "Quest 2", text: "I’m soft, small, and jump when happy. What am I?", answer: "hrishukesh" },
  { title: "Quest 3", text: "I love naps, cuddles, and snacks. Who could I be?", answer: "me" }
];

/* ELEMENTS */
const treatCounter = document.getElementById("treatCounter");
const intro = document.getElementById("intro");
const level1Intro = document.getElementById("level1Intro");
const level2Intro = document.getElementById("level2Intro");
const level3Intro = document.getElementById("level3Intro");
const game = document.getElementById("game");
const questTitle = document.getElementById("questTitle");
const questText = document.getElementById("questText");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const bird = document.getElementById("bird");
const kittenGame = document.getElementById("kittenGame");
const finalScene = document.getElementById("finalScene");
const letter = document.getElementById("letter");

/* HELPERS */
function updateTreats(num) {
  treats += num;
  treatCounter.innerText = `🐟 Treats: ${treats}`;
}

function hideAll() {
  [intro, level1Intro, level2Intro, level3Intro, game, bird, kittenGame, finalScene]
    .forEach(el => el.classList.add("hidden"));
}

/* INTRO → LEVEL 1 */
function showLevel1Intro() {
  hideAll();
  level1Intro.classList.remove("hidden");
}

function startLevel1() {
  hideAll();
  quest = 0;
  loadQuest();
}

/* LEVEL 1 */
function loadQuest() {
  game.classList.remove("hidden");
  questTitle.innerText = quests[quest].title;
  questText.innerText = quests[quest].text;
  answerInput.value = "";
  feedback.innerText = "";
}

function submitAnswer() {
  const answer = answerInput.value.trim().toLowerCase();
  if (answer === quests[quest].answer) {
    updateTreats(2);
    feedback.innerText = "Purr-fect! 🐾";
    quest++;
    quest < quests.length ? setTimeout(loadQuest, 800) :
      setTimeout(() => { hideAll(); level2Intro.classList.remove("hidden"); }, 1000);
  } else {
    feedback.innerText = "Try again 😼";
  }
}

/* LEVEL 2 */
function startLevel2() {
  hideAll();
  bird.classList.remove("hidden");
  bird.style.left = "60vw";
  bird.style.top = "60vh";
  document.addEventListener("mousemove", moveBirdAway);

  bird.onclick = () => {
    updateTreats(3);
    document.removeEventListener("mousemove", moveBirdAway);
    bird.classList.add("hidden");
    hideAll();
    level3Intro.classList.remove("hidden");
  };
}

function moveBirdAway(e) {
  const rect = bird.getBoundingClientRect();
  const dx = e.clientX - rect.left;
  const dy = e.clientY - rect.top;
  if (Math.hypot(dx, dy) < 120) {
    bird.style.left = Math.random() * 70 + "vw";
    bird.style.top = Math.random() * 70 + "vh";
  }
}

/* LEVEL 3 */
function startLevel3() {
  hideAll();
  kittenGame.classList.remove("hidden");
  kittenGame.innerHTML = "";
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
        startFeeding();
      }
    };
    kittenGame.appendChild(k);
  }
}

/* ---------- FINAL FEEDING (NEW) ---------- */
function startFeeding() {
  finalScene.classList.remove("hidden");

  const kitty = document.getElementById("kitty");
  const area = document.getElementById("treatsArea");
  area.innerHTML = "";

  let fed = 0;

  for (let i = 0; i < treats; i++) {
    const fish = document.createElement("div");
    fish.className = "treat";
    fish.innerText = "🐟";
    fish.draggable = true;

    fish.ondragstart = e => e.dataTransfer.setData("fish", "🐟");
    area.appendChild(fish);
  }

  kitty.ondragover = e => e.preventDefault();
  kitty.ondrop = () => {
    fed++;
    area.removeChild(area.lastChild);
    if (fed === treats) {
      kitty.innerText = "😻";
      setTimeout(() => letter.classList.remove("hidden"), 1000);
    }
  };
}

/* HEARTS */
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "💖";
  h.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}, 400);
