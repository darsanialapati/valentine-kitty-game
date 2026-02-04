let quest = 1;
let treats = 0;

// Grab elements
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

// --- Level 1 ---
function startLevel1() {
  gameBox.style.display = "block";
  title.innerText = "Quest 1";
  text.innerText = "What’s really the cutest thing here?";
  answerInput.value = "";
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

// --- Level 2: Sneaky Bird ---
function startLevel2() {
  hiddenBox.style.display = "block";
  hiddenBox.style.top = Math.random() * (window.innerHeight - 80) + "px";
  hiddenBox.style.left = Math.random() * (window.innerWidth - 80) + "px";

  document.addEventListener("mousemove", sneakyBoxMove);
  hiddenBox.addEventListener("click", catchBox);
}

function sneakyBoxMove(e) {
  const boxRect = hiddenBox.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const distanceX = mouseX - (boxRect.left + boxRect.width / 2);
  const distanceY = mouseY - (boxRect.top + boxRect.height / 2);
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  if (distance < 120) {
    const moveX = (distanceX / distance) * 150;
    const moveY = (distanceY / distance) * 150;

    let newLeft = boxRect.left - moveX;
    let newTop = boxRect.top - moveY;

    // keep bird within screen bounds
    newLeft = Math.max(0, Math.min(window.innerWidth - boxRect.width, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - boxRect.height, newTop));

    hiddenBox.style.left = newLeft + "px";
    hiddenBox.style.top = newTop + "px";
  }
}

function catchBox() {
  updateTreats(3);

  document.removeEventListener("mousemove", sneakyBoxMove);
  hiddenBox.removeEventListener("click", catchBox);

  // Move bird to bottom-right corner
  const boxRect = hiddenBox.getBoundingClientRect();
  hiddenBox.style.left = (window.innerWidth - boxRect.width - 20) + "px";
  hiddenBox.style.top = (window.innerHeight - boxRect.height - 20) + "px";
  hiddenBox.style.transition = "top 0.5s, left 0.5s";

  setTimeout(() => {
    hiddenBox.style.display = "none";
    showLevelIntro("Level 3: Hidden Kittens!", "Click all 10 hidden kittens!", startLevel3);
  }, 800);
}

// --- Level 3: Hidden Kittens ---
function startLevel3() {
  kittenGame.style.display = "block";
  kittenGame.innerHTML = "";
  const numKitties = 10;

  for (let i = 0; i < numKitties; i++) {
    const img = document.createElement("img");
    img.src = "kitten.png";
    img.style.top = Math.random() * (window.innerHeight - 60) + "px";
    img.style.left = Math.random() * (window.innerWidth - 60) + "px";
    kittenGame.appendChild(img);

    img.addEventListener("click", () => {
      img.remove();
      if (kittenGame.children.length === 0) {
        updateTreats(5);
        showFinalScene();
      }
    });
  }
}

// --- Final Scene ---
function showFinalScene() {
  kittenGame.style.display = "none";
  finalScene.style.display = "block";
}

feedBtn.onclick = () => {
  bigKitten.innerText = "😻"; // kitten becomes happy
  letter.style.display = "block";
  feedBtn.style.display = "none";
  document.getElementById("feedText").innerText = "Yay! The kitten loves the treats! 💖";
};

// --- Start Game ---
showLevelIntro(
  "Welcome to the Valentine Kitty Game! 🐾",
  "Are you smart and cute enough to help our hungry kitty?\nSolve the riddles, catch the bird, and find the hidden kittens to collect treats!",
  startLevel1
);
