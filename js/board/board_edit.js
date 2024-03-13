// variable which represents the active and selected priority status in edit dialog 
// used for chage priority in json in edit dialog by click OK
let prioStatusEdit = '';

// Source of current editing task 
let currentTaskContent = '';

/**
 * init by onclick @ task Dialog buttom right edit-icon
 * load only the current task of array tasks in the array currentTaskContent
 * render the dialog for edit content
 * 
 * @param {Number} taskId - Index of task in tasks array 
 */
function openTaskEdit(taskId) {
    dialog_status = 'edit';
    loadEditContent(taskId);
    renderEditDialog(taskId);
}

// take a copy of current editing task and load in array currentTaskContent to protect the original data of tasks.json
async function loadEditContent(taskId) {
    currentTaskContent = tasks[taskId];
}

// delete dialog container content and call functions built edit-content
function renderEditDialog(taskId) {
    let container = document.getElementById('task_dialog_container');
    container.innerHTML = editDialogHTML(taskId);
    renderTitleEditDialog(taskId);
    renderDescriptionEditDialog();
    renderDueDateEditDialog(taskId);
    renderPrioEditDialog();
    renderAssigedToEditDialog(taskId);
    renderSubtasksEditDialog(taskId);
}

// HTML of main structure of edit dialog
function editDialogHTML(taskId) {
    return /*html*/`
        <div id="close_section_edit" class="distance">
            <a onclick="closeDialog(${taskId})" class="close">
                <div class="line horizontal"></div>
                <div class="line vertical"></div>
            </a>
        </div>
        <div id="title_section_edit" class="distance"></div> 
        <div id="description_section_edit" class="distance"></div>
        <div id="dueDate_section_edit" class="distance"></div>
        <div id="prio_section_edit" class="distance"></div>
        <div id="assignedTo_section_edit" class="distance flexDirection"></div>
        <div id="subtask_section_edit" class="distance flexDirection"></div>
        <div id="ok_section_edit" class="distance">
            <a onclick="confirmInputsOfEditDialog(${taskId})" class="confirm_btn_edit">
            Ok <img src="assets/img/check.svg">
            </a>
        </div>
    
    `;
}


// *** titel *** //

// document.addEventListener('DOMContentLoaded', function() {
//     renderTitleEditDialog(); // Beim Laden der Seite das Eingabefeld initialisieren

//     let titleInput = document.getElementById('title_edit');

//     // Event-Listener für das Eingabefeld hinzufügen
//     titleInput.addEventListener('input', function() {
//         checkFormValidation(${taskId});
//     });
// });

// show title input to change content of title via inputfield
function renderTitleEditDialog(taskId) {
    let container = document.getElementById('title_section_edit');
    let title = currentTaskContent.title;
    container.innerHTML = `
        <label class="header_text_edit_section" for="title_edit" >Titel</label>
        <input onkeyup="checkFormValidation(${taskId})" onfocusout="checkFormValidation(${taskId})" onfocus="checkFormValidation(${taskId})" value="${title}" id="title_edit" name="title_edit" type="text" placeholder="Enter a Title">
        <div id="errormessage_title"></div>
    `;
}

function checkFormValidation(taskId) {
    let titleInput = document.getElementById('title_edit');
    let errormessage_title = document.getElementById('errormessage_title');
    if (titleInput.value === '' || titleInput.value == null) {
        titleInput.classList.add('non_valide'); // red border
        errormessage_title.innerHTML = 'This field is required'; // div is under the Input
        document.getElementById('errormessage_title').style.display = 'block'; // let div with text appear
        document.getElementById('close_section_edit').scrollIntoView({ behavior: 'smooth', block: 'start' }); // scroll to input
        document.getElementById('title_edit').focus();
  } else {
    titleInput.classList.remove('non_valide');
    errormessage_title.style.display = 'none';
  }
}


// *** description *** //

// show description input to change content of description via inputfield
function renderDescriptionEditDialog() {
    let container = document.getElementById('description_section_edit');
    let description = currentTaskContent.description;
    container.innerHTML = `
    <div class="header_text_edit_section">Description</div>
    <textarea placeholder="Enter a description" id="edit_input_description" rows="4" type="text">${description}</textarea>
    `;
}


// *** due date *** //

// show Due Date input to change content of Due Date via inputfield
function renderDueDateEditDialog(taskId) {
    let container = document.getElementById('dueDate_section_edit');
    let newDate = changeDueDateFormatInLongYear(taskId)
    container.innerHTML = `
    <div class="header_text_edit_section">Due Date</div>
    <form onsubmit="return validateDate()">
        <input class="" onkeyup="validateDate()"  placeholder="dd/mm/yyyy" id="edit_input_dueDate" type="text" value="${newDate}" pattern="\d{2}/\d{2}/\d{4}" required>
    </form>
    <div class="" id="errormessage_due_date"></div>
    `;
}

function validateDate() {
    let inputDate = document.getElementById("edit_input_dueDate");
    let errormessage_due_date = document.getElementById("errormessage_due_date");

    let parts = inputDate.value.split('/');
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);
    
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1; // Monate werden von 0 bis 11 gezählt
    let currentYear = currentDate.getFullYear();
    
    if (day > 31 || day < 1 || isNaN(day)) {
        if(!inputDate.classList.contains('non_valide')){
        inputDate.classList.add('non_valide');
        errormessage_due_date.style.display = 'block'; // 
        errormessage_due_date.innerHTML = 'This field is required';
    } else {
        inputDate.classList.remove('non_valide');
        errormessage_due_date.style.display = 'none';
      }
        return false;
    }
    
    if (month > 12 || month < 1 || isNaN(month)) {
        if(!inputDate.classList.contains('non_valide')){
            inputDate.classList.add('non_valide');
            errormessage_due_date.style.display = 'block'; 
            errormessage_due_date.innerHTML = 'This field is required';
        } else {
            inputDate.classList.remove('non_valide');
            errormessage_due_date.style.display = 'none';
        }
        return false;
    }
    
    if (year < currentYear || (year === currentYear && month < currentMonth) || (year === currentYear && month === currentMonth && day < currentDay)) {
        if(!inputDate.classList.contains('non_valide')){
            inputDate.classList.add('non_valide');
            errormessage_due_date.style.display = 'block'; 
            errormessage_due_date.innerHTML = 'This field is required';
        } else {
            inputDate.classList.remove('non_valide');
            errormessage_due_date.style.display = 'none';
        }
        return false;
    }
    
    return true;
}


// *** priority *** //

// show priotity buttons to change content of priority status via click on button
function renderPrioEditDialog() {
    let container = document.getElementById('prio_section_edit');
    let prio = currentTaskContent.priority;
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
            <img id="btnUrgrend_img" src="assets/img/Prio_urgent_color_origin.svg" alt="" srcset="">
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
            <img id="btnMedium_img" src="assets/img/Prio_medium_color_origin.svg" alt="" srcset="">
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
            <img id="btnLow_img" src="assets/img/Prio_low_color_origin.svg" alt="" srcset="">
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

/**
 * 
 * 
 * @param {Number} taskId - Index of task in tasks array
 */
async function confirmInputsOfEditDialog(taskId) {
    getInputValuesOfEditDialog(); 
    loadChangedContentInTasksArray(taskId);
    await setTasksToServer();
    await getTasksFromServer();
    dialog_status = 'taskdetails';
    deleteCurrentTaskContent();
    if(currentTaskContent == '') {
    renderDialogTask(taskId);}
}



function getInputValuesOfEditDialog() {
    currentTaskContent.title = document.getElementById('title_edit').value;
    currentTaskContent.description = document.getElementById('edit_input_description').value;
    currentTaskContent.dueDate = document.getElementById('edit_input_dueDate').value;
    currentTaskContent.priority = prioStatusEdit;
}

function loadChangedContentInTasksArray(taskId) {
    tasks[taskId] = currentTaskContent;
}

function deleteCurrentTaskContent() {
    currentTaskContent = '';
}
