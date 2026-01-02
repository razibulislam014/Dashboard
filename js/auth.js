const login = document.getElementById("login");
const register = document.getElementById("register");
const registerForm = document.getElementById("registerForm");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

const data = {};
function getInputValue(input) {
  const { name, value } = input;
  data[name] = value;
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("user", JSON.stringify(data));
  location.replace("index.html");
});

function changeUI(e) {
  e.preventDefault();
  login.classList.toggle("hidden");
  register.classList.toggle("hidden");
}

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const user = localStorage.getItem("user");
  const jsonUser = JSON.parse(user);
  if (data.password === jsonUser.password && data.email === jsonUser.email) {
    location.replace("index.html");
  } else {
    console.log("Wrong Email or Password!");
  }
});
