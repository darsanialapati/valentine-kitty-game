let quest = 1;

// Grab elements
const title = document.getElementById("questTitle");
const text = document.getElementById("questText");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const hiddenBox = document.getElementById("hiddenBox");

// Start the first quest right away
title.innerText = "Quest 1";
text.innerText = "What’s really the cutest thing here?";

// Hide the box initially
hiddenBox.style.display = "none";

// Main quest function
function submitAnswer() {
  const answer = answerInput.value.trim().toLowerCase();

  // Quest 1: Cute twist, answer is your name
  if (quest === 1 && answer === "hrishi") {
    quest = 2;
    title.innerText = "Quest 2";
    text.innerText = "I’m soft, small, and jump when happy. What am I?";
    answerInput.value = "";
    feedback.innerText = "Purr-fect! 🐾";
  } 
  // Quest 2: Cute kitty riddle
  else if (quest === 2 && answer === "hrishukesh") {
    quest = 3;
    title.innerText = "Quest 3";
    text.innerText = "I love naps, cuddles, and snacks. Who could I be?";
    answerInput.value = "";
    feedback.innerText = "You got it! 😻";
  }
  // Quest 3: Last cute riddle
  else if (quest === 3 && answer === "me") {
    quest = 4;
    title.innerText = "Level 2: Sneaky Box!";
    text.innerText = "A sneaky kitty appears… can you catch it?";
    answerInput.value = "";
    feedback.innerText = "The next challenge begins! 🐱💨";

    // Hide input since level 2 is click-based
    answerInput.style.display = "none";

    // Show the box and start the mini-game
    startSneakyBox();
  }
  else {
    feedback.innerText = "Try again 😼";
  }
}

// LEVEL 2: Sneaky Box Mini-Game
function startSneakyBox() {
  hiddenBox.style.display = "block";
  hiddenBox.style.position = "absolute";
  hiddenBox.style.width = "80px";
  hiddenBox.style.height = "80px";
  hiddenBox.style.background = "pink";
  hiddenBox.style.borderRadius = "15px";
  hiddenBox.style.textAlign = "center";
  hiddenBox.style.lineHeight = "80px";
  hiddenBox.style.fontWeight = "bold";
  hiddenBox.style.cursor = "pointer";
  hiddenBox.innerText = "🐾";

  // Place randomly at the start
  hiddenBox.style.top = Math.random() * (window.innerHeight - 100) + "px";
  hiddenBox.style.left = Math.random() * (window.innerWidth - 100) + "px";

  // Move the box away from the cursor
  document.addEventListener("mousemove", sneakyBoxMove);
  hiddenBox.addEventListener("click", catchBox);
}

// Move box when mouse is near
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

    // Keep box inside viewport
    newLeft = Math.max(0, Math.min(window.innerWidth - boxRect.width, newLeft));
    newTop = Math.max(0, Math.min(window.innerHeight - boxRect.height, newTop));

    hiddenBox.style.left = newLeft + "px";
    hiddenBox.style.top = newTop + "px";
  }
}

// Click the box
function catchBox() {
  alert("You caught the sneaky kitty! 🎉 You completed Level 2!");
  hiddenBox.style.display = "none";

  // Stop moving the box
  document.removeEventListener("mousemove", sneakyBoxMove);
  hiddenBox.removeEventListener("click", catchBox);

  // Optional: show final message
  title.innerText = "Game Complete!";
  text.innerText = "You are officially a kitty riddle master! 🐱💖";
  feedback.innerText = "";
}
