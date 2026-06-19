const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const downButton = document.getElementById("month-year-select");

const currentMonthLabel = document.querySelector(".current-month");
const activityGraph = document.querySelector(".activity-graph");

dropdownMenu();


const currentDate = new Date();
renderCalender(currentDate);

prevButton.addEventListener("click", function () {
  activityGraph.textContent = "";
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalender(currentDate);
})

nextButton.addEventListener("click", function () {
  activityGraph.textContent = "";
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



  for (let i = 0; i < daysInMonth; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("day-square");

    activityGraph.appendChild(newSquare);
    newSquare.textContent = i + 1;

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
    const dataJson = await data.json();
  } catch (error) {
    console.error("Unexpected behavoir: " + error);
  }

};