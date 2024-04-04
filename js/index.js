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

let mail = document.getElementById("mail");
let password = document.getElementById("password");


// document.addEventListener("DOMContentLoaded", init);

/**
 * Loads user data from Server to Array "users[]"
 */
async function init() {
  await loadUsers();
  // setTimeout(function () {
  //   document.querySelector(".logo").classList.add("move-logo");
  // }, 1000);
}

function handleLogIn() {
  checkExistingUser();
  setInterval(() => {
    window.location.href = "summary.html";
  }, 1000);
}

async function handleGuestLogIn() {
  window.location.href = "summary.html";
  currentUser = 'Guest';
  await saveCurrentUserOnServer();
}

async function loadUsers() {
  try {
    let ServerData;
    ServerData = await getItem("users");
    let newData = JSON.parse(ServerData.data.value);
    users = JSON.parse(JSON.stringify(newData));
  } catch (e) {
    console.warn("Could not load users!");
  }
}

async function checkExistingUser() {
  let user = users[0];
  if (user.mail == mail.value && user.password == password.value) {
    currentUser = user;
    await saveCurrentUserOnServer();
  }
}




