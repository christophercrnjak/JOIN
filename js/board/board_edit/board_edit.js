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
function loadEditContent(taskId) {
    currentTaskContent = JSON.parse(JSON.stringify(tasks[taskId]));
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
    <div onclick="closeDropdownList(${taskId})">
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
        <div id="assignedTo_section_edit" class="distance flexDirection" onclick="doNotClose(event)"></div>
        <div id="subtask_section_edit" class="distance flexDirection"></div>    
    </div>
    <div id="ok_section_edit" class="distance">
        <a onclick="confirmInputsOfEditDialog(${taskId})" class="confirm_btn_edit">
        Ok <img src="assets/img/check.svg">
        </a>
    </div>
    `;
}


// *** titel *** //

// show title input to change content of title via inputfield
function renderTitleEditDialog(taskId) {
    let container = document.getElementById('title_section_edit');
    let title = currentTaskContent.title;
    container.innerHTML = `
        <label class="header_text_edit_section" for="title_edit" >Titel</label>
        <input onkeyup="checkFormValidation_title()" onfocusout="checkFormValidation_title()" value="${title}" id="title_edit" name="title_edit" type="text" placeholder="Enter a Title">
        <div class="errormessage_title" id="errormessage_title"></div>
    `;
}


function checkFormValidation_title() {
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
    container.innerHTML = DescriptionEditDialogHTML();
}

function DescriptionEditDialogHTML() {
    return /*html */ `
    <div class="header_text_edit_section">Description</div>
    <textarea placeholder="Enter a description" id="edit_input_description" rows="4" type="text">${currentTaskContent.description}</textarea>
    `;
}


// *** due date *** //

// show Due Date input to change content of Due Date via inputfield
function renderDueDateEditDialog(taskId) {
    let container = document.getElementById('dueDate_section_edit');
    let newDate = changeDueDateFormatInLongYear(taskId)
    container.innerHTML = DueDateEditDialogHTML(newDate);
}

function DueDateEditDialogHTML(newDate) {
    return /*html*/`
        <div class="header_text_edit_section">Due Date</div>
        <form>
            <input class="" pattern="\d{2}/\d{2}/\d{4}" onfocusout="DueDatevalidation()" onkeyup="DueDatevalidation()" placeholder="dd/mm/yyyy" id="edit_input_dueDate" type="text" value="${newDate}"  required>
        </form>
        <div class="" id="errormessage_due_date">This field is required</div>
    `;
}

function DueDatevalidation() {
    validationOfDay();
    validationOfMonth();
    validationOfYear();
}

function validationOfDay() {
    let inputDate = document.getElementById("edit_input_dueDate");
    let errormessage_due_date = document.getElementById("errormessage_due_date");
    let parts = inputDate.value.split('/');
    let day = parts[0];
    if (parseInt(day, 10) > 31 || parseInt(day, 10) < 1 || parseInt(day, 10) == 0 || day.length < 2 || isNaN(day)) {
        inputDate.classList.add('non_valide');
        errormessage_due_date.style.display = 'block';
    } else {
        inputDate.classList.remove('non_valide');
        errormessage_due_date.style.display = 'none';
    }
}

function validationOfMonth() {
    let inputDate = document.getElementById("edit_input_dueDate");
    let errormessage_due_date = document.getElementById("errormessage_due_date");
    let parts = inputDate.value.split('/');
    let month = parts[1];
    if (parseInt(month, 10) > 12 || parseInt(month, 10) < 1 || parseInt(month, 10) == 0 || month.toString().length < 2 || isNaN(month)) {
        inputDate.classList.add('non_valide');
        errormessage_due_date.style.display = 'block'; 
    } else {
        if(!inputDate.classList.contains('non_valide')){
        inputDate.classList.remove('non_valide');
        errormessage_due_date.style.display = 'none';
        }
    }
}

function validationOfYear() {
    let inputDate = document.getElementById("edit_input_dueDate");
    let errormessage_due_date = document.getElementById("errormessage_due_date");
    let parts = inputDate.value.split('/');
    let year = parseInt(parts[2], 10);
    if (year < 2000 || isNaN(year)) {
        inputDate.classList.add('non_valide');
        errormessage_due_date.style.display = 'block'; 
    } else {
        if(!inputDate.classList.contains('non_valide')){
        inputDate.classList.remove('non_valide');
        errormessage_due_date.style.display = 'none';
        }
    }
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
    return /*html */`
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
            Urgent
            <img id="btnUrgrend_img" src="assets/img/Prio_urgent_color_origin.svg" alt="" srcset="">
        </a>
    `;
}

// HTML of urgent button in priority section for status "active"
// change font design through specific class and image with white 
function urgentActivHTML() {
    return `
        <a class="urgent_btn_active btn_addTask">
            Urgent
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


// *** Confirmation *** //


/**
 * Starts the functions that save and display the changed entries.
 * 
 * @param {Number} taskId - Index of task in tasks array
 */
async function confirmInputsOfEditDialog(taskId) {
    getInputValuesOfEditDialog(); 
    await loadChangedContentInTasksArray(taskId);
    await setAndGetToServer(); //@storage.js:55
    dialog_status = 'taskdetails';
    await deleteCurrentTaskContent();
    renderDialogTask(taskId); // @board_dialog_taskdetails.js:24
}


/**
 * Load content of title, description, due date inputs and priority choice in currentTaskContent.
 * Contacts of Assigned to section and subtasks section are always directly saved in currentTaskContent after changes.
 */
function getInputValuesOfEditDialog() {
    currentTaskContent.title = document.getElementById('title_edit').value;
    currentTaskContent.description = document.getElementById('edit_input_description').value;
    currentTaskContent.dueDate = changeDueDateFormatInShortYear();
    currentTaskContent.priority = prioStatusEdit;
}

/**
 * Chages the due date fomat from dd/mm/yyyy to dd/mm/yy
 * 
 * @returns {String} "dd/mm/yy"
 */
function changeDueDateFormatInShortYear() {
    let date = document.getElementById('edit_input_dueDate').value;
    date = date.split('/');
    let year = parseInt(date[2]); 
    year = year - 2000;
    let newDate = date[0] + '/' + date[1] + '/' + year;
    return newDate
}

/**
 * Loads the items of the new task to tasks
 * 
 * @param {*} taskId - - Index of task in tasks array
 */
function loadChangedContentInTasksArray(taskId) {
    tasks[taskId] = currentTaskContent;
}

/**
 * Resets the currentTaskContent array.
 */
function deleteCurrentTaskContent() {
    currentTaskContent = '';
}
