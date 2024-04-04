/**
 * @type {JSON} - like:
 * 0: 
 *    lockedIn: false
 *    mail: "triam90@gmx.de"
 *    name:
 *       color: "#ff4646"
 *       firstName: "Richard"
 *       secondName: "Wezel"
 *       password: "bumsfallera90"
 */
let users = [];

let mail = document.getElementById("mail");
let password = document.getElementById("password");
let currentUser = [];

// document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadUsers();
  // setTimeout(function () {
  //   document.querySelector(".logo").classList.add("move-logo");
  // }, 1000);
}

function handleLogIn() {
  checkExistingUser();
  if (checkExistingUser) {
    setCurretUser();
  }

  setInterval(() => {
    window.location.href = "summary.html";
  }, 1000);
}

function handleGuestLogIn() {
  window.location.href = "summary.html";
}

async function loadUsers() {
  try {
    let ServerData;
    ServerData = await getItem("users");
    let newData = JSON.parse(ServerData.data.value);
    users = newData;
  } catch (e) {
    console.warn("Could not load users!");
  }
}

function checkExistingUser() {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.mail == mail.value && user.password == password.value) {
      user.lockedIn = true;
    }
  }
}

function setCurretUser() {}
