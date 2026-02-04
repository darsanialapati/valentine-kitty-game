let quest = 1;

// Grab elements from the page
const title = document.getElementById("questTitle");
const text = document.getElementById("questText");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");

function submitAnswer() {
  const answer = answerInput.value.trim();

  // Quest 1: Kitty math (10 + 2)
  if (quest === 1 && answer === "12") {
    quest = 2;
    title.innerText = "Quest 2";
    text.innerText = "Type the word: love";
    answerInput.value = "";
    feedback.innerText = "Purr-fect! 😸";
  } 
  else {
    feedback.innerText = "Try again 😼";
  }
}
