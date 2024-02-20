let users = [];
let mail = document.getElementById("mail");
let password = document.getElementById("password");

async function init() {
  await loadUsers();
}

function handleLogIn() {
  checkExistingUser();

  // window.location.href = "summary.html";
}

function handleGuestLogIn() {
  window.location.href = "summary.html";
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.warn("Could not load users!");
  }
}

function checkExistingUser() {
  // debugger;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.mail == mail.value && user.password == password.value) {
      // add this information about that specific account in users
      console.log("stimmt überein");
    }
  }
}
