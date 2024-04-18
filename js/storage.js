const STORAGE_TOKEN = "OV30V75C6XC2NMC469UVAT7NWW775KEIDF6SU6PL";
const STORAGE_URL = `https://remote-storage.developerakademie.org/item`;


// ***** global ***** //


/**
 * Sets key with value on Server with own token.
 * 
 * @param {String} key 
 * @param {String} value 
 * @returns 
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * Get Value of Key from Server
 * 
 * @param {String} key - Name of Storage that is saved on server
 * @returns {JSON} 
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
}


// ***** tasks ***** //


/**
 * Main task storage for the program.
 * 
 * @type {JSON}
 */
let tasks = [];

/**
 * Push new Content to Server
 */
async function setTasksToServer() {
  await setItem('tasks', tasks);   
}

/**
 * Load the tasks JSON Array from Server in tasks[]
 */
async function getTasksFromServer() {
  try {
    let ServerData;
    ServerData = await getItem("tasks");
    let newData = JSON.parse(ServerData.data.value);
    tasks = newData;
    await sortTasksContacts();
    if (currentUser !== "Guest") {
       syncLockedInStatus();
    }
  } catch (e) {
    console.warn("Could not load tasks!");
  }
}

function  sortTasksContacts() {
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].contacts.sort((a, b) => {
      let firstNameA = a.firstName.toLowerCase();
      let firstNameB = b.firstName.toLowerCase();
      
      if (firstNameA < firstNameB) {
        return -1;
      }
      if (firstNameA > firstNameB) {
        return 1;
      }
      return 0;
    });
  }
}


/**
 * 
 */
async function setAndGetToServer() {
  await setTasksToServer();
  await getTasksFromServer();
}


// ***** contacts ***** //


/**
 * Main contact storage for the program.
 * 
 * @type {JSON}
 */
let contacts_global = [];

async function getContactsFromServer() {
  try {
    let ServerData;
    ServerData = await getItem("contacts");
    let newData = JSON.parse(ServerData.data.value);
    contacts_global = newData;
    sortContacts();
  } catch (e) {
    console.warn("Could not load contacts!");
  }
}

function sortContacts() {
  contacts_global.sort((a, b) => {
    const firstNameA = a.name.firstName.toLowerCase();
    const firstNameB = b.name.firstName.toLowerCase();
  
    if (firstNameA < firstNameB) {
      return -1;
    }
    if (firstNameA > firstNameB) {
      return 1;
    }
    return 0;
  });
}

async function setContactsToServer(){
  await setItem('contacts', contacts_global);
}


// ***** User ***** //


/**
 * Contains the user which is loged in.
 * 
 * @type {JSON}
 */
let currentUser = [];

let currentUserId = '';

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

async function saveCurrentUserOnServer() {
  await setItem('currentUser', currentUser);
}

async function getCurrentUserFromServer() {
  try {
    let ServerData;
    ServerData = await getItem('currentUser');
    let newData = JSON.parse(ServerData.data.value)
    currentUser = newData;
    await setCurrentUserId();
  } catch (e) {
    console.warn("Could not load currentUser!");
    console.warn(`${e}`);
  }
}

async function saveCurrentUserIdOnServer() {
  await setItem('currentUserId', currentUserId);
}

async function getCurrentUserIdFromServer() {
  try {
    let ServerData;
    ServerData = await getItem('currentUserId');
    let newData = JSON.parse(ServerData.data.value)
    currentUserId = newData;
  } catch (e) {
    console.warn("Could not load currentUserId!");
    console.warn(`${e}`);
  }
}

async function setCurrentUserId() {
  currentUserId = findIndexOfCurrentUserInContacts_Global();
  await saveCurrentUserIdOnServer();
  await getCurrentUserIdFromServer();
}

function findIndexOfCurrentUserInContacts_Global() {
  let index = contacts_global.findIndex(contact =>
  contact.name.firstName === currentUser.name.firstName && contact.name.secondName === currentUser.name.secondName
  );
  return index;
}

function setYou_contacts() {
  let index = findIndexOfCurrentUserInContacts_Global();
  let you = document.getElementById(`you${index}`)
  you.innerHTML = `(You)`;
}


// ***** newTAsk status ***** //


let newTask_status = false;

/**
 * Load the tasks JSON Array from Server in tasks[]
 */
async function getNewTask_statusFromServer() {
  try {
    // Hier warten wir auf das Ergebnis der asynchronen getItem-Funktion
    const ServerData = await getItem("newTask_status");
    // Wir extrahieren den Wert aus dem Ergebnis und setzen newTask_status
    newTask_status = JSON.parse(ServerData.data.value);
  } catch (e) {
    console.warn("Could not load new task status!");
  }
}

async function setNewTask_status_false() {
  await setItem('newTask_status', 'false');
}


// ***** accounts ***** //


/**
 * Main task storage for the program.
 * 
 * @type {JSON}
 */
let accounts = [];

/**
 * Push new Content to Server
 */
async function setUserToServer() {
  await setItem('users', accounts);   
}

/**
 * Load the tasks JSON Array from Server in tasks[]
 */
async function getAccountsFromServer() {
  try {
    let ServerData;
    ServerData = await getItem("users");
    let newData = JSON.parse(ServerData.data.value);
    accounts = newData;
  } catch (e) {
    console.warn("Could not load accounts!");
  }
}

/**
 * Deletes acoount bei set the Index of account from users
 * 
 * @param {Number} account_index - Index of account to delete from Server
 */
async function deleteAccount(account_index) {
  await getAccountsFromServer();
  accounts.splice(account_index,1);
  await setItem('users', accounts);
  await getAccountsFromServer();
}

async function creatNewUserIntern(firstName, secondName, mail, password) {
  await getAccountsFromServer();
  accounts.push({
    name: {
      firstName: firstName,
      secondName: secondName,
      color: "#ff4646",
    },
    mail: mail,
    password: password,
    lockedIn: false,
  });
  await setItem('users', accounts);
  await getAccountsFromServer();
}
