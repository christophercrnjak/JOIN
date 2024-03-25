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