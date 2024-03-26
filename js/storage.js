const STORAGE_TOKEN = "OV30V75C6XC2NMC469UVAT7NWW775KEIDF6SU6PL";
const STORAGE_URL = `https://remote-storage.developerakademie.org/item`;

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
    //.then((res) => res.data.value);
}

/**
 * Main task storage for the program.
 * 
 * @type {JSON}
 */
let tasks = [];

/**
 * Main contact storage for the program.
 * 
 * @type {JSON}
 */
let contacts_global = [];

/**
 * Load the tasks JSON Array from Server in tasks[]
 */
async function getTasksFromServer() {
    let ServerData;
    ServerData = await getItem("tasks");
    let newData = JSON.parse(ServerData.data.value);
    tasks = newData;
  }

  async function getContactsFromServer() {
    let ServerData;
    ServerData = await getItem("contacts");
    let newData = JSON.parse(ServerData.data.value);
    contacts_global = newData;
  }
  
  /**
   * Push new Content to Server
   */
async function setTasksToServer() {
     setItem('tasks', tasks);   
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
init();
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
      "password": "",
      "lockedIn": true
    },
    {
      "name": {
        "firstName": "Benedikt",
        "secondName": "Ziegler",
        "color": "#6E52FF"
      },
      "mail": "benedikt@gmail.com",
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
      "password": "",
      "lockedIn": false
    }
  ]
  );
  getContactsFromServer();
}