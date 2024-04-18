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
    sortTasksContacts();
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

/**
 * Set the content of tasks.json file to Server.
 */
async function resetStorageOfServer_tasks() {
  await setItem('tasks', [
    {
        "title": "Kochwelt Page & Recipe Recommender",
        "description": "Build start page with recipe recommendation.",
        "category": "User Story",
        "contacts": [
            {
                "firstName": "Anton",
                "secondName": "Mayer",
                "color": "orange"
            },
            {
                "firstName": "Emmanuel",
                "secondName": "Mauer",
                "color": "turquoise"
            },
            {
                "firstName": "Marcel",
                "secondName": "Bauer",
                "color": "darkslateblue"
            }
        ],
        "dueDate": "11/07/24",
        "priority": "Medium",
        "subtasks": [
            {
                "name": "Implement Recipe Recommendation",
                "done": true
            },
            {
                "name": "Start Page Layout",
                "done": false
            }
        ],
        "status": "inProgress"
    },
    {
        "title": "HTML Base Template Creation",
        "description": "Create reusable HTML base templates...",
        "category": "Technical Task",
        "contacts": [
            {
                "firstName": "David",
                "secondName": "Eisenberg",
                "color": "violet"
            },
            {
                "firstName": "Benedict",
                "secondName": "Ziegler",
                "color": "mediumslateblue"
            },
            {
                "firstName": "Anja",
                "secondName": "Schulz",
                "color": "blueviolet"
            }
        ],
        "dueDate": "10/05/26",
        "priority": "Low",
        "subtasks": [],
        "status": "awaitFeedback"
    },
    {
        "title": "Daily Kochwelt Recipe",
        "description": "Implement daily recipe and portion calculator....",
        "category": "User Story",
        "contacts": [
            {
                "firstName": "Eva",
                "secondName": "Fischer",
                "color": "yellow"
            },
            {
                "firstName": "Anja",
                "secondName": "Schulz",
                "color": "blueviolet"
            },
            {
                "firstName": "Tatjana",
                "secondName": "Wolf",
                "color": "red"
            }
        ],
        "dueDate": "30/12/24",
        "priority": "Medium",
        "subtasks": [],
        "status": "awaitFeedback"
    },
    {
        "title": "CSS Architecture Planning",
        "description": "Define CSS naming conventions and structure",
        "category": "Technical Task",
        "contacts": [
            {
                "firstName": "Sofia",
                "secondName": "Müller",
                "color": "deepskyblue"
            },
            {
                "firstName": "Benedict",
                "secondName": "Ziegler",
                "color": "mediumslateblue"
            }
        ],
        "dueDate": "01/07/25",
        "priority": "Urgent",
        "subtasks": [
            {
                "name": "Establish CSS Methodology",
                "done": true
            },
            {
                "name": "Setup Base Styles",
                "done": true
            }
        ],
        "status": "done"
    }
])
initBoard();
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

async function resetStorageOfServer_contacts() {
  setItem('contacts', [
    {
      "name": {
        "firstName": "Anton",
        "secondName": "Mayer",
        "color": "#FF7A00"
      },
      "mail": "anton@gmail.com",
      "phone": "+49 1111 111 11 1",
      "password": "",
      "lockedIn": false
    },
    {
      "name": {
        "firstName": "Anja",
        "secondName": "Schulz",
        "color": "#9327FF"
      },
      "mail": "schulz@hotmail.de",
      "phone": "+49 1111 111 11 1",
      "password": "",
      "lockedIn": false,
    },
    {
      "name": {
        "firstName": "Benedikt",
        "secondName": "Ziegler",
        "color": "#6E52FF"
      },
      "mail": "benedikt@gmail.com",
      "phone": "+49 1111 111 11 1",
      "password": "",
      "lockedIn": false
    },
    {
      "name": {
        "firstName": "David",
        "secondName": "Eisenberg",
        
        "color": "#FC71FF"
      },
      "mail": "davidberg@gmail.com",
      "phone": "+49 1111 111 11 1",
      "password": "",
      "lockedIn": false
    },
    {
      "name": {
        "firstName": "Eva",
        "secondName": "Fischer",
        "color": "#FFBB2B"
      },
      "mail": "eva@gmail.com",
      "phone": "+49 1111 111 11 1",
      "password": "",
      "lockedIn": false
    },
    {
      "name": {
        "firstName": "Emmanuel",
        "secondName": "Mauer",
        "color": "#1FD7C1"
      },
      "mail": "emmanuelma@gmail.com",
      "phone": "+49 1111 111 11 1",
      "password": "",
      "lockedIn": false
    },
    {
      "name": {
        "firstName": "Marcel",
        "secondName": "Bauer",
        "color": "#462F8A"
      },
      "mail": "bauer@gmail.com",
      "phone": "+49 1111 111 11 1",
      "password": "",
      "lockedIn": false
    }
  ]
  );
  getContactsFromServer();
}


// ***** User ***** //


/**
 * Contains the user which is loged in.
 * 
 * @type {JSON}
 */
let currentUser = [];

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
  } catch (e) {
    console.warn("Could not load currentUser!");
    console.warn(`${e}`);
  }
}

async function setlockedInStatus() {
  
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
async function setTasksToServer() {
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