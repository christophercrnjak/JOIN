// *** Assigned to *** //

// loaded_contacts is in file board_edit_assignedTo.js
// dropdownStatus is in file board_edit_assignedTo.js

/**
 * Load the contacts in loaded_contacts array.
 * Render the content of Taskcontacts in edit dialog
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
async function renderAssigedToEditDialog_addTask(taskId){
    await loadContacts();
    let container = document.getElementById('addTask_dialog_assignedTo');
    container.innerHTML = assigedToEditHTML_addTask(taskId);
    renderCiclesOfTaskContacts_addTask(taskId);
}

/**
 * Load contacts JSON in loaded_contacts array 
 */
async function loadContacts_addTask() {
    let source_contacts = await fetch('assets/json/contacts.json'); 
    source_contacts = await source_contacts.json(); 
    loaded_contacts = source_contacts;
}

/**
 * HTML main structure of assiged to section in edit dialog
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @returns {String} - HTML structure of task contacts
 */
function assigedToEditHTML_addTask(taskId) {
    return /*html */`
    <!-- label -->
    <div class="header_text_edit_section">Assiged to</div>

    <!-- dropdown selection field -->
    <div class="dropdown">

        <!-- prompt to select contacts -->
        <div id="dropdown_text_addTask" class="dropdown_text"> 
            Select contacts to assign
        </div>

        <!-- search input -->
        <div id="dropdown_input_addTask" class="d-none"> 
            <input placeholder="search contacts" onkeyup="searchContacts_addTask(${taskId})" id="search_contacts_edit_addTask" type="text">
        </div>

        <!-- triangle which shows whether the list is expanded -->
        <a class="dopdown_img_inactive" id="dropdown_arrow_addTask" onclick="openDropDownList_addTask(${taskId})">
            <img src="assets/img/arrowDropDown.svg">
        </a>
    </div>

    <!-- list of contacts for selection to current task -->
    <div id="selectedContactsSection_addTask" class="selectedContacts">

    </div>
    `;
}

/**
 * Render the cicles with initials of selected task members in selected Contacts Section.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
function renderCiclesOfTaskContacts_addTask(taskId) {
    let container = document.getElementById(`selectedContactsSection_addTask`);
    container.innerHTML = '';
    if (newTask.contacts.length > 0) {
        for (let i = 0; i < newTask.contacts.length; i++) {
            let contact = currentTaskContent.contacts[i];
            let firstCharacter = contact.firstName.charAt(0);
            let secondCharacter = contact.secondName.charAt(0);
            let color = contact.color;
            container.innerHTML += selectedTaskMemberHTML_addTask(firstCharacter, secondCharacter, taskId, i); 
            document.getElementById(`selected_task_member_addTask${taskId}${i}`).style.backgroundColor = `${color}`;
        }
    }
}

/**
 * HTML structure of cicles 
 * 
 * @param {String} firstCharacter - first letter of first name of contact 
 * @param {String} secondCharacter - first letter of second name of contact 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} i - Index of current Contact in currentTaskContent.contacts
 * @returns 
 */
function selectedTaskMemberHTML_addTask(firstCharacter, secondCharacter, taskId, i) {
    return `
        <div id="selected_task_member_addTask${taskId}${i}" class="selected_member_cicle">${firstCharacter}${secondCharacter}</div>
    `;
}

/**
 * Shows the dropdownlist with contacts and change arrow depending on dropdownstatus.
 * Change text in input for searching contacts in the list.
 */
function openDropDownList_addTask() {
    rotateArrow_addTask();
    changeTextInInput_addTask();
    if(dropdownStatus == false) {
        document.getElementById('selectedContactsSection_addTask').classList.add('flexDirection');
        showContactList_addTask(); 
        dropdownStatus = true;
    } else {
        renderCiclesOfTaskContacts_addTask();
        document.getElementById('selectedContactsSection_addTask').classList.remove('flexDirection');
        dropdownStatus = false;
    }
}

/**
 * rotate arrow 200 grad and back
 */
function rotateArrow_addTask() {
    let arrow_section = document.getElementById('dropdown_arrow_addTask')
    if (dropdownStatus == false){
        arrow_section.style.rotate = '200grad';
    } 
    else {
        arrow_section.style.rotate = '0grad';
    }
}

/**
 * Change the content of dropdown selection section
 */
function changeTextInInput_addTask() {
    let text = document.getElementById('dropdown_text_addTask');
    let input = document.getElementById('dropdown_input_addTask');
    text.classList.toggle('d-none')
    input.classList.toggle('d-none')
}

/**
 * Render dropdown contact list depending on input value by key up in search input 
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
function searchContacts_addTask() {
    let searchinput = document.getElementById('search_contacts_edit_addTask').value;
    searchinput = searchinput.toLowerCase();
    showContactList_addTask(searchinput);
    // document.getElementById('selectedContactsSection_addTask').classList.toggle('flexDirection');
}

/**
 * Shows all contacts or searched contacts
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {String} searchValue 
 */
function showContactList_addTask(searchValue) {
    let container = document.getElementById('selectedContactsSection_addTask');
    container.innerHTML = '';
    for (let i = 0; i < loaded_contacts.length; i++) {
        if (!searchValue || 
            loaded_contacts[i].name.firstName.toLowerCase().includes(searchValue) || 
            loaded_contacts[i].name.secondName.toLowerCase().includes(searchValue)) {
                container.innerHTML += editContactListHTML_addTask(i);
                // circle & checkbox are separate rendered
                renderMemberImageDropdown_addTask(i);
                renderSelectionStatusLayout_addTask(i);
            }
    }
}

/**
 * HTML structure of contact list
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} contactId - Index of contact in loaded_contacts array JSON
 * @returns 
 */
function editContactListHTML_addTask(contactId) {
    let contact = loaded_contacts[contactId].name;
    return `
        <div onclick="changeSelectionStatus(${contactId})" id="dropdown_contact_addTask${contactId}" class="dropdown_contact_row">
            
            <!-- circle & name -->
            <div class="dropdown_contact_image_name">
                <div id="character_image_addTask${contactId}"></div>
                <div class="dropdownNames">${contact.firstName} ${contact.secondName}</div>
            </div> 

            <!-- checkbox -->
            <div class="checkbox_edit">
                <a id="checkbox_edit_addTask${contactId}">
                    
                </a>
            </div>
        </div>
    `;
}
// deleteContactFromTask('${contact.firstName}', '${contact.secondName}', ${taskId})
// onclick="deleteContactFromTask('${contact.firstName}', '${contact.secondName}', ${taskId})"

function renderSelectionStatusLayout_addTask(contactId) {
    let contact = loaded_contacts[contactId].name;
    let selectedContactStatus = checkContactSelected_addTask(`${contact.firstName}`, `${contact.secondName}`)
    if (selectedContactStatus == true) {
        setListContactOnSelect_addTask(contactId)
    } else {
        setListContactNotSelect_addTask(contactId)
    } 
}

function setListContactOnSelect_addTask(contactId) {
    let container_checkbox = document.getElementById(`checkbox_edit_addTask${contactId}`);
    let cicle = document.getElementById(`selected_task_member_addTask${contactId}`);
    let container_dropdown_contact = document.getElementById(`dropdown_contact_addTask${contactId}`);
    container_checkbox.innerHTML = `<img src="assets/img/check_button_checked_white.svg">`;
    container_dropdown_contact.classList.toggle('contactOfTask');
    cicle.style.border = 'solid 3px white';
}

function setListContactNotSelect_addTask(contactId) {
    let container_checkbox = document.getElementById(`checkbox_edit_addTask${contactId}`);
    let cicle = document.getElementById(`selected_task_member_addTask${contactId}`);
    container_checkbox.innerHTML = `<img onclick="" src="assets/img/check_button_unchecked.svg">`;
    cicle.style.border = 'none';
}

/**
 * Finds out whether the contact is selected.
 * Compares the names of the global currentTaskContent.contacts with the hole contactlist of the program
 * 
 * @param {String} firstName - first name of the Contact which is selected
 * @param {String} secondName - second name of the Contact which is selected
 * @returns {Boolean} - Mark
 */
function checkContactSelected_addTask(firstName, secondName) {
    if (newTask.contacts.length > 0) {
        for (let i = 0; i < newTask.contacts.length; i++) {
            let contact = currentTaskContent.contacts[i];
            if (firstName == contact.firstName && secondName == contact.secondName) {
                return true
            }
        }
    }
}

/**
 * 
 * 
 * @param {String} firstName - first name of the Contact which is selected
 * @param {String} secondName - second name of the Contact which is selected
 * @returns {Number} Index of Contact in currentTaskContent.contacts
 */
function checkContactIndex_addTask(firstName, secondName) {
    for (let i = 0; i < currentTaskContent.contacts.length; i++) {
        let contact = currentTaskContent.contacts[i];
        if (firstName == contact.firstName && secondName == contact.secondName) {
            return i
        }
    }
}

/**
 * Set the HTML of contacts in the dropdown-list.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} contactId - Index of Contact in loaded_contacts array
 */
function renderMemberImageDropdown_addTask(contactId) {
    let container = document.getElementById(`character_image_addTask${contactId}`);
    let firstCharacter = loaded_contacts[contactId].name.firstName.charAt(0);
    let secondCharacter = loaded_contacts[contactId].name.secondName.charAt(0);
    container.innerHTML = dropdownContactHTML_addTask(firstCharacter, secondCharacter, contactId);   
    setcicleColor_addTask(contactId);
}

/**
 * HTML structure of contact cicle-image.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} contactId - Index of Contact in loaded_contacts array
 * @param {String} firstName - first name of the Contact which is selected
 * @param {String} secondName - second name of the Contact which is selected
 * @returns {String} - HTML structure
 */
function dropdownContactHTML_addTask(firstCharacter, secondCharacter, contactId) {
    return `
        <div id="selected_task_member_addTask${contactId}" class="selected_member_cicle">${firstCharacter}${secondCharacter}</div>
    `;
}

/**
 * Set the color of contact cicle-image.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} contactId - Index of Contact in loaded_contacts array
 */
function setcicleColor_addTask(contactId) {
    let cicle = document.getElementById(`selected_task_member_addTask${contactId}`);
    let color = loaded_contacts[contactId].name.color;
    cicle.style.backgroundColor = `${color}`;
}

/**
 * On click of Contact change the function the selection status in dependence of current status.
 * If the contact was selected, the function deleteContactFromTask delete the contact from currentTaskContent.contacts.
 * If the contact was not selected, the function selectContactforTask() add the Contact to currentTaskContent.contacts.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} contactId - Index of Contact in loaded_contacts array
 */
function changeSelectionStatus_addTask(contactId) {
    let contact = loaded_contacts[contactId].name;
    let firstName = contact.firstName;
    let secondName = contact.secondName;
    let color = contact.color;
    let selectedContactStatus = checkContactSelected_addTask(`${firstName}`, `${secondName}`)
    if (selectedContactStatus == true) {
        deleteContactFromTask_addTask(firstName, secondName, taskId)
    } else {
        selectContactforTask_addTask(firstName, secondName, color)
    } 
}

/**
 * Delete the Contact which is not more selected for the task.
 * 
 * @param {String} firstName - first name of the Contact which is selected
 * @param {String} secondName - second name of the Contact which is selected
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
function deleteContactFromTask_addTask(firstName, secondName) {
    let index_of_deleted_name = checkContactIndex_addTask(firstName, secondName);
    currentTaskContent.contacts.splice(index_of_deleted_name, 1);
    showContactList_addTask();
}

/**
 * Add the Contact which is selected for the task to currentTaskContent.contacts.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} contactId - Index of Contact in loaded_contacts array
 * @param {String} firstName - first name of the Contact which is selected
 * @param {String} secondName - second name of the Contact which is selected
 */
function selectContactforTask_addTask(firstName, secondName, color) {
    currentTaskContent.contacts.push(
        {
            "firstName": `${firstName}`,
            "secondName": `${secondName}`,
            "color": `${color}`
        },
    );
    showContactList_addTask();
}