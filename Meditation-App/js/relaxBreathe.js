const breatheModal = document.querySelector("#breathe-modal");
const closeBtn = breatheModal.querySelector(".close");
const openBreathe = document.querySelectorAll(".playBtn");
const text = document.querySelector("#breathe-modal #text");
const playButton = document.querySelector("#breathe-modal #playButton");
const stopButton = document.querySelector("#breathe-modal #stopButton");
const modalHeading = document.querySelector("#breathe-modal .heading");
const backgroundCircle = document.querySelector(".background-circle");
let animationInterval;
let timeouts = [];
let breathingPattern = { breatheIn: 3000, hold: 2000, breatheOut: 3000 };

function startBreathingAnimation() {
  playButton.style.display = "none";
  stopButton.style.display = "block";
  animateBreathing();
  animationInterval = setInterval(
    animateBreathing,
    breathingPattern.breatheIn +
      breathingPattern.hold +
      breathingPattern.breatheOut
  );
}

function animateBreathing() {
  clearActiveTimeouts();
  text.innerText = "Breathe In";
  text.style.transform = "scale(1.5)";
  backgroundCircle.style.width = "200px";
  backgroundCircle.style.height = "200px";
  backgroundCircle.style.transition = `all ${
    breathingPattern.breatheIn / 1000
  }s ease-in-out`;

  const holdTimeout = setTimeout(() => {
    text.innerText = "Hold";
    text.style.transform = "scale(1.3)";
  }, breathingPattern.breatheIn);
  timeouts.push(holdTimeout);

  const breatheOutTimeout = setTimeout(() => {
    text.innerText = "Breathe Out";
    text.style.transform = "scale(1)";
    backgroundCircle.style.width = "0";
    backgroundCircle.style.height = "0";
    backgroundCircle.style.transition = `all ${
      breathingPattern.breatheOut / 1000
    }s ease-in-out`;
  }, breathingPattern.breatheIn + breathingPattern.hold);
  timeouts.push(breatheOutTimeout);
}

function stopBreathingAnimation() {
  clearInterval(animationInterval);
  clearActiveTimeouts();
  resetToDefault();
}

function clearActiveTimeouts() {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts = [];
}

function resetToDefault() {
  playButton.style.display = "block";
  stopButton.style.display = "none";
  text.innerText = "Breathe In";
  text.style.transform = "scale(1)";
  backgroundCircle.style.width = "0";
  backgroundCircle.style.height = "0";
  backgroundCircle.style.transition = "none";
}

window.addEventListener("load", () => {
  closeBtn.addEventListener("click", () => {
    stopBreathingAnimation();
    breatheModal.classList.add("d-none");
  });

  openBreathe.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      if (category === "deep-breathe") {
        breathingPattern = { breatheIn: 3000, hold: 2000, breatheOut: 3000 };
        modalHeading.innerText = "Deep Breathe";
      } else if (category === "four-seven-eight") {
        breathingPattern = { breatheIn: 4000, hold: 7000, breatheOut: 8000 };
        modalHeading.innerText = "4-7-8 Technique";
      }
      resetToDefault();
      breatheModal.classList.remove("d-none");
    });
  });
});

playButton.addEventListener("click", startBreathingAnimation);
stopButton.addEventListener("click", stopBreathingAnimation);
