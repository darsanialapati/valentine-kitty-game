let treats = 0;
let quest = 1;

/* Elements */
const questScreen = document.getElementById("questScreen");
const questTitle = document.getElementById("questTitle");
const questText = document.getElementById("questText");
const answerInput = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const treatsDisplay = document.getElementById("treats");

const bird = document.getElementById("bird");
const kittenGame = document.getElementById("kittenGame");
const kitty = document.getElementById("kitty");
const loveLetter = document.getElementById("loveLetter");

/* --------------------
   RIDDLE LOGIC
-------------------- */
function checkAnswer() {
  const answer = answerInput.value.trim().toLowerCase();

  if (quest === 1 && answer === "hrishi") {
    feedback.textContent = "Paw-fect 🐾";
    treats += 5;
    treatsDisplay.textContent = treats;
    startBirdQuest();
  } else {
    feedback.textContent = "Try again 😿";
  }
}

/* --------------------
   BIRD RUNS FROM CURSOR
   (NO RANDOM TELEPORTS)
-------------------- */
function startBirdQuest() {
  document.addEventListener("mousemove", (e) => {
    const birdRect = bird.getBoundingClientRect();
    const dx = birdRect.x - e.clientX;
    const dy = birdRect.y - e.clientY;
    const distance = Math.hypot(dx, dy);

    if (distance < 120) {
      let newX = birdRect.x + dx * 0.4;
      let newY = birdRect.y + dy * 0.4;

      // Constrain bird (cannot escape bottom-right)
      newX = Math.min(newX, window.innerWidth - 100);
      newY = Math.min(newY, window.innerHeight - 100);
      newX = Math.max(20, newX);
      newY = Math.max(20, newY);

      bird.style.transform = `translate(${newX - birdRect.x}px, ${newY - birdRect.y}px)`;
    }
  });

  bird.addEventListener("click", catchBird);
}

function catchBird() {
  treats += 5;
  treatsDisplay.textContent = treats;

  bird.style.display = "none";
  questScreen.classList.add("hidden");
  kittenGame.classList.remove("hidden");

  enableFishDrag();
}

/* --------------------
   FISH → KITTY
-------------------- */
let fishFed = 0;
const fish = document.querySelectorAll(".fish");

function enableFishDrag() {
  fish.forEach(f => {
    f.draggable = true;

    f.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", "");
      f.classList.add("dragging");
    });
  });

  kitty.addEventListener("dragover", (e) => e.preventDefault());

  kitty.addEventListener("drop", () => {
    const draggedFish = document.querySelector(".dragging");
    if (!draggedFish) return;

    draggedFish.remove();
    fishFed++;
    treats++;
    treatsDisplay.textContent = treats;

    if (fishFed === fish.length) {
      kitty.textContent = "😻";
      loveLetter.classList.remove("hidden");
    }
  });
}
