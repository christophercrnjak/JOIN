const STORAGE_TOKEN = "OV30V75C6XC2NMC469UVAT7NWW775KEIDF6SU6PL";
const STORAGE_URL = `https://remote-storage.developerakademie.org/item`;

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
    .then((res) => res.data.value);
}

/**
 * board_main.js fetch the tasks.json file value in tasks[].
 * The Board functions uses then tasks[] as a storage.
 * Later tasks[] has to post in server!
 * 
 * @type {JSON}
 */
let tasks = [];