import { getusers } from "./api.js";

const logedUser = document.getElementById("user");
const dashboardUserTable = document.getElementById("userList");
const usersTable = document.getElementById("usersTable");

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

if (location.pathname === "/index.html")
  logedUser.innerText = `Welcome, ${conObj.firstName + " " + conObj.lastName}`;

// This is for dashboard users section
(async () => {
  const users = await getusers();
  const fragment = document.createDocumentFragment();

  users.forEach(({ name, email }) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${name}</td>
    <td>${email}</td>
    `;
    fragment.appendChild(tr);
  });

  dashboardUserTable.appendChild(fragment);
})();

// This is Users Page section
(async () => {
  const users = await getusers();
  const fragment = document.createDocumentFragment();

  users.forEach(({ name, email, username, website }) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${name}</td>
                            <td>${username}</td>
                            <td>${email}</td>
                            <td><span class="status">${
                              website || "Unavailable"
                            }</span></td>
                            <td>
                                <button class="btn btn-view">View</button>
                                <button class="btn btn-delete">Delete</button>
                            </td>
    `;
    fragment.appendChild(tr);
  });

  usersTable.appendChild(fragment);
})();
