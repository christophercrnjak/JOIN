let users = [];
let mail = document.getElementById('mail');
let password = document.getElementById('password');


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
  debugger;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.mail == mail.value) {
      console.log('funzt');
    } else {
      console.log('nö');
    }
  }
}