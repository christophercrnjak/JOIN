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
    <div class="dropdown_img"></div>
  </a>
  `;
}

function selectFromDropdown(color, firstName, secondName, i) {
  // Select for the Drop Down
  let dropdownList = document.getElementById("dropdownList");
  let selectedId = i;
  selectedFromDropdown.push({ color, firstName, secondName });
  dropdownList.innerHTML += dropdownHtmlMemberCircle(
    color,
    firstName,
    secondName,
    selectedId
  );
  document.getElementById(i).classList.add("selected");
  document.getElementById(i).classList.add("dropdown_img");
}


function dropdownHtmlMemberCircle(color, firstName, secondName) {
  return `
    <div onclick="removeFromSelectedItems('${firstName}')" class="member_cicle" style="background-color:${color};">
      ${firstName.charAt(0)}
      ${secondName.charAt(0)}
    </div>
  `;
}

function removeFromSelectedItems(firstName) {
  // Durchsuche das Array nach dem Element mit dem gegebenen Vornamen und entferne es
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
          break; // Breche die Schleife ab, sobald das Element entfernt wurde
        }
      }

      break; // Breche die Schleife ab, sobald das Element entfernt wurde
    }
  }
}

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
  let dropdownContent = document.getElementById("dropdown");

  if (!dropdownContent.classList.contains("d-none")) {
    dropdownContent.classList.toggle("show_task");
    document.getElementById("dropdownInput").classList.toggle("d-none");
    document.getElementById("dropbtn").classList.toggle("d-none");
    document.getElementById("arrow").classList.toggle("rotated");
  }
}

// Prio Btn

function changePriority(priority) {
  resetStyles();
  removePreviousPriority();

  if (priority === "urgrend") {
    setPriorityStyles(
      "#FF3D00",
      "#ffff",
      "/assets/img/prio_ungrent.svg",
      "urgrend"
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
  let btnUrgrend = document.getElementById("btnUrgrend");
  let btnMedium = document.getElementById("btnMedium");
  let btnLow = document.getElementById("btnLow");

  let imgUrgrend = document.getElementById("btnUrgrendImg");
  let imgMedium = document.getElementById("btnMediumImg");
  let imgLow = document.getElementById("btnLowImg");

  let buttons = [btnUrgrend, btnMedium, btnLow];
  let images = [imgUrgrend, imgMedium, imgLow];

  buttons.forEach(function (button) {
    button.style.backgroundColor = "#ffff";
    button.style.color = "black";
  });

  images.forEach(function (image) {
    if (image.id === "btnUrgrendImg") {
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
function categoryDropDownBtn() {
  document.getElementById("dropdownCategory").classList.toggle("show");
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
  let category = document.getElementById("categoryDropDownBtn");
  category.innerHTML = element;
  pushCategory.push(element);
  if (pushCategory.length > 1) {
    pushCategory.shift();
  }
}

function pushToSubtasks() {
  let subtasksInput = document.getElementById("subtasksInput").value;
  subtasklists.push(subtasksInput);
  rendersubtasklist();
}

function rendersubtasklist() {
  let rendersubtasklist = document.getElementById("subtasklist");
  rendersubtasklist.innerHTML = "";
  for (let i = 0; i < subtasklists.length; i++) {
    let subtaskHTML = subtasklists[i];
    rendersubtasklist.innerHTML += subtasklistHTML(subtaskHTML, i);
    console.log(subtaskHTML);
  }
  subtasklistHTML();
}
function removeSubtask(i) {
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
              <input id="titleAddtask" type="text" placeholder="Enter a title" required>
              <div class="description_head">Description</div>
              <textarea id="description" placeholder="Enter a Description"></textarea>
              <div class="assign_head">Assigned to </div>
              <div class="dropdown">
                  <div id="arrow" class="arrow" onclick="toggledropbtn(); return false"><img src="" alt="" srcset=""></div>
                  <div onclick="toggledropbtn(); return false" class="dropbtn" id="dropbtn">Select contacts assign</div>
                  <input type="text" id="dropdownInput" onkeyup="filterFunction()" class="d-none">
                  <div id="dropdown" class="dropdown_content">
                  </div>
              </div>
              <div class="dropdown_list" id="dropdownList"></div>
          </section>
  <!-- Secound section  -->
          <section class="addTaskForm right">
              <div class="date_head">Due date<span>*</span></div>
              <input type="date" id="AddTaskDate" required>
              <div class="prio_head">Prio</div>
 <div class="btn_addTask_list" id="btnAddTaskPrio">
                  <a class="btn_addTask" id="btnUrgrend" onclick="changePriority('urgrend')">Urgrend <img id="btnUrgrendImg"
                          src="assets/img/Priority_symbols_Urgent.png"></a>
                  <a class="btn_addTask" id="btnMedium" onclick="changePriority('medium')">Medium <img id="btnMediumImg"
                          src="assets/img/Priority_symbols_Medium.png"></a>
                  <a class="btn_addTask" id="btnLow" onclick="changePriority('low')">Low <img id="btnLowImg"
                          src="assets/img/Priority_symbols_Low.png"></a>
</div> 
<div class="category">
                      <div class="category_head">Category<span>*</span></div>
                      <div class="dropdown_category" id="categoryDropDownBtn" onclick="categoryDropDownBtn()">Select task category</div>
                      <div id="dropdownCategory" class="dropdown_content_category"></div>    
</div> 
                  <div class="subtasks_head">Subtasks</div>
                  <div class="subtask_button_container">
                  <div class="subtaskIcons"><img onclick="pushToSubtasks()" src="/assets/img/subtasksPlus.svg"><img class="d-none" src="/assets/img/check_dark.svg"></div>
                  <input type="text" class="subtasksInput" id="subtasksInput" placeholder="Add new Subtask">
                  </div>
                  <div id="subtasklist"></div>
          
          </section>
  
      </div>
             
      <div class="create_clear_task">
      <p><span>*</span>This Field is required</p>
      <div class="addTask_btns">
          <button class="btn_transparent addTask_btn btn_gab" onclick="removeAllInputes()">Clear <img src="assets/img/close_black.svg"></button>
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

  // pushCategory.value = '';
  // selectedFromDropdown.value = '';
  // prio.value = '';
}

function removeAllInputes() {
  // Remove the Add Task inputs
  selectedFromDropdown = [];
  prio = [];
  pushCategory = [];
  subtasklists = [];
}
