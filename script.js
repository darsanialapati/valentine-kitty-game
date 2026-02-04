let quest = 1;

// Grab elements
const title = document.getElementById("questTitle");
const text = document.getElementById("questText");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");

// Start the first quest right away
title.innerText = "Quest 1";
text.innerText = "What’s really the cutest thing here?";

function submitAnswer() {
  const answer = answerInput.value.trim().toLowerCase();

  // Quest 1: Cute twist, answer is your name
  if (quest === 1 && answer === "Hrishi") {
    quest = 2;
    title.innerText = "Quest 2";
    text.innerText = "I’m soft, small, and jump when happy. What am I?";
    answerInput.value = "";
    feedback.innerText = "Purr-fect! 🐾";
  } 
  // Quest 2: Cute kitty riddle
  else if (quest === 2 && answer === "Hrishukesh") {
    quest = 3;
    title.innerText = "Quest 3";
    text.innerText = "I love naps, cuddles, and snacks. Who could I be?";
    answerInput.value = "";
    feedback.innerText = "You got it! 😻";
  }
  // Quest 3: Last cute riddle
  else if (quest === 3 && answer === "me") {
    quest = 4;
    title.innerText = "Final Quest";
    text.innerText = "Congratulations! You’ve solved all the silly kitty riddles! 🎉";
    answerInput.value = "";
    feedback.innerText = "You’re officially a kitty riddle champion! 🐱💖";
  }
  else {
    feedback.innerText = "Try again 😼";
  }
}
