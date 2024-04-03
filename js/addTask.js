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
 * Contains the information of the selected contacts such as color, first name and last name
 * 
 * @type {JSON} - Example: 0: {color: '#9327FF', firstName: 'Anja', secondName: 'Schulz'}
 */
let selectedFromDropdown = [];

/**
 * Contains selected priority like "medium" through function setPriorityStyles(bgColor, textColor, imgSrc, priority)
 * 
 * @type {String} Example: 'medium'
 */
let prio = ['medium']; 

/**
 * Contains seleced Category through the function pushCategoryInTo(element)
 * 
 * @type {String} - Example: 'Technical Task'
 */
let pushCategory = [];


let subtasklists = [];

 async function addTaskInit() {
  await loadContactsServer()
  renderDropList();
  renderCategoryDropDown();
  includeHTML();
  changePriority('medium')
}

async function loadContactsServer() {
  await getContactsFromServer();
  contacts_addTask = JSON.parse(JSON.stringify(contacts_global));
}


// Assigned to 


async function renderDropList() {
  // render the drop down menu form the
  let dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";
  for (let i = 0; i < contacts_addTask.length; i++) {
    let contact = contacts_addTask[i];
    dropdown.innerHTML += dropdownHtml(contact, [i]);
  }
}

function dropdownHtml(contact, i) {
  return /*html */`
  <a class="dropdown_assign" id="contact${i}" onclick="selectFromDropdown('${contact["name"]["color"]}', '${contact["name"]["firstName"]}', '${contact["name"]["secondName"]}',${i})">
      <!-- contact -->
      <div class="display_center gap ">
        <div class="member_cicle_main">
          <div class="member_cicle" style='background-color:${contact["name"]["color"]};'>
            ${contact["name"]["firstName"].charAt(0)}
            ${contact["name"]["secondName"].charAt(0)}
          </div>
        </div>
        <div class="member_name">${contact["name"]["firstName"]} ${contact["name"]["secondName"]}</div>
      </div> 
      <!-- checkbox -->
      <div class="dropdown_img">
        <img id="selected_img${i}" src="assets/img/check_button_unchecked.svg">
      </div>
  </a>
  `;
}

/**
 * this function put the selected member from the drop down list assigned to 
 * in a array and div container
 * @param {*} color  - fill the color form JSON in the cricle.
 * @param {*} firstName - fill the first name into the cricle form the JSON.
 * @param {*} secondName 
 * @param {*} i 
 */
function selectFromDropdown(color, firstName, secondName, i) {
  let isSelected = selectedFromDropdown.some(item => item.color === color && item.firstName === firstName && item.secondName === secondName); // Wenn in selectedFromDropdown ein Objekt mit den übergebenen Variablen übereinstimmt, dann entspricht isSelected gleich den Kontakt
  let dropdownList = document.getElementById('dropdownList');
  if (isSelected) {
     // case selected contact is selected (change to unselected)
    removeFromSelectedItems(firstName,i);
    selectedFromDropdown.slice({ color, firstName, secondName });
    document.getElementById(`contact${i}`).classList.remove('selected');
    dropdownHtmlMemberCircle();
    document.getElementById(`selected_img${i}`).setAttribute('src', 'assets/img/check_button_unchecked.svg');
  } else {
    // case unselected contact is selected (change to selected)
    selectedFromDropdown.push({ color, firstName, secondName });
    dropdownList.innerHTML += dropdownHtmlMemberCircle( color,firstName,secondName,i );
    document.getElementById(`contact${i}`).classList.add('selected');
    document.getElementById(`selected_img${i}`).setAttribute('src', 'assets/img/check_button_checked_white.svg');
  }
}



function dropdownHtmlMemberCircle(color, firstName, secondName, i) {
  return `
    <div class="member_cicle_main">
      <div onclick="removeFromSelectedItems('${firstName}','${i}')" class="member_cicle" style="background-color:${color};">
        ${firstName.charAt(0)}
        ${secondName.charAt(0)}
      </div>
    </div>
  `;
}

/**
 * Iterates through the array selectedFromDropdown (storage of contacts selected for the task).
 * Removes the Contact from selectedFromDropdown array which is passed into the function.
 * 
 * @param {String} firstName - first Name of choosen contact in the dropdownlist
 * @param {Number} i - Index of choosen contact in contacts_addTask global array 
 */
function removeFromSelectedItems(firstName, i ) {
  for (let i = 0; i < selectedFromDropdown.length; i++) {
    if (selectedFromDropdown[i].firstName === firstName) {
      selectedFromDropdown.splice(i, 1);
      let dropdownList = document.getElementById("dropdownList");
      let elements = dropdownList.getElementsByClassName("member_cicle");
      for (let j = 0; j < elements.length; j++) {
        let textContent = elements[j].textContent;
        if (textContent.includes(firstName.charAt(0))) {
          dropdownList.removeChild(elements[j]);
        }
      }
    }
  }
  document.getElementById(i).classList.remove('selected');
  selectFromDropdown();
}

/**
 * The function is for the filtering of the dropdown menu 
 */
function filterFunction() {
  // Filter on the drop Down menu
  let input, filter, div, options, i, txtValue;
  input = document.getElementById("dropdownInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropdown");
  options = div.getElementsByClassName("dropdown_assign");
  for (i = 0; i < options.length; i++) {
    txtValue = options[i].textContent || options[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = "";
    } else {
      options[i].style.display = "none";
    }
  }
}

function toggledropbtn() {
  let dropdownContent = document.getElementById('dropdown');

  if (!dropdownContent.classList.contains("d-none")) {
    dropdownContent.classList.toggle('show_task'); //dropdown-list appear
    document.getElementById("dropdownInput").classList.toggle("d-none");// input appear
    document.getElementById("dropbtn").classList.toggle("d-none"); // btn with text disappears
    document.getElementById("arrow").classList.toggle("rotated"); // triangle rotate to top
    document.getElementById('assigned_to_section').classList.toggle('background_and_radius_fitting'); // add white background
  }
}
document.addEventListener('click', function(event) {
  let dropdownContent = document.getElementById('dropdown');
  if (!event.target.closest('.dropdown') && !dropdownContent.contains(event.target)) {
    dropdownContent.classList.remove('show_task');
  }
});


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

function categoryDropDownBtn(event) {
  let dropdownCategory = document.getElementById("dropdownCategory");
  dropdownCategory.classList.toggle("show");
  document.getElementById('btn_and_dropdown_section').classList.toggle('border_button')
}

document.addEventListener('click', function(event) {
  let dropdownCategory = document.getElementById("dropdownCategory");
  if (!event.target.matches('.dropdown_category') && !dropdownCategory.contains(event.target)) {
    dropdownCategory.classList.remove('show');
  }
});

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
  let category = document.getElementById("categoryDropDownBtn");
  category.innerHTML = element;
  pushCategory.push(element);
  if (pushCategory.length > 1) {
    pushCategory.shift();
  }
}

function ChangeToSubtasks() {
  let subtaskIcons_check_delete = document.getElementById('delet_and_check_section');
  let subtask_plus = document.getElementById('subtaskIcons')
  if (document.getElementById('subtasksInput').value.length > 0) {
    subtask_plus.classList.add('d-none');
    subtaskIcons_check_delete.classList.remove('d-none');
  } else {
    subtask_plus.classList.remove('d-none');
    subtaskIcons_check_delete.classList.add('d-none');
  }
}

function pushToSubtasks() { 
  let subtasksInputElement = document.getElementById('subtasksInput');
  let subtasksInputValue = subtasksInputElement.value;
  if(subtasksInputValue === ''){
    subtasksInputElement.value = '';  
    ChangeToSubtasks()
  } else {
    subtasklists.push(subtasksInputValue);
    subtasksInputElement.value = ''; 
    ChangeToSubtasks();
    rendersubtasklist();
  }
}

function deleteSubTasks() {
  let subtasksInput = document.getElementById('subtasksInput');
  subtasksInput.value = '';
  ChangeToSubtasks();
}

function rendersubtasklist() {
  let rendersubtasklist = document.getElementById("subtasklist");
  rendersubtasklist.innerHTML = "";
  for (let i = 0; i < subtasklists.length; i++) {
    let subtaskHTML = subtasklists[i];
    rendersubtasklist.innerHTML += subtasklistHTML(subtaskHTML, i);
  }
  subtasklistHTML();
}

function removeSubtask(i) {
  let subtaskcheck = document.getElementById('subtaskcheck');
  if(subtasklists === 0){
    subtaskcheck.classList.add('d-none');
    rendersubtasklist();
  }
  subtasklists.splice(i, 1);
  rendersubtasklist();
}

function subtasklistHTML(subtaskHTML, i) {
  return `
  <div id="subtasklist_element${i}" class="subtasklist_element" ondblclick="editNewSubtask(${i})">
  <p><span class="point">• </span> ${subtaskHTML}</p>
  <div class="pencil_and_trash_new_subtask">
    <a class="edit_pencil" onclick="editNewSubtask(${i})">
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
      </svg>
    </a>

    <div class="line"></div>

    <a class="trash" onclick="removeSubtask(${i})">
      <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
      </svg>
    </a>
    
  </div>
  </div>`;
}

function editNewSubtask(subtaskId) {
  let subtask = subtasklists[subtaskId];
  let subtask_element = document.getElementById(`subtasklist_element${subtaskId}`);
  subtask_element.innerHTML = subtaskEditHTML(subtask, subtaskId);
  subtask_element.style.paddingLeft = '0px';
  subtask_element.classList.add("no-hover");
}

function subtaskEditHTML(subtask_value, subtaskId) {
  return `
    <div class="new_subtask_edit_main">
      <input id="new_subtask_edit_text${subtaskId}" class="new_subtask_edit_text" value="${subtask_value}" >
      <div class="subtask_edit_main">
        <a class="trash" onclick="removeSubtask(${subtaskId})">
          <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
          </svg>
        </a>

        <div class="line"></div>

        <a class="confirm_edit_new_subtask" onclick="takeoverNewSubtaskValue(${subtaskId})">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_75880_8847" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.000976562" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_75880_8847)">
              <path d="M9.55118 15.15L18.0262 6.675C18.2262 6.475 18.4637 6.375 18.7387 6.375C19.0137 6.375 19.2512 6.475 19.4512 6.675C19.6512 6.875 19.7512 7.1125 19.7512 7.3875C19.7512 7.6625 19.6512 7.9 19.4512 8.1L10.2512 17.3C10.0512 17.5 9.81785 17.6 9.55118 17.6C9.28452 17.6 9.05118 17.5 8.85118 17.3L4.55118 13C4.35118 12.8 4.25535 12.5625 4.26368 12.2875C4.27202 12.0125 4.37618 11.775 4.57618 11.575C4.77618 11.375 5.01368 11.275 5.28868 11.275C5.56368 11.275 5.80118 11.375 6.00118 11.575L9.55118 15.15Z" fill="#2A3647"/>
            </g>
          </svg>
        </a>
      </div>
    </div>
  `;
}

function takeoverNewSubtaskValue(subtaskId) {
  let input = document.getElementById(`new_subtask_edit_text${subtaskId}`);
  let subtask_element = document.getElementById(`subtasklist_element${subtaskId}`);
  subtasklists[subtaskId] = input.value;
  subtask_element.style.paddingLeft = '10px';
  subtask_element.classList.remove("no-hover");
  rendersubtasklist();
}

 async function pushToBoard() {
  let title = document.getElementById("titleAddtask");
  let description = document.getElementById("description");
  let date = document.getElementById("AddTaskDate");

  let task = {
    'title': title.value,
    'description': description.value,
    'contacts': selectedFromDropdown,
    'category': pushCategory,
    'dueDate': date.value,
    'priority': prio,
    'subtasks': subtasklists,
    'status': 'inProgress',
    'createdDate': new Date().getTime(),
  };

  // await setItem('tasks', task);

  pushCategory = [];
  selectedFromDropdown.value = '';
  prio.value = '';
}

function removeAllInputes() {
  // Remove the Add Task inputs
  selectedFromDropdown = [];
  prio = [];
  pushCategory = [];
  subtasklists = [];
  document.getElementById('titleAddtask').value = '';
  document.getElementById('AddTaskDate').value = '';
  document.getElementById("categoryDropDownBtn").innerHTML = 'Select task category';
  changePriority('medium');
}

function validateInputs() {
  validation('titleAddtask', 'validation_text_title');
  validation('AddTaskDate', 'validation_text_due_date');
  validateCategory();
  if (validation('titleAddtask', 'validation_text_title') == true && validation('AddTaskDate', 'validation_text_due_date') == true && validateCategory() == true) {
    createNewTask();
  }
}

function validation(inputId, errortextId) {
  let input = document.getElementById(inputId);
  let errortext = document.getElementById(errortextId)
  if (input.value == '') {
    window.location.hash=inputId;
    input.classList.add('red-border');
    errortext.classList.remove('d-none');
    return false;
  } else {
    input.classList.remove('red-border');
    errortext.classList.add('d-none');
    return true;
  }
}


function validateCategory() {
  let container = document.getElementById('categoryDropDownBtn');
  let errortext = document.getElementById('validation_text_category');
  if (pushCategory.length > 0) {
    container.classList.remove('red-border');
    errortext.classList.add('d-none');
    if (pushCategory.length > 1) {
      pushCategory.shift();
    }
    return true;
  } else {
    container.classList.add('red-border');
    errortext.classList.remove('d-none');
    return false;
  }
}

function createNewTask() {
  console.log('Task ist erstellt!');
  removeAllInputes();
}