const stopwatchDisplay = document.getElementById("stopwatch-display");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const saveButton = document.getElementById("save-button");

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
})


stopButton.addEventListener("click", function () {
  if (isRunning) {
    clearInterval(timer);
    timer = null;
    isRunning = false;
  }
})

resetButton.addEventListener("click", function () {
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  clearInterval(timer);
  timer = null;
  stopwatchDisplay.textContent = "00:00:00";
})



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



//get datta
const getData = async () => {
  try {
    const data = await fetch("http://127.0.0.1:8000/log");
    const dataJson = await data.json();
  } catch (error) {
    console.error("Unexpected behavoir: " + error);
  }

};


//send data
const sendData = async (elapsedTimeSeconds) => {
  try {
    const data = await fetch("http://127.0.0.1:8000/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ duration: elapsedTimeSeconds }),
    });

    const dataJson = await data.json();

    if (data.ok) {
      return true;
    }

  } catch (error) {
    console.error("Unexpected behavoir: " + error);
    return false;
  }

};


saveButton.addEventListener("click", async function () {
  const elapsedTimeSeconds = Math.floor(elapsedTime / 1000);
  console.log(elapsedTimeSeconds);
  const log_result = await sendData(elapsedTimeSeconds);
  if (log_result) {
    alert("Data logged");
  }
  else {
    alert("Data was NOT logged");
  }
})


