function submitAnswer() {
  const answer = answerInput.value.trim().toLowerCase(); // convert to lowercase

  // Quest 1: Kitty math (10 + 2)
  if (quest === 1 && answer === "12") {
    quest = 2;
    title.innerText = "Quest 2";
    text.innerText = "Type the word: love";
    answerInput.value = "";
    feedback.innerText = "Purr-fect! 😸";
  } 
  // Quest 2: Type the word "love"
  else if (quest === 2 && answer === "love") {
    quest = 3; // optional: move to next quest
    title.innerText = "Quest 3";
    text.innerText = "You did it! 🎉"; // or whatever you want
    answerInput.value = "";
    feedback.innerText = "Purr-fect! 😻";
  }
  else {
    feedback.innerText = "Try again 😼";
  }
}
