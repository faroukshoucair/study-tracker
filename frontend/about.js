const submitButton = document.getElementById("submit-button");
const bugInput = document.getElementById("bug-input");

submitButton.addEventListener("click", function () {

  const userInput = bugInput.value;

  if (userInput === "") {
    alert("Please type something before submitting");
    return;
  }

  alert("Your submission will be reviewed, thank you for helping improve the website!");

  console.log(userInput);

  bugInput.value = "";

})