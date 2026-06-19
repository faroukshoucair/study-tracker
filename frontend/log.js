const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const downButton = document.getElementById("month-year-select");

const currentMonthLabel = document.querySelector(".current-month");
const activityGraph = document.querySelector(".activity-graph");

let fetchedLogs = [];


dropdownMenu();

const currentDate = new Date();

prevButton.addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalender(currentDate);
})

nextButton.addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalender(currentDate);
})

downButton.addEventListener("change", function (event) {
  const selectedDate = event.target.value;
  console.log(selectedDate);
  const [month, year] = selectedDate.split("/");


  currentDate.setMonth(month - 1);
  currentDate.setFullYear(year);
  renderCalender(currentDate);
})


function renderCalender(currentDate) {
  activityGraph.textContent = "";
  const currentYear = currentDate.getFullYear();
  const currentMonthNumber = currentDate.getMonth();
  const currentMonthName = currentDate.toLocaleDateString("default", { month: "long" });

  currentMonthLabel.textContent = currentMonthName + " " + currentYear;

  const daysInMonth = new Date(currentYear, currentMonthNumber + 1, 0).getDate();


  const studyMap = {};
  fetchedLogs.forEach(log => {
    const logDate = log.date;
    const duration = parseFloat(log.duration);

    if (studyMap[logDate]) {
      studyMap[logDate] += duration;
    }
    else {
      studyMap[logDate] = duration;
    }
  });


  for (let i = 0; i < daysInMonth; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("day-square");

    const day = i + 1;


    const formattedMonth = String(currentMonthNumber + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const logKey = `${currentYear}-${formattedMonth}-${formattedDay}`;

    const secondsStudied = studyMap[logKey] || 0;

    const hoursStudied = Math.floor(secondsStudied / 3600);
    const minutesStudied = Math.floor((secondsStudied % 3600) / 60);

    if (secondsStudied === 0) {
      newSquare.classList.add("level-null"); // no time studied
      newSquare.setAttribute("data-tooltip", `${formattedMonth}/${formattedDay}/${currentYear}: You did not study on this day.`);
    }
    else if (secondsStudied <= 10800) { // less than or equal to 3 hours of study
      newSquare.classList.add("level-one");
      newSquare.setAttribute("data-tooltip", `${formattedMonth}/${formattedDay}/${currentYear}: You studied for ${hoursStudied} hours and ${minutesStudied} minutes`);
    }
    else if (secondsStudied <= 21600) { // less than or equal to 6 hours of study
      newSquare.classList.add("level-two");
      newSquare.setAttribute("data-tooltip", `${formattedMonth}/${formattedDay}/${currentYear}: You studied for ${hoursStudied} hours and ${minutesStudied} minutes`);
    }
    else if (secondsStudied <= 28800) { // less than or equal to 8 hours of study
      newSquare.classList.add("level-three");
      newSquare.setAttribute("data-tooltip", `${formattedMonth}/${formattedDay}/${currentYear}: You studied for ${hoursStudied} hours and ${minutesStudied} minutes`);
    }
    else if (secondsStudied > 28800) { // greater than 8 hours of study
      newSquare.classList.add("level-four");
      newSquare.setAttribute("data-tooltip", `${formattedMonth}/${formattedDay}/${currentYear}: You studied for ${hoursStudied} hours and ${minutesStudied} minutes`);
    }
    else {
      newSquare.classList.add("level-null");
      newSquare.setAttribute("data-tooltip", `${formattedMonth}/${formattedDay}/${currentYear}: You did not study on this day.`);
    }

    activityGraph.appendChild(newSquare);
    newSquare.textContent = day;

  }




}

function dropdownMenu() {

  downButton.textContent = "";

  //change to when user registers
  const startMonth = 6;
  const startYear = 2026

  const endYear = 2050

  for (let y = startYear; y <= endYear; y++) {
    for (let m = 1; m <= 12; m++) {
      if (y === startYear && m < startMonth) {
        continue;
      }
      const dropdownOption = document.createElement("option")
      dropdownOption.value = m + "/" + y;
      dropdownOption.textContent = m + "/" + y;
      downButton.appendChild(dropdownOption);

    }
  }

}



//get datta
const getData = async () => {
  try {
    const data = await fetch("http://127.0.0.1:8000/log");
    fetchedLogs = await data.json();
    renderCalender(currentDate);
  } catch (error) {
    console.error("Unexpected behavoir: " + error);
    renderCalender(currentDate);
  }

};
getData();