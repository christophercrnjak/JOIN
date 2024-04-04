
let mail = document.getElementById("mail");
let password = document.getElementById("password");

/**
 * Loads user data from Server to Array "users[]"
 */
//async function init() {
//  await loadUsers();
  // setTimeout(function () {
  //   document.querySelector(".logo").classList.add("move-logo");
  // }, 1000);
//}

async function handleLogIn() {
  await loadUsers();
  checkExistingUser();
  setInterval(() => {
    window.location.href = "summary.html";
  }, 1000);
}

async function checkExistingUser() {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.mail == mail.value && user.password == password.value) {
      currentUser = JSON.parse(JSON.stringify(user));
      await saveCurrentUserOnServer();
    }
  }
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






