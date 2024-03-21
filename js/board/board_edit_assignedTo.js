/**
 * Copy of contacts.json file
 * 
 * @type {JSON} - 
 */
let loaded_contacts =[];

/**
 * Shows whether the dropdown list is open.
 * 
 * @type {boolean}
 */
let dropdownStatus = false;


/**
 * Load the contacts in loaded_contacts array.
 * Render the content of Taskcontacts in edit dialog
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
async function renderAssigedToEditDialog(taskId){
    await loadContacts();
    let container = document.getElementById('assignedTo_section_edit');
    container.innerHTML = assigedToEditHTML(taskId);
    renderCiclesOfTaskContacts(taskId);
}

/**
 * Load contacts JSON in loaded_contacts array 
 */
async function loadContacts() {
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
function assigedToEditHTML(taskId) {
    return /*html */`
    <!-- label -->
    <div class="header_text_edit_section">Assiged to</div>

    <!-- dropdown selection field -->
    <div id="dropdown_main" class="dropdown">

        <!-- prompt to select contacts -->
        <div id="dropdown_text" class="dropdown_text"> 
            Select contacts to assign
        </div>

        <!-- search input -->
        <div id="dropdown_input" class="d-none"> 
            <input onkeyup="searchContacts(${taskId})" id="search_contacts_edit" type="text">
        </div>

        <!-- triangle which shows whether the list is expanded -->
        <a class="dopdown_img_inactive" id="dropdown_arrow" onclick="openDropDownList(${taskId})">
            <img src="assets/img/arrowDropDown.svg">
        </a>
    </div>

    <!-- list of contacts for selection to current task -->
    <div id="selectedContactsSection" class="selectedContacts">

    </div>
    `;
}

/**
 * Render the cicles with initials of selected task members in selected Contacts Section.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
function renderCiclesOfTaskContacts(taskId) {
    let container = document.getElementById(`selectedContactsSection`);
    container.innerHTML = '';
    for (let i = 0; i < currentTaskContent.contacts.length; i++) {
        let contact = currentTaskContent.contacts[i];
        let firstCharacter = contact.firstName.charAt(0);
        let secondCharacter = contact.secondName.charAt(0);
        let color = contact.color;
        container.innerHTML += selectedTaskMemberHTML(firstCharacter, secondCharacter, taskId, i); 
        document.getElementById(`selected_task_member${taskId}${i}`).style.backgroundColor = `${color}`;
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
function selectedTaskMemberHTML(firstCharacter, secondCharacter, taskId, i) {
    return `
        <div class="circle_size">
            <div id="selected_task_member${taskId}${i}" class="selected_member_cicle">${firstCharacter}${secondCharacter}</div>
        </div> 
    
    `;
}

function openDropDownList(taskId) {
    rotateArrow();
    changeTextInInput();
    if(dropdownStatus == false) {
        showContactList(taskId);
        document.getElementById('selectedContactsSection').classList.add('flexDirection');
        dropdownStatus = true;
    } else {
        renderCiclesOfTaskContacts(taskId);
        document.getElementById('selectedContactsSection').classList.remove('flexDirection');
        dropdownStatus = false;
    }
}

function rotateArrow() {
    let arrow_section = document.getElementById('dropdown_arrow')
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
function changeTextInInput() {
    let text = document.getElementById('dropdown_text');
    let input = document.getElementById('dropdown_input');
    text.classList.toggle('d-none')
    input.classList.toggle('d-none')
}

/**
 * Render dropdown contact list depending on input valueOn by key up in search input 
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
function searchContacts(taskId) {
    let searchinput = document.getElementById('search_contacts_edit').value;
    searchinput = searchinput.toLowerCase();
    showContactList(taskId, searchinput);
    // document.getElementById('selectedContactsSection').classList.toggle('flexDirection');
}

/**
 * Shows all contacts or searched contacts
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {String} searchValue 
 */
function showContactList(taskId, searchValue) {
    let container = document.getElementById('selectedContactsSection');
    container.innerHTML = '';
    for (let i = 0; i < loaded_contacts.length; i++) {
        if (!searchValue || 
            loaded_contacts[i].name.firstName.toLowerCase().includes(searchValue) || 
            loaded_contacts[i].name.secondName.toLowerCase().includes(searchValue)) {
                container.innerHTML += editContactListHTML(taskId, i);
                // circle & checkbox are separate rendered
                renderMemberImageDropdown(taskId, i);
                renderSelectionStatusLayout(taskId, i);
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
function editContactListHTML(taskId, contactId) {
    let contact = loaded_contacts[contactId].name;
    return `
        <div onclick="changeSelectionStatus(${taskId}, ${contactId})" id="dropdown_contact${taskId}${contactId}" class="dropdown_contact_row">
            
            <!-- circle & name -->
            <div class="dropdown_contact_image_name">
                <div id="character_image${taskId}${contactId}"></div>
                <div class="dropdownNames">${contact.firstName} ${contact.secondName}</div>
            </div> 

            <!-- checkbox -->
            <div class="checkbox_edit">
                <a id="checkbox_edit${taskId}${contactId}">
                    
                </a>
            </div>
        </div>
    `;
}
// deleteContactFromTask('${contact.firstName}', '${contact.secondName}', ${taskId})
// onclick="deleteContactFromTask('${contact.firstName}', '${contact.secondName}', ${taskId})"

function renderSelectionStatusLayout(taskId, contactId) {
    let contact = loaded_contacts[contactId].name;
    let selectedContactStatus = checkContactSelected(`${contact.firstName}`, `${contact.secondName}`)
    if (selectedContactStatus == true) {
        setListContactOnSelect(taskId, contactId)
    } else {
        setListContactNotSelect(taskId, contactId)
    } 
}

function setListContactOnSelect(taskId, contactId) {
    let container_checkbox = document.getElementById(`checkbox_edit${taskId}${contactId}`);
    let cicle = document.getElementById(`selected_task_member${taskId}${contactId}`);
    let container_dropdown_contact = document.getElementById(`dropdown_contact${taskId}${contactId}`);
    container_checkbox.innerHTML = `<img src="assets/img/check_button_checked_white.svg">`;
    container_dropdown_contact.classList.toggle('contactOfTask');
    cicle.style.border = 'solid 3px white';
}

function setListContactNotSelect(taskId, contactId) {
    let container_checkbox = document.getElementById(`checkbox_edit${taskId}${contactId}`);
    let cicle = document.getElementById(`selected_task_member${taskId}${contactId}`);
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
function checkContactSelected(firstName, secondName) {
    for (let i = 0; i < currentTaskContent.contacts.length; i++) {
        let contact = currentTaskContent.contacts[i];
        if (firstName == contact.firstName && secondName == contact.secondName) {
            return true
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
function checkContactIndex(firstName, secondName) {
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
function renderMemberImageDropdown(taskId, contactId) {
    let container = document.getElementById(`character_image${taskId}${contactId}`);
    let firstCharacter = loaded_contacts[contactId].name.firstName.charAt(0);
    let secondCharacter = loaded_contacts[contactId].name.secondName.charAt(0);
    container.innerHTML = dropdownContactHTML(firstCharacter, secondCharacter, taskId, contactId);   
    setcicleColor(taskId, contactId);
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
function dropdownContactHTML(firstCharacter, secondCharacter, taskId, contactId) {
    return `
        <div id="selected_task_member${taskId}${contactId}" class="selected_member_cicle">${firstCharacter}${secondCharacter}</div>
    `;
}

/**
 * Set the color of contact cicle-image.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} contactId - Index of Contact in loaded_contacts array
 */
function setcicleColor(taskId, contactId) {
    let cicle = document.getElementById(`selected_task_member${taskId}${contactId}`);
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
function changeSelectionStatus(taskId, contactId) {
    let contact = loaded_contacts[contactId].name;
    let firstName = contact.firstName;
    let secondName = contact.secondName;
    let color = contact.color;
    let selectedContactStatus = checkContactSelected(`${firstName}`, `${secondName}`)
    if (selectedContactStatus == true) {
        deleteContactFromTask(firstName, secondName, taskId)
    } else {
        selectContactforTask(taskId, firstName, secondName, color)
    } 
}

/**
 * Delete the Contact which is not more selected for the task.
 * 
 * @param {String} firstName - first name of the Contact which is selected
 * @param {String} secondName - second name of the Contact which is selected
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
function deleteContactFromTask(firstName, secondName, taskId) {
    let index_of_deleted_name = checkContactIndex(firstName, secondName);
    currentTaskContent.contacts.splice(index_of_deleted_name, 1);
    showContactList(taskId);
}

/**
 * Add the Contact which is selected for the task to currentTaskContent.contacts.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 * @param {Number} contactId - Index of Contact in loaded_contacts array
 * @param {String} firstName - first name of the Contact which is selected
 * @param {String} secondName - second name of the Contact which is selected
 */
function selectContactforTask(taskId, firstName, secondName, color) {
    currentTaskContent.contacts.push(
        {
            "firstName": `${firstName}`,
            "secondName": `${secondName}`,
            "color": `${color}`
        },
    );
    showContactList(taskId);
}

/**
 * Finds out which color-class is to choose, because the key: color of contacts[] is hex and the key: color of tasks[].contacts is a class-name.
 * 
 * @param {Number} contactId - Index of Contact in loaded_contacts array
 * @returns {String} Name of Class with the right color Attribute
 */
// function findOutColorClass(contactId) {
//     let contact = loaded_contacts[contactId].name;
//     let firstName = contact.firstName;
//     let secondName = contact.secondName;
//     if (firstName == "Anton" && secondName == "Mayer") {
//         return "orange"
//     } else if (firstName == "Emmanuel" && secondName == "Mauer") {
//         return "turquoise"
//     } else if (firstName == "Marcel" && secondName == "Bauer") {
//         return "darkslateblue"
//     } else if (firstName == "David" && secondName == "Eisenberg") {
//         return "violet"
//     } else if (firstName == "Benedikt" && secondName == "Ziegler") {
//         return "mediumslateblue"
//     } else if (firstName == "Anja" && secondName == "Schulz") {
//         return "blueviolet"
//     } else if (firstName == "Eva" && secondName == "Fischer") {
//         return "yellow"
//     } else if (firstName == "Tatjana" && secondName == "Wolf") {
//         return "red"
//     } else if (firstName == "Sofia" && secondName == "Müller") {
//         return "deepskyblue"
//     }
// }

