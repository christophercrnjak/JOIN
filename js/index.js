
let mail = document.getElementById("mail");
let password = document.getElementById("password");

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
  currentUser = {"name": {"firstName": "Guest", "secondName": "", "color": "#ff4646"}, "mail": "", "password": "", "lockedIn": true};
  await saveCurrentUserOnServer();
  await getCurrentUserFromServer();
  window.location.href = "summary.html";
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






