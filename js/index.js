
let mail = document.getElementById("mail");
let password = document.getElementById("password");
let validation = false;

async function handleLogIn() {
  await loadUsers();
  await getContactsFromServer();
  checkExistingUser();
  setLogIn_status();
  setInterval(() => {
    window.location.href = "summary.html";
  }, 1000);
}

/**
 * 
 */
async function checkExistingUser() {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    // comparing of users vs. inputfields
    if (user.mail == mail.value && user.password == password.value) {
      currentUser = JSON.parse(JSON.stringify(user));
      await saveCurrentUserOnServer();
    } 
  }
}

/**
 * Loads the Contacts from Server in contacts_global.
 * Finds the Index of currentUser in contacts_global.
 * Sets all lockedIn of contacts in contacts_global on false.
 * If currentUser is available in contacts_global, 
 * lockedIn of the contact, which is equal to the currentUser, is set to true.
 */
async function setLogIn_status() {
  await getContactsFromServer();
  resetLogIn_status();
  await checkExistingContact();
}

function resetLogIn_status() {
  for (let i = 0; i < contacts_global.length; i++) {
    contacts_global[i].lockedIn = false;
  }
}

async function checkExistingContact() {
  for (let i = 0; i < contacts_global.length; i++) {
    let contact = contacts_global[i];
    if (contact.name.firstName == currentUser.name.firstName && contact.name.secondName == currentUser.name.secondName && contact.mail == currentUser.mail) {
        contact.lockedIn = true;
        await setContactsToServer();
        await getContactsFromServer();
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






