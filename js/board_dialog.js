// ****** DIALOG FUNCTIONS for Board*****

function close_open_Dialog(taskId) {
    let container = document.getElementById('dialog_container');
    container.classList.toggle('d-none');
    if(!container.classList.contains('d-none')) {
    renderDialogTask(taskId)};
    renderBlueProgressbar(taskId);
}


function renderDialogTask(taskId){
    let container = document.getElementById('task_dialog_container');
    let task = tasks[taskId];
    container.innerHTML = taskDialogHTML(task, taskId);
    setColorOfCategoryInDialog(taskId);
    renderAssigedToDialog(taskId);
    renderPriorityDialog(taskId);
    renderSubtasksDialog(taskId);
}


function taskDialogHTML(task, taskId) {
    return`
        <div class="category_close">
                <div onclick="doNotClose(event)" id="task_category_dialog" class="task_category">${task.category}</div>
                <a onclick="close_open_Dialog(${taskId})" class="close">
                    <div class="line horizontal"></div>
                    <div class="line vertical"></div>
                </a>
            </div>
            <div onclick="doNotClose(event)" class="task_title_dialog">${task.title}</div>
            <div onclick="doNotClose(event)" class="task_description_dialog">${task.description}</div>
            <div onclick="doNotClose(event)" class="due_Date_dialog">
                Due date: <span class="duedate">${task.dueDate}</span>
            </div>
            <div onclick="doNotClose(event)" class="priority_dialog">
                Priority: <span >${task.priority}</span><div id="prio_image"></div>
            </div>
            <div onclick="doNotClose(event)" class="assigned_to">
                <div>Assiged To:</div>
                <div class="table_assigedto">
                    <table>
                        <tbody id="member_container_dialog"></tbody>
                    </table>
                </div>
            </div>

            <div onclick="doNotClose(event)" class="subtasks_main">
                <div id="subtask_dialog_header"></div>
                <div id="subtask_dialog_container" class="subtask_container">
                </div>
            </div>

            <div onclick="doNotClose(event)" class="delete_and_edit_section">
                <div class="delete_and_edit">
                    <a onclick="deleteTask(${taskId})"><img src="assets/img/delete.png" alt="">Delete</a>
                    <div class="line_task"></div>
                    <a onclick="renderEditDialog(${taskId})"><img src="assets/img/edit.png"  alt="">Edit</a>
                </div>
            </div>
    `;
}


function setColorOfCategoryInDialog(i) {
    let category = tasks[i].category;
    container = document.getElementById('task_category_dialog');
    switch (category) {
        case 'User Story':
          container.style.backgroundColor = '#0038FF';
          break;
        case 'Technical Task':
          container.style.backgroundColor = '#1FD7C1';
          break;
    }
}


function renderAssigedToDialog(taskId) {
    let container = document.getElementById('member_container_dialog');
    container.innerHTML = '';
    let task = tasks[taskId];
    for (let i = 0; i < task.contacts.length; i++) {
        let contact = task.contacts[i];
        container.innerHTML += `
            <tr>
                <td class="member_cycle ${contact.color} pos1">${contact.firstName.charAt(0)}${contact.secondName.charAt(0)}</td>
                <td class="member_name_assiged_to">${contact.firstName} ${contact.secondName}</td>
            </tr>
        `;
    }
}


function renderPriorityDialog(i) {
    let priority = tasks[i].priority;
    let container = document.getElementById('prio_image');
    switch (priority) {
        case "Low":
          container.innerHTML = `<img src="assets/img/Priority_symbols_Low.png" alt="">`;
          break;
        case "Medium":
            container.innerHTML = `<img src="assets/img/Priority_symbols_Medium.png" alt="">`;
          break;
        case "Urgent":
          container.innerHTML = `<img src="assets/img/Priority_symbols_Urgent.png" alt="">`;
        break;
    }
}


function renderSubtasksDialog(i){
    let container = document.getElementById('subtask_dialog_container');
    let header = document.getElementById('subtask_dialog_header')
    if (tasks[i].subtasks.length > 0) {
        header.innerHTML = 'Subtasks';
    }
    container.innerHTML = '';
    for (let j = 0; j < tasks[i].subtasks.length; j++) {
        let subtask = tasks[i].subtasks[j];
        container.innerHTML += subtaskDialogHTML(i, j, subtask.name);
        renderSubtaskImage(i, j);
    }
}

function subtaskDialogHTML(i, j, name) {
    return `
        <div class="Subtasks">
            <div id="subtask_status_img${i}${j}"></div>
            <span>${name}</span>
        </div>
    `;
}


function changeSubtaskStatus(taskId, subtaskId) {
    let subtaskStatus = tasks[taskId].subtasks[subtaskId].done;
    if (subtaskStatus == true) {
        tasks[taskId].subtasks[subtaskId].done = false;
    } else {
        tasks[taskId].subtasks[subtaskId].done = true;
    }
    renderSubtasksDialog(taskId);
    renderSubtaskAmounts(taskId);
}


function renderSubtaskImage(taskId, subtaskId) {
    let container = document.getElementById(`subtask_status_img${taskId}${subtaskId}`)
    let status = tasks[taskId].subtasks[subtaskId].done;
    switch (status) {
        case true:
          container.innerHTML = `<a class="checkbox" onclick="changeSubtaskStatus(${taskId}, ${subtaskId})"><img src="assets/img/check_button_checked.png" alt=""></a>`;
          break;
        case false:
            container.innerHTML = `<a onclick="changeSubtaskStatus(${taskId}, ${subtaskId})"><img src="assets/img/check_button_unchecked.png" alt=""></a>`;
          break;
    }
}


function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    renderColumnContent();
    close_open_Dialog(taskId);
}


function doNotClose(event) {
    event.stopPropagation();
}

function renderEditDialog(taskId) {
    let container = document.getElementById('task_dialog_container')
    container.innerHTML = '';
    container.innerHTML = editDialogHTML();
    renderTitleEditDialog(taskId);
    renderDescriptionEditDialog(taskId);
    renderDueDateEditDialog(taskId);
    renderPrioEditDialog(taskId);
    renderAssigedToEditDialog(taskId);
    renderSubtasksEditDialog(taskId);
}

function editDialogHTML() {
    return `
    <div id="close_section_edit" class="distance">
        <a onclick="close_open_Dialog()" class="close">
            <div class="line horizontal"></div>
            <div class="line vertical"></div>
        </a>
    </div>
    <img src="assets/img/Prio_medium_white.svg">
    <div id="title_section_edit" class="distance"></div>
    <div id="description_section_edit" class="distance"></div>
    <div id="dueDate_section_edit" class="distance"></div>
    <div id="prio_section_edit" class="distance"></div>
    <div id="assignedTo_section_edit" class="distance"></div>
    <div id="ok_section_edit" class="distance"></div>
    `;
}

function renderTitleEditDialog(taskId) {
    let container = document.getElementById('title_section_edit');
    let title = tasks[taskId].title;
    container.innerHTML = '';
    container.innerHTML = `
    <div class="header_text_edit_section">Titel</div>
    <input type="text" value="${title}">
    `;
}

function renderDescriptionEditDialog(taskId) {
    let container = document.getElementById('description_section_edit');
    let description = tasks[taskId].description;
    container.innerHTML = '';
    container.innerHTML = `
    <div class="header_text_edit_section">Description</div>
    <textarea rows="4" type="text">${description}</textarea>
    `;
}

function renderDueDateEditDialog(taskId) {
    let container = document.getElementById('dueDate_section_edit');
    let date = tasks[taskId].dueDate;
    container.innerHTML = '';
    container.innerHTML = `
    <div class="header_text_edit_section">Due Date</div>
    <input type="text" value="${date}">
    `;
}

function renderPrioEditDialog(taskId) {
    let container = document.getElementById('prio_section_edit');
    let prio = tasks[taskId].priority;
    container.innerHTML = '';
    container.innerHTML = prioBtnHTML();
    if (prio == "Urgent") {
        renderPrioButtons('Urgent')
    } else if (prio == "Medium") {
        renderPrioButtons('Medium')
    } else if (prio == "Low") {
        renderPrioButtons('Low')
    }
}

function prioBtnHTML() {
    return `
    <div class="header_text_edit_section_Opensans">Priority</div>
    <div class="prio_choice-section">
        <div class="btn_addTask_list">
            <div id="urgent_btn" ></div>
            <div id="medium_btn" ></div>
            <div id="low_btn" ></div>
        </div>
    </div>
    `;
}

function changePriority() {

}


function renderPrioButtons(prio) {
    let urgent_btn = document.getElementById('urgent_btn');
    let medium_btn = document.getElementById('medium_btn');
    let low_btn = document.getElementById('low_btn');
    if (prio == 'Low') {
            urgent_btn.innerHTML = urgentInactivHTML();
            medium_btn.innerHTML = mediumInactivHTML();
            low_btn.innerHTML = lowActivHTML();   
    } else if (prio == 'Medium') {
            urgent_btn.innerHTML = urgentInactivHTML();
            medium_btn.innerHTML = mediumActivHTML();
            low_btn.innerHTML = lowInactivHTML(); 
    } else if (prio == 'Urgent') {
            urgent_btn.innerHTML = urgentActivHTML();
            medium_btn.innerHTML = mediumInactivHTML();
            low_btn.innerHTML = lowInactivHTML(); 
    }
}

function urgentInactivHTML() {
    return `
        <a class="urgent_btn_inactive btn_addTask" onclick="renderPrioButtons('Urgent')">
            Urgend 
            <img id="btnUrgrend_img" src="assets/img/Priority_symbols_Urgent.png" alt="" srcset="">
        </a>
    `;
}

function urgentActivHTML() {
    return `
        <a class="urgent_btn_active btn_addTask">
            Urgend 
            <img id="btnUrgrend_img" src="assets/img/Prio_urgent_white.svg" alt="" srcset="">
        </a>
    `;
}

function mediumInactivHTML() {
     return `
        <a class="medium_btn_inactive btn_addTask" onclick="renderPrioButtons('Medium')">
            Medium 
            <img id="btnMedium_img" src="assets/img/Priority_symbols_Medium.png" alt="" srcset="">
        </a>
    `;
}

function mediumActivHTML() {
     return `
        <a class="medium_btn_active btn_addTask">
            Medium 
            <img id="btnMedium_img" src="assets/img/Prio_medium_white.svg" alt="" srcset="">
        </a>
    `;
}

function lowInactivHTML() {
     return `
        <a class="low_btn_inactive btn_addTask" onclick="renderPrioButtons('Low')">
            Low 
            <img id="btnLow_img" src="assets/img/Priority_symbols_Low.png" alt="" srcset="">
        </a>
    `;
}

function lowActivHTML() {
     return `
        <a class="low_btn_active btn_addTask">
            Low 
            <img id="btnLow_img" src="assets/img/Prio_low_white.svg" alt="" srcset="">
        </a>
    `;
}

// <a class="btn_addTask" id="btnUrgrend" onclick="changeBtnUrgrend()">
            //     Urgrend 
            //     <img id="btnUrgrend_img" src="assets/img/Priority_symbols_Urgent.png" alt="" srcset="">
            // </a>
            // <a class="btn_addTask" id="btnMedium" onclick="changeBtnMedium()">Medium <img
            // id="btnMedium_img" src="assets/img/Priority_symbols_Medium.png" alt="" srcset=""></a>
            // <a class="btn_addTask" id="btnLow" onclick="changeBtnLow()">Low <img
            // id="btnLow_img"  src="assets/img/Priority_symbols_Low.png" alt="" srcset=""></a>

// function presetPrio(taskId) {
//     let priority = tasks[taskId].priority;
//     switch (priority) {
//         case "Low":
//             document.getElementById("btnLow").style.backgroundColor = "rgba(122, 226, 41, 1)";
//             document.getElementById("btnLow").style.color = "#ffff";
//             document.getElementById("btnLow_img").src = "assets/img/Prio_low_white.svg";
//           break;
//         case "Medium":
//             document.getElementById("btnMedium").style.backgroundColor = "#ffa500";
//             document.getElementById("btnMedium").style.color = "#ffff";
//             document.getElementById("btnMedium_img").src = "assets/img/Prio_medium_white.svg";
//           break;
//         case "Urgent":
//             document.getElementById("btnUrgrend").style.backgroundColor = "#ff0000";
//             document.getElementById("btnUrgrend").style.color = "#ffff";
//             document.getElementById("btnUrgrend_img").src = "assets/img/Prio_urgent_white.svg";
//         break;
//     }
// }

// Farbe änderung der btn urgrend, medium und low

// function changeBtnUrgrend() {
//     let urgent = document.getElementById("btnUrgrend");
//     let medium = document.getElementById("btnMedium");
//     let low = document.getElementById("btnLow");
    
//     if ((urgent.style.backgroundColor = "#ffff")) {
//         urgent.style.backgroundColor = "#ff0000";
//         urgent.style.color = "#ffff";
//         document.getElementById("btnUrgrend_img").src = "assets/img/Prio_urgent_white.svg";
//         medium.style.backgroundColor = "#ffff";
//         medium.style.color = "black";
//         medium.src = "assets/img/prio_medium.svg";
//         low.style.backgroundColor = "#ffff";
//         low.style.color = "black";
//     }
// }
  
//   function changeBtnMedium() {
//     let btnUrgrend = document.getElementById("btnMedium");
//     if ((btnUrgrend.style.backgroundColor = "#ffff")) {
//       document.getElementById("btnMedium").style.backgroundColor = "#ffa500";
//       document.getElementById("btnMedium").style.color = "#ffff";
//       document.getElementById("btnMedium_img").src = "assets/img/Prio_medium_white.svg";
//       document.getElementById("btnUrgrend").style.backgroundColor = "#ffff";
//       document.getElementById("btnUrgrend").style.color = "black";
//       document.getElementById("btnLow").style.backgroundColor = "#ffff";
//       document.getElementById("btnLow").style.color = "black";
//     }
//   }
  
//   function changeBtnLow() {
//     let btnUrgrend = document.getElementById("btnLow");
//     if ((btnUrgrend.style.backgroundColor = "#ffff")) {
//       document.getElementById("btnLow").style.backgroundColor = "rgba(122, 226, 41, 1)";
//       document.getElementById("btnLow").style.color = "#ffff";
//       document.getElementById("btnLow_img").src = "assets/img/Prio_low_white.svg";
//       document.getElementById("btnUrgrend").style.backgroundColor = "#ffff";
//       document.getElementById("btnUrgrend").style.color = "black";
//       document.getElementById("btnMedium").style.backgroundColor = "#ffff";
//       document.getElementById("btnMedium").style.color = "black";
//       document.getElementById("btnMedium_img").src = "assets/img/prio_medium.svg";
//     }
//   }