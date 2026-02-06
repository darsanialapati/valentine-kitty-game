let treats = 0;
let quest = 0;
let kittensFound = 0;

const quests = [
  { title: "Quest 1", text: "What’s really the cutest thing here? 😼", answer: "hrishi" },
  { title: "Quest 2", text: "I’m soft, small, and jump when happy. What am I?", answer: "hrishukesh" },
  { title: "Quest 3", text: "I love naps, cuddles, and snacks. Who could I be?", answer: "me" }
];

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
const kitty = document.getElementById("kitty");
const fishContainer = document.getElementById("fishContainer");

function updateTreats(num) {
  treats += num;
  treatCounter.innerText = `🐟 Treats: ${treats}`;
}

function hideAll() {
  [intro, level1Intro, level2Intro, level3Intro, game, bird, kittenGame, finalScene]
    .forEach(el => el.classList.add("hidden"));
}

function showLevel1Intro() {
  hideAll();
  level1Intro.classList.remove("hidden");
}

function startLevel1() {
  hideAll();
  quest = 0;
  loadQuest();
}

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
    quest++;
    quest < quests.length ? setTimeout(loadQuest, 600) :
      (hideAll(), level2Intro.classList.remove("hidden"));
  } else feedback.innerText = "Try again 😼";
}

/* LEVEL 2 */
function startLevel2() {
  hideAll();
  bird.classList.remove("hidden");

  document.addEventListener("mousemove", moveBirdAway);
  bird.onclick = () => {
    updateTreats(3);
    bird.classList.add("hidden");
    document.removeEventListener("mousemove", moveBirdAway);
    hideAll();
    level3Intro.classList.remove("hidden");
  };
}

function moveBirdAway(e) {
  bird.style.left = Math.random() * (window.innerWidth - 80) + "px";
  bird.style.top = Math.random() * (window.innerHeight - 80) + "px";
}

/* LEVEL 3 */
function startLevel3() {
  hideAll();
  kittenGame.innerHTML = "";
  kittenGame.classList.remove("hidden");
  kittensFound = 0;

  for (let i = 0; i < 10; i++) {
    const kitty = document.createElement("div");
    kitty.className = "kitten";
    kitty.innerText = "🐱";
    kitty.style.left = Math.random() * 90 + "vw";
    kitty.style.top = Math.random() * 90 + "vh";
    kitty.onclick = () => {
      kitty.remove();
      kittensFound++;
      if (kittensFound === 10) {
        updateTreats(5);
        hideAll();
        startFinalScene();
      }
    };
    kittenGame.appendChild(kitty);
  }
}

/* FINAL FEEDING */
function startFinalScene() {
  finalScene.classList.remove("hidden");
  spawnFish();
}

function spawnFish() {
  fishContainer.innerHTML = "";
  for (let i = 0; i < treats; i++) {
    const fish = document.createElement("div");
    fish.className = "fish";
    fish.innerText = "🐟";
    fish.style.left = Math.random() * 300 + "px";
    fish.style.top = Math.random() * 150 + "px";
    enableDrag(fish);
    fishContainer.appendChild(fish);
  }
}

function enableDrag(fish) {
  fish.onmousedown = () => {
    document.onmousemove = e => {
      fish.style.left = e.pageX - 20 + "px";
      fish.style.top = e.pageY - 20 + "px";
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      const f = fish.getBoundingClientRect();
      const k = kitty.getBoundingClientRect();

      if (f.left < k.right && f.right > k.left &&
          f.top < k.bottom && f.bottom > k.top) {
        fish.remove();
        treats--;
        updateTreats(0);

        if (treats === 0) {
          kitty.innerText = "😻";
          setTimeout(() => letter.classList.remove("hidden"), 800);
        }
      }
    };
  };
}

/* FALLING HEARTS */
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "💖";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = "4s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 5000);
}, 400);
