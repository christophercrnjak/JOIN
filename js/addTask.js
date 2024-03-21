let contacts = [];
let categorys = ["Technical Task", "User Stroy"];

let selectedFromDropdown = [];
let prio = [];
let pushCategory = [];
let subtasklists = [];

 async function addTaskInit() {
  renderContainer();
  renderDropList();
  renderCategoryDropDown();
  includeHTML();
}

// Selected contacts assign

async function renderDropList() {
  // render the drop down menu form the
  let response = await fetch("assets/json/contacts.json");
  let responseAsJson = await response.json();
  let dropdown = document.getElementById("dropdown");

  dropdown.innerHTML = "";
  for (let i = 0; i < responseAsJson.length; i++) {
    let e = responseAsJson[i];
    dropdown.innerHTML += dropdownHtml(e, [i]);
  }
}

function dropdownHtml(dropdownList, i) {
  return `
  <a class="dropdown_assign" id="${i}" onclick="selectFromDropdown('${
    dropdownList["name"]["color"]
  }', '${dropdownList["name"]["firstName"]}', '${
    dropdownList["name"]["secondName"]
  }',${i})">
    <div class="display_center gap">
          <div class="member_cicle" style='background-color:${
            dropdownList["name"]["color"]
          };'>
            ${dropdownList["name"]["firstName"].charAt(0)}
            ${dropdownList["name"]["secondName"].charAt(0)}
          </div>
        ${dropdownList["name"]["firstName"]} ${
    dropdownList["name"]["secondName"]
  }
    </div>
    <div id="selected_img" class="dropdown_img"></div>
  </a>
  `;
}



/**
 * this function put the selected member from the drop down list assigned to 
 * in a array and div container
 * @param {*} color 
 * @param {*} firstName 
 * @param {*} secondName 
 * @param {*} i 
 */
function selectFromDropdown(color, firstName, secondName, i) {
  let isSelected = selectedFromDropdown.some(item => item.color === color && item.firstName === firstName && item.secondName === secondName);
  if (!isSelected) {
    let dropdownList = document.getElementById('dropdownList');
    let selectedId = i;
    selectedFromDropdown.push({ color, firstName, secondName });
    dropdownList.innerHTML += dropdownHtmlMemberCircle(
      color,
      firstName,
      secondName,
      selectedId
    );
    document.getElementById(i).classList.add('selected');
    document.getElementById('selected_img').classList.add('selected_img');
  } 
}

function dropdownHtmlMemberCircle(color, firstName, secondName) {
  return `
    <div onclick="removeFromSelectedItems('${firstName}')" class="member_cicle" style="background-color:${color};">
      ${firstName.charAt(0)}
      ${secondName.charAt(0)}
    </div>
  `;
}
/**
 *  remove the Icon and index form the array selectedFromDropdown  
 * @param {*} firstName 
 */
function removeFromSelectedItems(firstName) {
  for (let i = 0; i < selectedFromDropdown.length; i++) {
    if (selectedFromDropdown[i].firstName === firstName) {
      selectedFromDropdown.splice(i, 1);

      // Entferne das entsprechende DOM-Element aus der Dropdown-Liste
      let dropdownList = document.getElementById("dropdownList");
      let elements = dropdownList.getElementsByClassName("member_cicle");
      for (let j = 0; j < elements.length; j++) {
        let textContent = elements[j].textContent;
        if (textContent.includes(firstName.charAt(0))) {
          dropdownList.removeChild(elements[j]);
        }
        break;
      }

      break;
    }
  }
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

function renderContainer() {
  let container = document.getElementById("AddTaskContainer");
  container.innerHTML = renderHtml();
}

function renderHtml() {
  return /*html*/ `
  <!-- Head content add task -->

  <form class="main_addTask" onsubmit="pushToBoard()">
    <header class="AddTask_head"> Add Task</header>
      
    <!-- Main section add task -->
    <div class="addTaskForms">
      <!-- section add task -->
      <!-- First section  -->
      <section class="addTaskForm">
          <div class="title_head">Title<span>*</span></div>
          <input id="titleAddtask" class="border inputtextfield" type="text" placeholder="Enter a title" required>
          <div class="description_head">Description</div>
          <textarea id="description" class="border inputtextfield" placeholder="Enter a Description"></textarea>
          <div class="assign_head">Assigned to </div>
          <div class="dropdown">
              <div id="arrow" class="arrow" onclick="toggledropbtn(); return false"><img src="/assets/img/arrowDropDown.svg" alt="" srcset=""></div>
              <div onclick="toggledropbtn(); return false" class="dropbtn" id="dropbtn">Select contacts assign</div>
              <input type="text" id="dropdownInput" onkeyup="filterFunction()" class="dropdownInput d-none">
              <div id="dropdown" class="dropdown_content">
              </div>
          </div>
          <div class="dropdown_list" id="dropdownList"></div>
      </section>
      
      <!-- Secound section  -->
      <section class="addTaskForm right">
        
        <!-- Due Date  -->
        <div class="date_head">Due date<span>*</span></div>
        <input type="date" class="border" id="AddTaskDate" placeholder="DD/MM/YYYY" required>
        
        <!-- Priority  -->
        <div class="prio_head">Prio</div>
        <div class="btn_addTask_list" id="btnAddTaskPrio">
          <a class="btn_addTask" id="btnUrgend" onclick="changePriority('urgend')">Urgend <img id="btnUrgendImg" src="assets/img/Priority_symbols_Urgent.png"></a>
          <a class="btn_addTask" id="btnMedium" onclick="changePriority('medium')">Medium <img id="btnMediumImg" src="assets/img/Priority_symbols_Medium.png"></a>
          <a class="btn_addTask" id="btnLow" onclick="changePriority('low')">Low <img id="btnLowImg" src="assets/img/Priority_symbols_Low.png"></a>
        </div> 
        
        <!-- Category  -->
        <div class="category">
            <div class="category_head">Category<span>*</span></div>
            <div class="dropdown_category border inputtextfield" id="categoryDropDownBtn" onclick="categoryDropDownBtn()">Select task category</div>
            <div id="dropdownCategory" class="dropdown_content_category border"></div>    
        </div> 
        
        <!-- Subtasks  -->
        <div class="subtasks_head">Subtasks</div>
        <div class="subtask_button_container">
          <div class= "subtaskIcons" id="subtaskIcons" onclick="ChangeToSubtasks()"></div>
          <div class= "subtaskIcons d-none" id="subtaskIconsDelete" onclick="deleteSubTasks()"></div>
          <div class= "d-none" id="subtaskI">|</div>
          <div class= "subtaskIcons d-none" id="subtaskIconsCheck" onclick="pushToSubtasks()"></div> 
        </div>
        <input type="text" class="subtasksInput inputtextfield" id="subtasksInput" placeholder="Add new Subtask">
        <div id="subtasklist"></div>
      </section>

    </div> 
    
    <!-- Commit Section  -->
    <div class="create_clear_task">
      <p><span>*</span>This Field is required</p>
      <div class="addTask_btns">
        <button class="btn_transparent addTask_btn btn_gab" onclick="removeAllInputes()">Clear <div class="btn_claer"></div></button>
        <button class="btn_grey addTask_btn display_centerss btn_gab"> Create Task <img src="/assets/img/check.png"></button>
      </div>
    </div>
    
  </form>
  
  `;
}
 async function pushToBoard() {
  // Push the Add Task inputs in to a JSON
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
