let users = [];
let passwordCheckStatus;
let checkbox = document.getElementById("checkbox");
let password_message = document.getElementById("password_message");
let confirm_password = document.getElementById("confirm_password");
let firstName;
let secondName;
let register_btn = document.getElementById("register_btn");
let userName = document.getElementById("name");
let mail = document.getElementById("mail");
let password = document.getElementById("password");
let registerSuccessfull = document.getElementById("register_successfull");

async function init() {
  loadUsers();
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

async function register() {
  comparePassword();
  if (passwordCheckStatus) {
    splitName(userName);
    register_btn.disabled = true;
    users.push({
      name: {
        firstName: firstName,
        secondName: secondName,
        color: "#ff4646",
      },
      mail: mail.value,
      password: password.value,
      lockedIn: false,
    });
    await setItem("users", users);
    resetForm();
    registerSuccessfull.classList.remove("d-none");
    registerSuccessfull.innerHTML = "You Signed Up successfully";
    setInterval(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    document.getElementById("password_message").innerHTML =
      "Passwords do not match. Please check and try again!";
  }
}

function comparePassword() {
  if (
    document.getElementById("password").value ==
    document.getElementById("confirm_password").value
  ) {
    document.getElementById("password_message").style.color = "green";
    document.getElementById("password_message").innerHTML = "Password match!";
    passwordCheckStatus = true;
  } else {
    document.getElementById("password_message").style.color = "red";
    document.getElementById("password_message").innerHTML =
      "Password do not match!";
    passwordCheckStatus = false;
  }
}

function splitName(userName) {
  let splittedName = userName.value.split(" ");
  firstName = splittedName[0];
  secondName = splittedName[1];
}

function resetForm() {
  userName.value = "";
  mail.value = "";
  password.value = "";
  confirm_password.value = "";
  password_message.innerHTML = "";
  checkbox.checked = false;
  register_btn.disabled = false;
}
