const logedUser = document.getElementById("user");

const user = localStorage.getItem("user");
const conObj = JSON.parse(user);

function authGourd() {
  const isLogin = conObj.isLogin;
  const page = location.pathname;

  if (!isLogin && !page.includes("login.html")) {
    location.replace("login.html");
    return;
  }

  if (isLogin && page.includes("login.html")) {
    location.replace("index.html");
  }
}
authGourd();

logedUser.innerText = `Welcome, ${conObj.firstName + " " + conObj.lastName}`;
