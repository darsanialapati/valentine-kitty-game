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

/* LEVEL 1 */
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
  const expected = quests[quest].answer;

  if (answer === expected) {
    updateTreats(2);
    feedback.innerText = "Purr-fect! 🐾";
    quest++;

    if (quest < quests.length) {
      setTimeout(loadQuest, 800);
    } else {
      setTimeout(() => {
        hideAll();
        level2Intro.classList.remove("hidden");
      }, 1000);
    }
  } else {
    feedback.innerText = "Try again 😼";
  }
}

/* LEVEL 2 – ORIGINAL DISTANCE-BASED LOGIC */
function startLevel2() {
  hideAll();
  bird.classList.remove("hidden");

  bird.style.left = "70vw";
  bird.style.top = "70vh";

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
  const birdRect = bird.getBoundingClientRect();
  const dx = e.clientX - (birdRect.left + birdRect.width / 2);
  const dy = e.clientY - (birdRect.top + birdRect.height / 2);
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 120) {
    let newLeft = birdRect.left - dx;
    let newTop = birdRect.top - dy;

    newLeft = Math.min(window.innerWidth - birdRect.width,
              Math.max(0, newLeft));
    newTop = Math.min(window.innerHeight - birdRect.height,
             Math.max(0, newTop));

    bird.style.left = newLeft + "px";
    bird.style.top = newTop + "px";
  }
}

/* LEVEL 3 */
function startLevel3() {
  hideAll();
  kittenGame.innerHTML = "";
  kittenGame.classList.remove("hidden");
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
        startFinalScene();
      }
    };
    kittenGame.appendChild(k);
  }
}

/* FINAL FEEDING (NEW ONLY) */
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

/* HEARTS */
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "💖";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = "4s";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 5000);
}, 400);
