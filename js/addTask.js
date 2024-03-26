
let contacts_addTask = [];

let categorys = ["Technical Task", "User Stroy"];

let selectedFromDropdown = [];
let prio = [];
let pushCategory = [];
let subtasklists = [];

 async function addTaskInit() {
  await loadContactsServer()
  renderDropList();
  renderCategoryDropDown();
  includeHTML();
}

async function loadContactsServer() {
  await getContactsFromServer();
  contacts_addTask = JSON.parse(JSON.stringify(contacts_global));
}

// Selected contacts assign

async function renderDropList() {
  // render the drop down menu form the
  let dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";
  for (let i = 0; i < contacts_addTask.length; i++) {
    let contact = contacts_addTask[i];
    dropdown.innerHTML += dropdownHtml(contact, [i]);
  }
}

function dropdownHtml(dropdownList, i) {
  return /*html */`
  <a class="dropdown_assign" id="${i}" onclick="selectFromDropdown('${dropdownList["name"]["color"]}', '${dropdownList["name"]["firstName"]}', '${dropdownList["name"]["secondName"]}',${i})">
      <!-- contact -->
      <div class="display_center gap">
            <div class="member_cicle" style='background-color:${dropdownList["name"]["color"]};'>
              ${dropdownList["name"]["firstName"].charAt(0)}
              ${dropdownList["name"]["secondName"].charAt(0)}
            </div>
          ${dropdownList["name"]["firstName"]} ${dropdownList["name"]["secondName"]}
      </div>
      <!-- checkbox -->
      <div id="selected_img" class="dropdown_img"></div>
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
  let isSelected = selectedFromDropdown.some(item => item.color === color && item.firstName === firstName && item.secondName === secondName);
  if (isSelected) {
    removeFromSelectedItems(firstName,i);
    selectedFromDropdown.slice({ color, firstName, secondName });
    document.getElementById(i).classList.remove('selected');
    document.getElementById('selected_img').classList.remove('selected_img');
    dropdownHtmlMemberCircle();
  } else {
    let dropdownList = document.getElementById('dropdownList');
    selectedFromDropdown.push({ color, firstName, secondName });
    dropdownList.innerHTML += dropdownHtmlMemberCircle( color,firstName,secondName,i );
    document.getElementById(i).classList.add('selected');
    document.getElementById('selected_img').classList.add('selected_img');
  }
}

function dropdownHtmlMemberCircle(color, firstName, secondName, i) {
  return `
    <div onclick="removeFromSelectedItems('${firstName}','${i}')" class="member_cicle" style="background-color:${color};">
      ${firstName.charAt(0)}
      ${secondName.charAt(0)}
    </div>
  `;
}

/**
 *  remove the Icon and index form the array selectedFromDropdown  
 * @param {*} firstName 
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
    dropdownContent.classList.toggle('show_task');
    document.getElementById("dropdownInput").classList.toggle("d-none");
    document.getElementById("dropbtn").classList.toggle("d-none");
    document.getElementById("arrow").classList.toggle("rotated");
  }
}
document.addEventListener('click', function(event) {
  let dropdownContent = document.getElementById('dropdown');
  if (!event.target.closest('.dropdown') && !dropdownContent.contains(event.target)) {
    dropdownContent.classList.remove('show_task');
  }
});


// *** Priority *** //

function changePriority(priority) {
  resetStyles();
  removePreviousPriority();
  if (priority === "urgend") {
    setPriorityStyles(
      "#FF3D00",
      "#ffff",
      "/assets/img/prio_ungrent.svg",
      "urgend"
    );
  } else if (priority === "medium") {
    setPriorityStyles(
      "#FFA800",
      "#ffff",
      "assets/img/prio_medium.svg",
      "medium"
    );
  } else if (priority === "low") {
    setPriorityStyles("#7AE229", "#ffff", "assets/img/prio_low.svg", "low");
  }
}

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
  });

  images.forEach(function (image) {
    if (image.id === "btnUrgendImg") {
      image.src = "assets/img/Priority_symbols_Urgent.png";
    } else if (image.id === "btnMediumImg") {
      image.src = "assets/img/Priority_symbols_Medium.png";
    } else if (image.id === "btnLowImg") {
      image.src = "assets/img/Priority_symbols_Low.png";
    }
  });
}

function removePreviousPriority() {
  if (prio.length > 0) {
    prio.pop();
  }
}

function setPriorityStyles(bgColor, textColor, imgSrc, priority) {
  let button = document.getElementById(
    "btn" + priority.charAt(0).toUpperCase() + priority.slice(1)
  );
  let image = document.getElementById(
    "btn" + priority.charAt(0).toUpperCase() + priority.slice(1) + "Img"
  );

  button.style.backgroundColor = bgColor;
  button.style.color = textColor;
  image.src = imgSrc;

  prio.push(priority);
}


// *** Category *** //

function categoryDropDownBtn(event) {
  let dropdownCategory = document.getElementById("dropdownCategory");
  dropdownCategory.classList.toggle("show");
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
  let subtaskcheck = document.getElementById('subtaskIconsCheck');
  let subtaskIcons = document.getElementById('subtaskIcons');
  let subtaskIconsDelete = document.getElementById('subtaskIconsDelete');
  let subtaskI = document.getElementById('subtaskI');

  subtaskIcons.classList.add('d-none');
  subtaskI.classList.remove('d-none');
  subtaskcheck.classList.remove('d-none');
  subtaskIconsDelete.classList.remove('d-none');
}
function pushToSubtasks() { 
  let subtasksInputElement = document.getElementById('subtasksInput');
  let subtasksInputValue = subtasksInputElement.value;
  if(subtasksInputValue === ''){
    subtasksInputElement.value = '';  
    checkAndHideElements();
    return; 
  } 
  subtasklists.push(subtasksInputValue);
  subtasksInputElement.value = '';  
  rendersubtasklist();
  checkAndHideElements();
}


function deleteSubTasks() {
  let subtasksInput = document.getElementById('subtasksInput');
  subtasksInput.value = '';
  checkAndHideElements();
}

function checkAndHideElements() {
  let subtasksInput = document.getElementById('subtasksInput');
  if (subtasksInput.value.length === 0) {
    let subtaskIcons = document.getElementById('subtaskIcons');
    let subtaskIconsDelete = document.getElementById('subtaskIconsDelete');
    let subtaskcheck = document.getElementById('subtaskIconsCheck');
    let subtaskI = document.getElementById('subtaskI');
    subtaskI.classList.add('d-none');
    subtaskIcons.classList.remove('d-none');
    subtaskcheck.classList.add('d-none');
    subtaskIconsDelete.classList.add('d-none');
  }
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
  <div class="subtasklist_element">
    <p>${subtaskHTML}</p>
  <div>
    <img onclick="removeSubtask(${i})" class="" src="/assets/img/delete_dark.svg">
  </div>
  </div>`;
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

  await setItem('tasks', task);

  pushCategory.value = '';
  selectedFromDropdown.value = '';
  prio.value = '';
}

function removeAllInputes() {
  // Remove the Add Task inputs
  selectedFromDropdown = [];
  prio = [];
  pushCategory = [];
  subtasklists = [];
}
