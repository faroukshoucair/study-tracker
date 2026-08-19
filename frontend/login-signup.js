const signupLink = document.getElementById("signup-link");
const signinLink = document.getElementById("signin-link");

const signupForm = document.querySelector(".signup-form");
const signinForm = document.querySelector(".signin-form");

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.remove("hidden");
  signinForm.classList.add("hidden");
});

signinLink.addEventListener("click", (e) => {
  e.preventDefault();
  signinForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userPassword = document.getElementById("user-password").value;
  const userConfirmedPassword = document.getElementById("user-confirm-password").value;
  console.log(userPassword);
  console.log(userConfirmedPassword);

  if (userPassword !== userConfirmedPassword) {
    alert("Passwords do not match!");
    return;
  }
})





