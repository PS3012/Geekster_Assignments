const stopwatch = document.querySelector(".timer");
const play = document.querySelector('[action="play"]');
const pause = document.querySelector('[action="pause"]');
const reset = document.querySelector('[action="reset"]');
const lap = document.querySelector('[action="lap"]');
const toaster = document.querySelector(".toaster");
const lapGrid = document.querySelector(".lap-grid");
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const showToaster = (text) => {
  toaster.innerText = text;
  toaster.classList.remove("hide");
  setTimeout(() => {
    toaster.classList.add("hide");
  }, 3000);
};

const getWatchTimers = () => {
  const currentTime = Date.now();
  const timeDiff = currentTime - startTime + elapsedTime;
  const milliseconds = timeDiff % 1000;
  const seconds = Math.floor((timeDiff / 1000) % 60);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  return {
    milliseconds: String(milliseconds).padStart(3, "0"),
    seconds: String(seconds).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
  };
};

function updateStopwatch() {
  const { milliseconds, seconds, minutes, hours } = getWatchTimers();

  stopwatch.innerHTML = `
  <div>${hours}</div>
  <div>:</div>
  <div>${minutes}</div>
  <div>:</div>
  <div>${seconds}</div>
  <div>.</div>
  <div>${milliseconds}</div>
  `;
}

play.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    timer = setInterval(updateStopwatch, 10);
    isRunning = true;
  } else {
    showToaster("Stopwatch is already running!");
  }
});

pause.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  } else {
    showToaster("Stopwatch is not running!");
  }
});

reset.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  lapGrid.innerHTML = "";
  stopwatch.innerHTML =
    "<div>00</div><div>:</div><div>00</div><div>:</div><div>00</div><div>.</div><div>000</div>";
  showToaster("Stopwatch reset to default!");
});

lap.addEventListener("click", () => {
  if (isRunning) {
    const { milliseconds, seconds, minutes, hours } = getWatchTimers();
    showToaster(`Added Lap at ${hours}:${minutes}:${seconds}.${milliseconds}`);
    const lapItem = `<div class="lap-item"><i class="fa-brands fa-square-font-awesome-stroke"></i> &nbsp;&nbsp; ${hours}:${minutes}:${seconds}.${milliseconds}</div>`;
    lapGrid.innerHTML += lapItem;
  } else {
    showToaster("Start the stopwatch first!");
  }
});
