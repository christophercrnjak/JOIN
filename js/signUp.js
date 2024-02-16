let users = [];
let passwordCheckStatus;
let checkbox = document.getElementById("checkbox");
let password_message = document.getElementById("password_message");
let confirm_password = document.getElementById("confirm_password");
let firstName;
let secondName;
let register_btn = document.getElementById("register_btn");
let userName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");

async function register() {
  comparePassword();
  if (passwordCheckStatus) {
    splitName(userName);
    register_btn.disabled = true;
    users.push({
      name: {
        firstName: firstName,
        secondName: secondName,
      },
      mail: email.value,
      password: password.value,
    });
    resetForm();
  } else {
    document.getElementById("password_message").innerHTML =
      "Passwords do not match. Please check and try again!";
  }
}

function resetForm() {
  userName.value = "";
  email.value = "";
  password.value = "";
  confirm_password.value = "";
  password_message.innerHTML = "";
  checkbox.checked = false;
  register_btn.disabled = false;
}

function splitName(userName) {
  let splittedName = userName.value.split(" ");
  firstName = splittedName[0];
  secondName = splittedName[1];
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
