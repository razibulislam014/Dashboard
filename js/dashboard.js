import { getusers } from "./api.js";

const logedUser = document.getElementById("user");
const dashboardUserTable = document.getElementById("userList");
const usersTable = document.getElementById("usersTable");
const closeView = document.getElementById("closeView");

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

function showDetails(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("viewModal").style.display = "block";
      document.getElementById("vName").innerHTML = data.name;
      document.getElementById("vUsername").innerHTML = data.username;
      document.getElementById("vEmail").innerHTML = data.email;
      document.getElementById("vPhone").innerHTML = data.phone;
      document.getElementById("vAddress").innerHTML = data.address.city;
      document.getElementById("vWebsite").innerHTML = data.website;
      document.getElementById("vCompany").innerHTML = data.company.name;
      document.getElementById("vAvatar").innerHTML = data.name
        .split(" ")
        .map((n) => n[0])
        .join("");
    });

  document.getElementById("vName");
}

// This is Users Page section
(async () => {
  const users = await getusers();
  const fragment = document.createDocumentFragment();
  console.log(users);

  users.forEach(({ name, email, username, website, id }) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${name}</td>
                            <td>${username}</td>
                            <td>${email}</td>
                            <td><span class="status">${
                              website || "Unavailable"
                            }</span></td>
                            <td>
                                <button class="btn btn-view" data-id="${id}">View</button>
                                <button class="btn btn-delete">Delete</button>
                            </td>
    `;
    fragment.appendChild(tr);
  });

  usersTable.appendChild(fragment);

  document.addEventListener("click", (e) => {
    const viewBtn = e.target.closest(".btn-view");
    if (!viewBtn) return;

    const id = viewBtn.dataset.id;
    showDetails(id);
  });
})();

function closeViewF() {
  document.getElementById("viewModal").style.display = "none";
}

closeView.addEventListener("click", closeViewF);
