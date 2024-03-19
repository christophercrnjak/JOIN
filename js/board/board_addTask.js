let newTask = {
    "title": "",
    "description": "",
    "category": "",
    "contacts": [],
    "dueDate": "",
    "priority": "",
    "subtasks": [],
    "status": "toDo"
};

async function openAdddTaskDialog(){
    let container = document.getElementById('dialog_container');
    let taskDialogContainer = document.getElementById('task_dialog_container');
    dialog_status = 'addTask';
    await renderaddTaskDialog();  
    container.classList.remove('d-none');
    taskDialogContainer.style.position = 'none'; 
    await getTasksFromServer();
}

function renderaddTaskDialog() {
    let container = document.getElementById('task_dialog_container');
    let taskId = tasks.length 
    container.innerHTML = addTaskDialogHTML(taskId);
    renderTitleAddTaskDialog(taskId);
    renderDescriptionAddTaskDialog();
    renderAssigedToEditDialog_addTask();
    renderDueDateEditDialog_addTask();
    renderPrioEditDialog_addTask();
    renderCategoryAddTaskDialog();
    renderSubtasksEditDialog_addTask();
    renderCommitSection_addTask();
    document.getElementById('task_dialog_container').style.width = 'fit-content';
}

function addTaskDialogHTML(taskId) {
    return /*html*/`
    <div class="addTask_dialog_container">
        <!-- header -->
        <div class="addTask_dialog_box_head">
            <div class="header_text_addTask_dialog">Add Task</div>
            <div id="close_section_edit" class="distance">
                <a onclick="closeDialog(${taskId})" class="close">
                    <div class="line horizontal"></div>
                    <div class="line vertical"></div>
                </a>
            </div>
        </div>
        <!-- middle -->
        <div class="addTask_dialog_box_middle">
            <!-- left -->
            <div class="addTask_dialog_box_content_left">
                <div id="addTask_dialog_title" class="distance"></div> 
                <div id="addTask_dialog_description" class="distance"></div>
                <div id="addTask_dialog_assignedTo" class="distance"></div>
            </div>
            <!-- line -->
            <hr id="line_addTask_dialog">
            <!-- right -->
            <div class="addTask_dialog_box_content_right">
                <div id="addTask_dialog_duedate" class="distance"></div>
                <div id="addTask_dialog_priority" class="distance flexDirection"></div>
                <div id="addTask_dialog_category" class="distance flexDirection"></div>
                <div id="addTask_dialog_subtasks" class="distance flexDirection"></div>
            </div>
        </div>
        <!-- footer -->
        <div id="addTask_dialog_createTask" class="distance"></div>
    </div>
    `;
}


// *** titel *** //

// show title input to change content of title via inputfield
function renderTitleAddTaskDialog(taskId) {
    let container = document.getElementById('addTask_dialog_title');
    container.innerHTML = `
        <label class="header_text_edit_section" for="title_edit" >Titel<span class="red_star">*</span></label>
        <input onkeyup="checkFormValidation_title()" onfocusout="checkFormValidation_title()" id="input_title_addTask_dialog" name="title_edit" type="text" placeholder="Enter a Title">
        <div id="errormessage_title"></div>
    `;
}

function checkFormValidation_title() {
    let titleInput = document.getElementById('input_title_addTask_dialog');
    let errormessage_title = document.getElementById('errormessage_title');
    if (titleInput.value === '' || titleInput.value == null) {
        titleInput.classList.add('non_valide'); // red border
        errormessage_title.innerHTML = 'This field is required'; // div is under the Input
        document.getElementById('errormessage_title').style.display = 'block'; // let div with text appear
        document.getElementById('close_section_edit').scrollIntoView({ behavior: 'smooth', block: 'start' }); // scroll to input
        document.getElementById('input_title_addTask_dialog').focus();
  } else {
    titleInput.classList.remove('non_valide');
    errormessage_title.style.display = 'none';
  }
}


// *** description *** //

// show description input to change content of description via inputfield
function renderDescriptionAddTaskDialog() {
    let container = document.getElementById('addTask_dialog_description');
    container.innerHTML = DescriptionEditDialogHTML();
}

function DescriptionEditDialogHTML() {
    return /*html */ `
    <div class="header_text_edit_section">Description</div>
    <textarea placeholder="Enter a description" id="input_description_addTask_dialog" rows="4" type="text"></textarea>
    `;
}


// *** due date *** //

// show Due Date input to change content of Due Date via inputfield
function renderDueDateEditDialog_addTask() {
    let container = document.getElementById('addTask_dialog_duedate');
    // let newDate = changeDueDateFormatInLongYear(taskId)
    container.innerHTML = DueDateEditDialogHTML_addTask();
}

function DueDateEditDialogHTML_addTask() {
    return /*html*/`
        <div class="header_text_edit_section">Due Date<span class="red_star">*</span></div>
        <form>
            <input class="" pattern="\d{2}/\d{2}/\d{4}" onfocusout="DueDatevalidation()" onkeyup="DueDatevalidation_addTask()" placeholder="dd/mm/yyyy" id="edit_input_dueDate_addTask" type="text"  required>
        </form>
        <div class="" id="errormessage_due_date_addTask">This field is required</div>
    `;
}

function DueDatevalidation_addTask() {
    validationOfDay_addTask();
    validationOfMonth_addTask();
    validationOfYear_addTask();
}

function validationOfDay_addTask() {
    let inputDate = document.getElementById("edit_input_dueDate_addTask");
    let errormessage_due_date = document.getElementById("errormessage_due_date_addTask");
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

function validationOfMonth_addTask() {
    let inputDate = document.getElementById("edit_input_dueDate_addTask");
    let errormessage_due_date = document.getElementById("errormessage_due_date_addTask");
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

function validationOfYear_addTask() {
    let inputDate = document.getElementById("edit_input_dueDate_addTask");
    let errormessage_due_date = document.getElementById("errormessage_due_date_addTask");
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


// *** Priority *** //

let prio_addTask = 'Medium';

// show priotity buttons to change content of priority status via click on button
function renderPrioEditDialog_addTask() {
    let container = document.getElementById('addTask_dialog_priority');
    container.innerHTML = prioBtnHTML_addTask();
    if (prio_addTask == "Urgent") {
        renderPrioButtons_addTask('Urgent')
    } else if (prio_addTask == "Medium") {
        renderPrioButtons_addTask('Medium')
    } else if (prio_addTask == "Low") {
        renderPrioButtons_addTask('Low')
    }
}

// HTML of main structure of priority section in edit dialog
function prioBtnHTML_addTask() {
    return /*html */`
    <div class="header_text_edit_section_Opensans">Priority</div>
    <div class="prio_choice-section">
        <div class="btn_addTask_list">
            <div id="urgent_btn_addTask" ></div>
            <div id="medium_btn_addTask" ></div>
            <div id="low_btn_addTask" ></div>
        </div>
    </div>
    `;
}

// change priority buttons design depending on value of Variable "prio"
// set global variable "prioStatusEdit" depending on prio
function renderPrioButtons_addTask(prio) {
    if (prio == 'Low') {
        setPrioBtnLowActive_addTask()
    } else if (prio == 'Medium') {
        setPrioBtnMediumActive_addTask()
    } else if (prio == 'Urgent') {
        setPrioBtnUrgentActive_addTask()
    }
    prio_addTask = prio;
}

// change priority buttons in edit dialog
// case low is active
function setPrioBtnLowActive_addTask() {
    let urgent_btn = document.getElementById('urgent_btn_addTask');
    let medium_btn = document.getElementById('medium_btn_addTask');
    let low_btn = document.getElementById('low_btn_addTask');
    urgent_btn.innerHTML = urgentInactivHTML_addTask();
    medium_btn.innerHTML = mediumInactivHTML_addTask();
    low_btn.innerHTML = lowActivHTML_addTask();
}

// change priority buttons in edit dialog
// case medium is active
function setPrioBtnMediumActive_addTask() {
    let urgent_btn = document.getElementById('urgent_btn_addTask');
    let medium_btn = document.getElementById('medium_btn_addTask');
    let low_btn = document.getElementById('low_btn_addTask');
    urgent_btn.innerHTML = urgentInactivHTML_addTask();
    medium_btn.innerHTML = mediumActivHTML_addTask();
    low_btn.innerHTML = lowInactivHTML_addTask();
}

// change priority buttons in edit dialog
// case urgent is active
function setPrioBtnUrgentActive_addTask() {
    let urgent_btn = document.getElementById('urgent_btn_addTask');
    let medium_btn = document.getElementById('medium_btn_addTask');
    let low_btn = document.getElementById('low_btn_addTask');
    urgent_btn.innerHTML = urgentActivHTML_addTask();
    medium_btn.innerHTML = mediumInactivHTML_addTask();
    low_btn.innerHTML = lowInactivHTML_addTask();
}

// HTML of urgent button in priority section for status "inactive"
// change font design through specific class and image with color
function urgentInactivHTML_addTask() {
    return `
        <a class="urgent_btn_inactive btn_addTask" onclick="renderPrioButtons_addTask('Urgent')">
            Urgend 
            <img id="btnUrgrend_img_addTask" src="assets/img/Prio_urgent_color_origin.svg" alt="" srcset="">
        </a>
    `;
}

// HTML of urgent button in priority section for status "active"
// change font design through specific class and image with white 
function urgentActivHTML_addTask() {
    return `
        <a class="urgent_btn_active btn_addTask">
            Urgend 
            <img id="btnUrgrend_img_addTask" src="assets/img/Prio_urgent_white.svg" alt="" srcset="">
        </a>
    `;
}

// HTML of medium button in priority section for status "inactive"
// change font design through specific class and image with color
function mediumInactivHTML_addTask() {
    return `
        <a class="medium_btn_inactive btn_addTask" onclick="renderPrioButtons_addTask('Medium')">
            Medium 
            <img id="btnMedium_img_addTask" src="assets/img/Prio_medium_color_origin.svg" alt="" srcset="">
        </a>
    `;
}

// HTML of medium button in priority section for status "active"
// change font design through specific class and image with white 
function mediumActivHTML_addTask() {
    return `
        <a class="medium_btn_active btn_addTask">
            Medium 
            <img id="btnMedium_img_addTask" src="assets/img/Prio_medium_white.svg" alt="" srcset="">
        </a>
    `;
}

// HTML of low button in priority section for status "inactive"
// change font design through specific class and image with color
function lowInactivHTML_addTask() {
    return `
        <a class="low_btn_inactive btn_addTask" onclick="renderPrioButtons_addTask('Low')">
            Low 
            <img id="btnLow_img_addTask" src="assets/img/Prio_low_color_origin.svg" alt="" srcset="">
        </a>
    `;
}

// HTML of low button in priority section for status "active"
// change font design through specific class and image with white 
function lowActivHTML_addTask() {
    return `
        <a class="low_btn_active btn_addTask">
            Low 
            <img id="btnLow_img_addTask" src="assets/img/Prio_low_white.svg" alt="" srcset="">
        </a>
    `;
}


// *** Category *** //

let categorys = ["Technical Task", "User Story"];
let selectedCategory = '';
/**
 * Shows whether the dropdown list is open.
 * 
 * @type {boolean}
 */
let dropdownStatus_category = false;

function renderCategoryAddTaskDialog() {
    let container = document.getElementById('addTask_dialog_category');
    container.innerHTML = `
        <label class="header_text_edit_section">Category<span class="red_star">*</span></label>
        <div id="category_addTask_section_dropdown">
            <div id="category_addTask_dialog" class="dropdown_text"><span id="category_field_text">Select task category</span> 
                <a class="dopdown_img_inactive" id="dropdown_arrow_category_addTask" onclick="openDropDownList_category_addTask()">
                    <img src="assets/img/arrowDropDown.svg">
                </a>
            </div>
            <div id="dropdown_category_addTask" class="d-none"></div>
        </div>
    `;
    renderCategories();
}

function renderCategories() {
    let container = document.getElementById('dropdown_category_addTask');
    for (let i = 0; i < categorys.length; i++) {
        let category = categorys[i];
        container.innerHTML += `
        <div onclick="selectCategory('${category}')" class="category_name_addTask">${category}</div>
    `;
    }
    
}

/**
 * Shows the dropdownlist with contacts and change arrow depending on dropdownstatus.
 * Change text in input for searching contacts in the list.
 */
function openDropDownList_category_addTask() {
    let dropdown = document.getElementById('dropdown_category_addTask');
    let holeCategoryDiv = document.getElementById('category_addTask_section_dropdown');
    rotateArrow_category_addTask();
    if(dropdownStatus_category == false) {
        dropdownStatus_category = true;
        dropdown.classList.toggle('d-none');
        holeCategoryDiv.classList.toggle('boxShadow_and_borderRadius');
    } else {
        renderCiclesOfTaskContacts_addTask();
        document.getElementById('selectedContactsSection_addTask').classList.remove('flexDirection');
        dropdownStatus_category = false;
        dropdown.classList.toggle('d-none');
        holeCategoryDiv.classList.toggle('boxShadow_and_borderRadius');
    }
}

/**
 * rotate arrow 200 grad and back
 */
function rotateArrow_category_addTask() {
    let arrow_section = document.getElementById('dropdown_arrow_category_addTask')
    if (dropdownStatus_category == false){
        arrow_section.style.rotate = '200grad';
    } 
    else {
        arrow_section.style.rotate = '0grad';
    }
}

function selectCategory(category) {
    let text = document.getElementById('category_field_text');
    if (category == `${categorys[0]}`) {
        text.innerHTML = `${categorys[0]}`;
        selectedCategory = `${categorys[0]}`;
    } else if (category == `${categorys[1]}`) {
        text.innerHTML = `${categorys[1]}`;
        selectedCategory = `${categorys[1]}`;
    }
}

// *** Subtasks *** //

function renderCommitSection_addTask() {
    let container = document.getElementById('addTask_dialog_createTask');
    container.innerHTML = commitSectionHTML();
}

function commitSectionHTML() {
    return /*html */`
        <div class="create_clear_task">
            <p><span>*</span>This Field is required</p>
            <div class="addTask_btns">
              <button class="btn_transparent addTask_btn btn_gab">Clear <span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647"/>
              </svg>
              </span></button>
              <button class="btn_grey addTask_btn display_centerss btn_gab"> Create Task <img src="/assets/img/check.png"></button>
            </div>
        </div>
    `;
}