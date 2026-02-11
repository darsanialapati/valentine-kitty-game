/* --------------------
   GLOBAL STATE
-------------------- */
let treats = 0;
let quest = 0;
let kittensFound = 0;

/* --------------------
   QUEST DATA (LEVEL 1)
-------------------- */
const quests = [
  {
    title: "Quest 1",
    text: "What’s really the cutest thing here? 😼",
    answer: "hrishi"
  },
  {
    title: "Quest 2",
    text: "I’m soft, small, and jump when happy. What am I?",
    answer: "hrishukesh"
  },
  {
    title: "Quest 3",
    text: "I love naps, cuddles, and snacks. Who could I be?",
    answer: "me"
  }
];

/* --------------------
   ELEMENTS
-------------------- */
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

/* --------------------
   HELPERS
-------------------- */
function updateTreats(num) {
  treats += num;
  // Instead of a number, show one 🐟 for each treat
  const fishes = "🐟".repeat(treats);
  treatCounter.innerText = `🐾 Treats:\n${fishes}`;
}

function hideAll() {
  [
    intro,
    level1Intro,
    level2Intro,
    level3Intro,
    game,
    bird,
    kittenGame,
    finalScene
  ].forEach(el => el.classList.add("hidden"));
}

/* --------------------
   INTRO → LEVEL 1
-------------------- */
function showLevel1Intro() {
  hideAll();
  level1Intro.classList.remove("hidden");
}

function startLevel1() {
  hideAll();
  quest = 0;
  loadQuest();
}

/* --------------------
   LEVEL 1: QUESTS
-------------------- */
function loadQuest() {
  game.classList.remove("hidden");
  questTitle.innerText = quests[quest].title;
  questText.innerText = quests[quest].text;
  answerInput.value = "";
  feedback.innerText = "";
}

function submitAnswer() {
  if (!quests[quest]) return;

  const answer = answerInput.value.trim().toLowerCase();
  const expected = quests[quest].answer.toLowerCase();

  console.log("Typed:", answer);
  console.log("Expected:", expected);

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

/* --------------------
   LEVEL 2: BIRD CHASE
-------------------- */
function startLevel2() {
  hideAll();
  bird.classList.remove("hidden");

  // Place bird initially somewhere
  bird.style.left = Math.random() * (window.innerWidth - 80) + "px";
  bird.style.top = Math.random() * (window.innerHeight - 80) + "px";

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
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const distanceX = mouseX - (birdRect.left + birdRect.width / 2);
  const distanceY = mouseY - (birdRect.top + birdRect.height / 2);
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  // If cursor is close (<120px), bird jumps away
  if (distance < 120) {
    const moveX = (distanceX / distance) * 150;
    const moveY = (distanceY / distance) * 150;

    let newLeft = birdRect.left - moveX;
    let newTop = birdRect.top - moveY;

    // Keep bird inside window
    newLeft = Math.max(0, Math.min(window.innerWidth - birdRect.width, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - birdRect.height, newTop));

    bird.style.left = newLeft + "px";
    bird.style.top = newTop + "px";
  }
}


/* --------------------
   LEVEL 3: FIND KITTENS
-------------------- */
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
        finalScene.classList.remove("hidden");
      }
    };

    kittenGame.appendChild(kitty);
  }
}

/* --------------------
   FINAL SCENE
-------------------- */
function feedKitty() {
  letter.classList.remove("hidden");
}

/* --------------------
   FALLING HEARTS
-------------------- */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 400);
