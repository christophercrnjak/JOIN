

// *** Add Task Main *** //


/**
 * Copy of contacts_global (server based contact list)
 * 
 * @type {JSON} - Example of one Object: 
 * 0: 
 *   lockedIn: false
 *   mail: "anton@gmail.com"
 *   name: {firstName: 'Anton', secondName: 'Mayer', color: '#FF7A00'}
 *   passwor: ""
 */
let contacts_addTask = [];

/**
 * Array with selectable categories
 * 
 * @type {Array}
 */
let categorys = ["Technical Task", "User Stroy"];

/**
 * Contains seleced Category through the function pushCategoryInTo(element)
 * 
 * @type {String} - Example: 'Technical Task'
 */
let pushCategory = '';

/**
 * Contains selected priority like "medium" through function setPriorityStyles(bgColor, textColor, imgSrc, priority)
 * 
 * @type {String} Example: 'medium'
 */
let prio = ['medium']; 

let dropdown_status_category = false;


// *** Global *** //


/**
 * Stops closing elements.
 * 
 * @param {Event} event 
 */
function doNotClose(event) {
  event.stopPropagation();
}


// *** Initialize *** //


/**
 * 
 */
async function addTaskInit() {
  await includeHTML();
  await setUserInitialsAtHeader();
  await loadContactsServer()
  await getTasksFromServer();
  addSelectstatusToContacts();
  renderDropList();
  renderCategoryDropDown();
  changePriority('medium');
}

async function loadContactsServer() {
  await getContactsFromServer();
  contacts_addTask = JSON.parse(JSON.stringify(contacts_global));
}

function addSelectstatusToContacts() {
  for (let i = 0; i < contacts_addTask.length; i++) {
    let contact = contacts_addTask[i];
    contact.select_status = false;
  }
}


function setToday() {
  let due_date_input = document.getElementById('AddTaskDate');
  let today = new Date;
  let day = today.getDate();
  if (day < 10) {
    day = `0` + `${day}`;
  }
  let month = today.getMonth();
  if (month < 10) {
    month = `0` + `${month}`;
  }
  let year = today.getFullYear();
  due_date_input.value = `${year}` + `-` + `${month}` + `-` + `${day}`;
}

// *** Priority *** //


/**
 * Resets styles of priority buttons to start style.
 * Resets the storage of selected priority in prio array.
 * Sets the colored version of given button.
 * 
 * @param {String} priority - name of priority like 'medium'
 */
function changePriority(priority) {
  resetStyles();
  removePreviousPriority();
  if (priority === "urgend") {
    setPriorityStyles(
      "#FF3D00",
      "#ffff",
      "assets/img/Prio_urgent_white.svg",
      "urgend"
    );
  } else if (priority === "medium") {
    setPriorityStyles(
      "#FFA800",
      "#ffff",
      "assets/img/Prio_medium_white.svg",
      "medium"
    );
  } else if (priority === "low") {
    setPriorityStyles(
      "#7AE229", 
      "#ffff", 
      "assets/img/Prio_low_white.svg", 
      "low");
  }
}

/**
 * Resets the style of each priority-button to white background, black font-color and a colored image of priority
 */
function resetStyles() {
  let btnUrgend = document.getElementById("btnUrgend");
  let btnMedium = document.getElementById("btnMedium");
  let btnLow = document.getElementById("btnLow");

  let imgUrgend = document.getElementById("btnUrgendImg");
  let imgMedium = document.getElementById("btnMediumImg");
  let imgLow = document.getElementById("btnLowImg");

  let buttons = [btnUrgend, btnMedium, btnLow];
  let images = [imgUrgend, imgMedium, imgLow];

  buttons.forEach(function (button) {
    button.style.backgroundColor = "#ffff";
    button.style.color = "black";
    button.style.fontWeight = "400";
  });

  images.forEach(function (image) {
    if (image.id === "btnUrgendImg") {
      image.src = "assets/img/Prio_urgent_color_origin.svg";
    } else if (image.id === "btnMediumImg") {
      image.src = "assets/img/Prio_medium_color_origin.svg";
    } else if (image.id === "btnLowImg") {
      image.src = "assets/img/Prio_low_color_origin.svg";
    }
  });
}

/**
 * Delets the last Element of array prio.
 */
function removePreviousPriority() {
  if (prio.length > 0) {
    prio.pop();
  }
}

/**
 * Changes the background-color, the font-color and imgae source depending on the given values.
 * Pushes the priority to prio array.
 * 
 * @param {String} bgColor - background-color like "#FFA800"
 * @param {String} textColor - text-color like "#ffff"
 * @param {String} imgSrc - relaited source to image like "assets/img/prio_medium.svg"
 * @param {String} priority - priority-name like "medium"
 */
function setPriorityStyles(bgColor, textColor, imgSrc, priority) {
  let button = document.getElementById(
    "btn" + priority.charAt(0).toUpperCase() + priority.slice(1)
  );
  let image = document.getElementById(
    "btn" + priority.charAt(0).toUpperCase() + priority.slice(1) + "Img"
  );

  button.style.backgroundColor = bgColor;
  button.style.color = textColor;
  button.style.fontWeight = "700";
  image.src = imgSrc;

  prio.push(priority);
}


// *** Category *** //


function openCloseCategoryDropDown() {
  if (dropdown_status_category == false) {
    openCategoryDropdown();
  } else if (dropdown_status_category == true) {
    closeCategoryDropdown();
  }
}

function openCategoryDropdown() {
  let dropdownCategory = document.getElementById("dropdownCategory");
  let btn_and_dropdown_section = document.getElementById('btn_and_dropdown_section');
  let arrow_icon = document.getElementById("arrow_category");
  dropdown_status_category = true;
  dropdownCategory.classList.add("show");
  btn_and_dropdown_section.classList.add('border_button');
  arrow_icon.classList.add("rotated");
}

function closeCategoryDropdown() {
  let dropdownCategory = document.getElementById("dropdownCategory");
  let btn_and_dropdown_section = document.getElementById('btn_and_dropdown_section');
  let arrow_icon = document.getElementById("arrow_category");
  dropdown_status_category = false;
  dropdownCategory.classList.remove("show");
  btn_and_dropdown_section.classList.remove('border_button');
  arrow_icon.classList.remove("rotated");
}

function renderCategoryDropDown() {
  let dropdownCategory = document.getElementById("dropdownCategory");
  dropdownCategory.innerHTML = "";
  for (let i = 0; i < categorys.length; i++) {
    let category = categorys[i];
    dropdownCategory.innerHTML += `
        <a class="dropdown_category" onclick="pushCategoryInTo('${category}')">${category}</a>
        `;
  }
}
function pushCategoryInTo(element) {
  let textfield = document.getElementById("categoryDropDownBtn_text");
  textfield.innerHTML = `${element}`;
  pushCategory = element;
  closeCategoryDropdown();
}

