let quest = 1;
let treats = 0;

// Elements
const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");

const levelIntro = document.getElementById("levelIntro");
const levelName = document.getElementById("levelName");
const levelDescription = document.getElementById("levelDescription");
const levelStartBtn = document.getElementById("levelStartBtn");

const gameBox = document.getElementById("game");
const title = document.getElementById("questTitle");
const text = document.getElementById("questText");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");

const hiddenBox = document.getElementById("hiddenBox");
const kittenGame = document.getElementById("kittenGame");

const treatCounter = document.getElementById("treatCounter");

const finalScene = document.getElementById("finalScene");
const bigKitten = document.getElementById("bigKitten");
const feedBtn = document.getElementById("feedBtn");
const letter = document.getElementById("letter");

// --- Falling Hearts ---
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.fontSize = (10 + Math.random() * 20) + "px";
  heart.style.animationDuration = (3 + Math.random() * 5) + "s";
  heart.innerText = "💖";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 500);

// --- Utility ---
function updateTreats(points) {
  treats += points;
  treatCounter.innerText = `🐾 Treats: ${treats}`;
}

// --- Show Level Intro ---
function showLevelIntro(name, description, callback) {
  levelName.innerText = name;
  levelDescription.innerText = description;
  levelIntro.style.display = "block";
  gameBox.style.display = "none";
  hiddenBox.style.display = "none";
  kittenGame.style.display = "none";

  levelStartBtn.onclick = () => {
    levelIntro.style.display = "none";
    callback();
  };
}

// --- Start the game from Intro button ---
startBtn.onclick = () => {
  intro.style.display = "none";
  showLevelIntro("Level 1: Kitty Riddles!", "Solve 3 silly riddles to earn treats!", startLevel1);
};

// --- Level 1 ---
function startLevel1() {
  gameBox.style.display = "block";
  title.innerText = "Quest 1";
  text.innerText = "What’s really the cutest thing here?";
  answerInput.value = "";
  feedback.innerText = "";
}

function submitAnswer() {
  const answer = answerInput.value.trim().toLowerCase();

  if (quest === 1 && answer === "hrishi") {
    quest = 2;
    updateTreats(2);
    showLevelIntro("Level 2: Sneaky Bird!", "A bird appears… can you catch it?", startLevel2);
  } else if (quest === 2 && answer === "hrishukesh") {
    quest = 3;
    updateTreats(2);
    showLevelIntro("Level 3: Hidden Kittens!", "Click all 10 hidden kittens!", startLevel3);
  } else if (quest === 3 && answer === "me") {
    quest = 4;
    updateTreats(2);
    showLevelIntro("Level 2: Sneaky Bird!", "A bird appears… can you catch it?", startLevel2);
  } else {
    feedback.innerText = "Try again 😼";
  }
}

// --- Level 2 and 3 code remains the same as previously discussed ---
