// variable which represents the active and selected priority status in edit dialog 
// used for chage priority in json in edit dialog by click OK
let prioStatusEdit = '';
let contacts = [];

// delete dialog container content and call functions built edit-content
function renderEditDialog(taskId) {
    let container = document.getElementById('task_dialog_container')
    container.innerHTML = editDialogHTML();
    renderTitleEditDialog(taskId);
    renderDescriptionEditDialog(taskId);
    renderDueDateEditDialog(taskId);
    renderPrioEditDialog(taskId);
    renderAssigedToEditDialog(taskId);
    renderSubtasksEditDialog(taskId);
}

// HTML of main structure of edit dialog
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

// show title input to change content of title via inputfield
function renderTitleEditDialog(taskId) {
    let container = document.getElementById('title_section_edit');
    let title = tasks[taskId].title;
    container.innerHTML = `
    <div class="header_text_edit_section">Titel</div>
    <input type="text" value="${title}">
    `;
}

// show description input to change content of description via inputfield
function renderDescriptionEditDialog(taskId) {
    let container = document.getElementById('description_section_edit');
    let description = tasks[taskId].description;
    container.innerHTML = `
    <div class="header_text_edit_section">Description</div>
    <textarea rows="4" type="text">${description}</textarea>
    `;
}

// show Due Date input to change content of Due Date via inputfield
function renderDueDateEditDialog(taskId) {
    let container = document.getElementById('dueDate_section_edit');
    let date = tasks[taskId].dueDate;
    container.innerHTML = `
    <div class="header_text_edit_section">Due Date</div>
    <input type="text" value="${date}">
    `;
}

// show priotity buttons to change content of priority status via click on button
function renderPrioEditDialog(taskId) {
    let container = document.getElementById('prio_section_edit');
    let prio = tasks[taskId].priority;
    container.innerHTML = prioBtnHTML();
    if (prio == "Urgent") {
        renderPrioButtons('Urgent')
    } else if (prio == "Medium") {
        renderPrioButtons('Medium')
    } else if (prio == "Low") {
        renderPrioButtons('Low')
    }
}

// HTML of main structure of priority section in edit dialog
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

// change priority buttons design depending on value of Variable "prio"
// set global variable "prioStatusEdit" depending on prio
function renderPrioButtons(prio) {
    if (prio == 'Low') {
        setPrioBtnLowActive()  
    } else if (prio == 'Medium') {
        setPrioBtnMediumActive()
    } else if (prio == 'Urgent') {
        setPrioBtnUrgentActive()
    }
    prioStatusEdit = prio;
}

// change priority buttons in edit dialog
// case low is active
function setPrioBtnLowActive() {
    let urgent_btn = document.getElementById('urgent_btn');
    let medium_btn = document.getElementById('medium_btn');
    let low_btn = document.getElementById('low_btn');
    urgent_btn.innerHTML = urgentInactivHTML();
    medium_btn.innerHTML = mediumInactivHTML();
    low_btn.innerHTML = lowActivHTML();   
}

// change priority buttons in edit dialog
// case medium is active
function setPrioBtnMediumActive() {
    let urgent_btn = document.getElementById('urgent_btn');
    let medium_btn = document.getElementById('medium_btn');
    let low_btn = document.getElementById('low_btn');
    urgent_btn.innerHTML = urgentInactivHTML();
    medium_btn.innerHTML = mediumActivHTML();
    low_btn.innerHTML = lowInactivHTML(); 
}

// change priority buttons in edit dialog
// case urgent is active
function setPrioBtnUrgentActive() {
    let urgent_btn = document.getElementById('urgent_btn');
    let medium_btn = document.getElementById('medium_btn');
    let low_btn = document.getElementById('low_btn');
    urgent_btn.innerHTML = urgentActivHTML();
    medium_btn.innerHTML = mediumInactivHTML();
    low_btn.innerHTML = lowInactivHTML(); 
}

// HTML of urgent button in priority section for status "inactive"
// change font design through specific class and image with color
function urgentInactivHTML() {
    return `
        <a class="urgent_btn_inactive btn_addTask" onclick="renderPrioButtons('Urgent')">
            Urgend 
            <img id="btnUrgrend_img" src="assets/img/Priority_symbols_Urgent.png" alt="" srcset="">
        </a>
    `;
}

// HTML of urgent button in priority section for status "active"
// change font design through specific class and image with white 
function urgentActivHTML() {
    return `
        <a class="urgent_btn_active btn_addTask">
            Urgend 
            <img id="btnUrgrend_img" src="assets/img/Prio_urgent_white.svg" alt="" srcset="">
        </a>
    `;
}

// HTML of medium button in priority section for status "inactive"
// change font design through specific class and image with color
function mediumInactivHTML() {
     return `
        <a class="medium_btn_inactive btn_addTask" onclick="renderPrioButtons('Medium')">
            Medium 
            <img id="btnMedium_img" src="assets/img/Priority_symbols_Medium.png" alt="" srcset="">
        </a>
    `;
}

// HTML of medium button in priority section for status "active"
// change font design through specific class and image with white 
function mediumActivHTML() {
     return `
        <a class="medium_btn_active btn_addTask">
            Medium 
            <img id="btnMedium_img" src="assets/img/Prio_medium_white.svg" alt="" srcset="">
        </a>
    `;
}

// HTML of low button in priority section for status "inactive"
// change font design through specific class and image with color
function lowInactivHTML() {
     return `
        <a class="low_btn_inactive btn_addTask" onclick="renderPrioButtons('Low')">
            Low 
            <img id="btnLow_img" src="assets/img/Priority_symbols_Low.png" alt="" srcset="">
        </a>
    `;
}

// HTML of low button in priority section for status "active"
// change font design through specific class and image with white 
function lowActivHTML() {
     return `
        <a class="low_btn_active btn_addTask">
            Low 
            <img id="btnLow_img" src="assets/img/Prio_low_white.svg" alt="" srcset="">
        </a>
    `;
}

async function renderAssigedToEditDialog(taskId){
    await loadContacts();
    let container = document.getElementById('assignedTo_section_edit');
    container.innerHTML = assigedToEditHTML();
    renderSelectedContacts(taskId);
}

function assigedToEditHTML() {
    return `
    <div class="header_text_edit_section">Assiged to</div>
    <a class="dropdown" onclick="showContactList()">
        <div class="dropdown_text">Select contacts to assign</div>
        <div class="dopdown_img_inactive"><img src="assets/img/arrowDropDown.svg" alt=""></div>
        <div class="dopdown_img_active d-none"></div>
    </a>
    <div id="selectedContactsSection" class="selectedContacts">

    </div>
    `;
}

async function loadContacts() {
    let resp = await fetch('assets/json/contacts.json'); 
    contacts = await resp.json(); 
}

function renderSelectedContacts(taskId) {
    let task = tasks[taskId];
    let container = document.getElementById(`selectedContactsSection`);
    container.innerHTML = '';
    for (let i = 0; i < task.contacts.length; i++) {
        let contact = task.contacts[i];
        let firstCharacter = contact.firstName.charAt(0);
        let secondCharacter = contact.secondName.charAt(0);
        let colorClass = contact.color;
        container.innerHTML += selectedTaskMemberHTML(firstCharacter, secondCharacter, colorClass, taskId, i);   
    }
}

function selectedTaskMemberHTML(firstCharacter, secondCharacter, colorClass, task_number, i) {
    return `
        <div id="selected_task_member${task_number}${i}" class="selected_member_cycle ${colorClass}">${firstCharacter}${secondCharacter}</div>
    `;
}







