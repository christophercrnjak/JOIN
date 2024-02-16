let users = [];
let passwordCheckStatus;

async function register() {
  comparePassword();
  if (passwordCheckStatus) {
    let register_btn = document.getElementById("register_btn");
    let name = document.getElementById("name");
    register_btn.disabled = true;
    users.push({
      name: name.value,
      mail: mail.value,
      password: password.value,
    });
    resetForm();
  } else {
    document.getElementById("password_message").innerHTML =
      "Passwords do not match. Please check and try again!";
  }
}

function resetForm() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirm_password = document.getElementById("confirm_password");
  let checkbox = document.getElementById("checkbox");
  let register_btn = document.getElementById("register_btn");
  let password_message = document.getElementById("password_message");
  name.value = "";
  email.value = "";
  password.value = "";
  confirm_password.value = "";
  password_message.innerHTML = "";
  checkbox.checked = false;
  register_btn.disabled = false;
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

function splitName() {
  let name = document.getElementById("name");
  let splittedName = name.value.split(" ");
  let firstName = splittedName[0];
}
