const login = document.getElementById("login");
const register = document.getElementById("register");
const registerForm = document.getElementById("registerForm");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logout = document.getElementById("logout");

const data = {};
function getInputValue(input) {
  const { name, value } = input;
  data[name] = value;
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("user", JSON.stringify({ ...data, isLogin: true }));
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
    localStorage.setItem(
      "user",
      JSON.stringify({ ...jsonUser, isLogin: true })
    );

    location.replace("index.html");
  } else {
    console.log("Wrong Email or Password!");
  }
});

function handleLogout() {
  const user = localStorage.getItem("user");
  const jsonUser = JSON.parse(user);
  localStorage.setItem("user", JSON.stringify({ ...jsonUser, isLogin: false }));

  location.replace("login.html");
}
