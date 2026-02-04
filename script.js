let quest = 1;
let treats = 0;

// Grab elements
const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("questTitle");
const text = document.getElementById("questText");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const hiddenBox = document.getElementById("hiddenBox");
const treatCounter = document.getElementById("treatCounter");
const kittenGame = document.getElementById("kittenGame");
const bigCat = document.getElementById("bigCat");
const letter = document.getElementById("letter");

// Start game from intro
startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  document.getElementById("game").style.display = "block";
  startLevel1();
});

// Update treats
function updateTreats(points) {
  treats += points;
  treatCounter.innerText = `🐾 Treats: ${treats}`;
}

// --- Level 1: Riddles ---
function startLevel1() {
  title.innerText = "Quest 1";
  text.innerText = "What’s really the cutest thing here?";
}

function submitAnswer() {
  const answer = answerInput.value.trim().toLowerCase();

  if (quest === 1 && answer === "hrishi") {
    quest = 2;
    updateTreats(2);
    title.innerText = "Quest 2";
    text.innerText = "I’m soft, small, and jump when happy. What am I?";
    answerInput.value = "";
    feedback.innerText = "Purr-fect! 🐾";
  } 
  else if (quest === 2 && answer === "hrishukesh") {
    quest = 3;
    updateTreats(2);
    title.innerText = "Quest 3";
    text.innerText = "I love naps, cuddles, and snacks. Who could I be?";
    answerInput.value = "";
    feedback.innerText = "You got it! 😻";
  } 
  else if (quest === 3 && answer === "me") {
    quest = 4;
    updateTreats(2);
    title.innerText = "Level 2: Sneaky Box!";
    text.innerText = "A sneaky kitty appears… can you catch it?";
    answerInput.style.display = "none";
    feedback.innerText = "The next challenge begins! 🐱💨";
    startSneakyBox();
  } 
  else {
    feedback.innerText = "Try again 😼";
  }
}

// --- Level 2: Sneaky box ---
function startSneakyBox() {
  hiddenBox.style.display = "block";
  hiddenBox.style.top = Math.random() * (window.innerHeight - 100) + "px";
  hiddenBox.style.left = Math.random() * (window.innerWidth - 100) + "px";

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

    newLeft = Math.max(0, Math.min(window.innerWidth - boxRect.width, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - boxRect.height, newTop));

    hiddenBox.style.left = newLeft + "px";
    hiddenBox.style.top = newTop + "px";
  }
}

function catchBox() {
  updateTreats(3);
  hiddenBox.style.display = "none";
  document.removeEventListener("mousemove", sneakyBoxMove);
  hiddenBox.removeEventListener("click", catchBox);

  // Start Level 3
  startKittenHunt();
}

// --- Level 3: Find hidden kittens ---
function startKittenHunt() {
  title.innerText = "Level 3: Find All Kittens!";
  text.innerText = "Click all 10 hidden kitties!";
  kittenGame.innerHTML = "";

  const numKitties = 10;
  for (let i = 0; i < numKitties; i++) {
    const img = document.createElement("img");
    img.src = "kitten.png"; // Replace with your kitten image
    img.style.top = Math.random() * (window.innerHeight - 60) + "px";
    img.style.left = Math.random() * (window.innerWidth - 60) + "px";
    img.classList.add("kitten");
    kittenGame.appendChild(img);

    img.addEventListener("click", () => {
      img.remove();
      if (kittenGame.children.length === 0) {
        updateTreats(5);
        finishGame();
      }
    });
  }
}

// --- Finish game ---
function finishGame() {
  title.innerText = "All Games Complete!";
  text.innerText = "Give all the treats to the big cat!";
  bigCat.style.display = "block";
  letter.style.display = "block";
  letter.innerText = "💌 Letter placeholder…"; // Update content later
}
