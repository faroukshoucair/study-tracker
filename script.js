let stopwatchDisplay = document.getElementById("stopwatch-display");
let startButton = document.getElementById("start-button");
let stopButton = document.getElementById("stop-button");
let resetButton = document.getElementById("reset-button");


let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timer = null;

startButton.addEventListener("click", function () {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 500);
    isRunning = true;
  }
});


stopButton.addEventListener("click", function () {
  if (isRunning) {
    clearInterval(timer);
    timer = null;
    isRunning = false;
  }
});

resetButton.addEventListener("click", function () {
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  clearInterval(timer);
  timer = null;
  stopwatchDisplay.textContent = "00:00:00";
});



function updateDisplay() {
  let currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  let hours = Math.floor(elapsedTime / 3600000);
  let minutes = Math.floor((elapsedTime / 60000) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}






