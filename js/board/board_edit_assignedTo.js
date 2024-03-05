let loaded_contacts =[];
let dropdownStatus = false;
let contactsOfCurrentTask = [];


// is called by function renderEditDialog() in board_edit.js file
// set the main HTML structure
async function renderAssigedToEditDialog(taskId){
    await loadContacts();
    contactsOfCurrentTask = currentTaskContent.contacts;
    let container = document.getElementById('assignedTo_section_edit');
    container.innerHTML = assigedToEditHTML(taskId);
    renderCiclesOfTaskContacts(taskId);
}

// load contacts JSON in loaded_contacts array (global array in board_edit_assignedTo.js file)
async function loadContacts() {
    let source_contacts = await fetch('assets/json/contacts.json'); 
    source_contacts = await source_contacts.json(); 
    loaded_contacts = source_contacts;
}

// HTML main structure of assiged to section in edit dialog
function assigedToEditHTML(taskId) {
    return `
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
        <a class="dopdown_img_inactive" id="dropdown_arrow" onclick="rotateArrow(${taskId})">
            <img src="assets/img/arrowDropDown.svg">
        </a>
    </div>

    <!-- list of contacts for selection to current task -->
    <div id="selectedContactsSection" class="selectedContacts">

    </div>
    `;
}

// render the cicles with initials of selected task members
function renderCiclesOfTaskContacts(taskId) {
    let container = document.getElementById(`selectedContactsSection`);
    container.innerHTML = '';
    for (let i = 0; i < contactsOfCurrentTask.length; i++) {
        let contact = contactsOfCurrentTask[i];
        let firstCharacter = contact.firstName.charAt(0);
        let secondCharacter = contact.secondName.charAt(0);
        let colorClass = contact.color;
        container.innerHTML += selectedTaskMemberHTML(firstCharacter, secondCharacter, colorClass, taskId, i); 
    }
}

// HTML of cicles 
function selectedTaskMemberHTML(firstCharacter, secondCharacter, colorClass, task_number, i) {
    return `
        <div id="selected_task_member${task_number}${i}" class="selected_member_cicle ${colorClass}">${firstCharacter}${secondCharacter}</div>
    `;
}

// called by onclick triangle in selection field
// change the triangle image, Content of dropdown selection section and the content of underneath section
function rotateArrow(taskId) {
    let arrow_section = document.getElementById('dropdown_arrow')

    // false define that the dropdown list is actually not rendered
    if (dropdownStatus == false){
        arrow_section.style.rotate = '200grad';
        showContactList(taskId);
        changeTextInInput();
        document.getElementById('selectedContactsSection').classList.add('flexDirection');
        dropdownStatus = true;
    } 

    // true define that the dropdown list is actually rendered
    else {
        arrow_section.style.rotate = '0grad';
        renderCiclesOfTaskContacts(taskId);
        changeTextInInput()
        document.getElementById('selectedContactsSection').classList.remove('flexDirection');
        dropdownStatus = false;
    }
    
}

// change Content of dropdown selection section
function changeTextInInput() {
    let text = document.getElementById('dropdown_text');
    let input = document.getElementById('dropdown_input');
    text.classList.toggle('d-none')
    input.classList.toggle('d-none')
}

// on key up in search input render dropdown contact list depending on input value
function searchContacts(taskId) {
    let searchinput = document.getElementById('search_contacts_edit').value;
    searchinput = searchinput.toLowerCase();
    showContactList(taskId, searchinput);
    // document.getElementById('selectedContactsSection').classList.toggle('flexDirection');
}

// show all contacts or searched contacts
function showContactList(taskId, searchValue) {
    let container = document.getElementById('selectedContactsSection');
    container.innerHTML = '';
    for (let i = 0; i < loaded_contacts.length; i++) {
        if (!searchValue || loaded_contacts[i].name.firstName.toLowerCase().includes(searchValue) || loaded_contacts[i].name.secondName.toLowerCase().includes(searchValue)) {
        container.innerHTML += editContactListHTML(taskId, i);
        // circle & checkbox are separate rendered
        renderMemberImageDropdown(taskId, i);
        renderCheckBoxEdit(taskId, i);
        }
    }
    // container.classList.toggle('flexDirection');
    container.style.gap = '0px';
}

// HTML main structure of contact list
function editContactListHTML(taskId, contactId) {
    let contact = loaded_contacts[contactId].name;
    return `
        <div onclick="deleteContactFromTask('${contact.firstName}', '${contact.secondName}', ${taskId})" id="dropdown_contact${taskId}${contactId}" class="dropdown_contact_row">
            <div class="dropdown_contact_image_name">
                <div id="character_image${taskId}${contactId}"></div>
                <div class="dropdownNames">${contact.firstName} ${contact.secondName}</div>
            </div> 
            <div class="checkbox_edit">
                <a id="checkbox_edit${taskId}${contactId}" onclick="deleteContactFromTask('${contact.firstName}', '${contact.secondName}', ${taskId})">
                    
                </a>
            </div>
        </div>
    `;
}

// is called by interation all contacts to decide whether the checkbox is checked or not by proof the selectedContactStatus.
// the selectedContactStatus is true if the checkContactSelected function finds out that the name is in the contactsOfCurrentTask array as well as in the loaded contacts array
function renderCheckBoxEdit(taskId, contactId) {
    let container_checkbox = document.getElementById(`checkbox_edit${taskId}${contactId}`);
    let container_dropdown_contact = document.getElementById(`dropdown_contact${taskId}${contactId}`);
    let contact = loaded_contacts[contactId].name;
    let selectedContactStatus = checkContactSelected(`${contact.firstName}`, `${contact.secondName}`)
    let cicle = document.getElementById(`selected_task_member${taskId}${contactId}`);

    if (selectedContactStatus == true) {
        container_checkbox.innerHTML = `<img src="assets/img/check_button_checked_white.svg">`;
        container_dropdown_contact.classList.toggle('contactOfTask');
        cicle.style.border = 'solid 3px white';
    } else {
        container_checkbox.innerHTML = `<img onclick="" src="assets/img/check_button_unchecked.svg">`;
        // container_checkbox.setAttribute('onclick', `selectContactforTask(${taskId}, ${contactId})`);
        container_dropdown_contact.setAttribute('onclick', `selectContactforTask(${taskId}, ${contactId})`)
    } 
}

// find out whether the contact is selected
// is called by renderCheckBoxEdit()
// compares the names of the global array "contactsOfCurrentTask" with the hole contactlist of the program
function checkContactSelected(firstName, secondName) {
    for (let i = 0; i < contactsOfCurrentTask.length; i++) {
        let contact = contactsOfCurrentTask[i];
        if (firstName == contact.firstName && secondName == contact.secondName) {
            return true
        }
    }
}

// set the HTML of contacts
// is called by showContactList()
function renderMemberImageDropdown(taskId, contactId) {
    let container = document.getElementById(`character_image${taskId}${contactId}`);
    let firstCharacter = loaded_contacts[contactId].name.firstName.charAt(0);
    let secondCharacter = loaded_contacts[contactId].name.secondName.charAt(0);
    container.innerHTML = dropdownContactHTML(firstCharacter, secondCharacter, taskId, contactId);   
    setcicleColor(taskId, contactId);
}

// HTML structure of circle of contact image
// is called by renderMemberImageDropdown()
function dropdownContactHTML(firstCharacter, secondCharacter, taskId, contactId) {
    return `
        <div id="selected_task_member${taskId}${contactId}" class="selected_member_cicle">${firstCharacter}${secondCharacter}</div>
    `;
}

// set the color of contact image
// is called by renderMemberImageDropdown()
function setcicleColor(taskId, contactId) {
    let cicle = document.getElementById(`selected_task_member${taskId}${contactId}`);
    let color = loaded_contacts[contactId].name.color;
    cicle.style.backgroundColor = `${color}`;
}

// is called by onclick in editContactListHTML() 
// delete Contact in contactsOfCurrentTask array
function deleteContactFromTask(firstName, secondName, taskId) {
    let index_of_deleted_name = findDeleteNameInArray(firstName, secondName);
    contactsOfCurrentTask.splice(index_of_deleted_name, 1);
    showContactList(taskId);
    // document.getElementById('selectedContactsSection').classList.toggle('flexDirection');
}

// find out the index of the contact in the array contactsOfCurrentTask to delete the right position by comparing the names of the global array "contactsOfCurrentTask" with the hole contactlist of the program
// is called by deleteContactFromTask()
function findDeleteNameInArray(firstName, secondName) {
    let index;
    for (let i = 0; i < contactsOfCurrentTask.length; i++) {
        let contact = contactsOfCurrentTask[i];
        if (contact.firstName == firstName && contact.secondName == secondName) {
            index = i;
        }
    }
    return index;
}

// is called onclick of unckecked checkbox in contactlist
// add contact to contactsOfCurrentTask array
function selectContactforTask(taskId, contactId) {
    let contact = loaded_contacts[contactId].name;
    let firstName = contact.firstName;
    let secondName = contact.secondName;
    let color = findOutColorClass(contactId);
    contactsOfCurrentTask.push(
        {
            "firstName": `${firstName}`,
            "secondName": `${secondName}`,
            "color": `${color}`
        },
    );
    showContactList(taskId);
    // document.getElementById('selectedContactsSection').classList.toggle('flexDirection');
}

// find out which color-class is to choose, because the key color of contacts is hex and the key color of tasks is a class-name
function findOutColorClass(contactId) {
    let contact = loaded_contacts[contactId].name;
    let firstName = contact.firstName;
    let secondName = contact.secondName;
    if (firstName == "Anton" && secondName == "Mayer") {
        return "orange"
    } else if (firstName == "Emmanuel" && secondName == "Mauer") {
        return "turquoise"
    } else if (firstName == "Marcel" && secondName == "Bauer") {
        return "darkslateblue"
    } else if (firstName == "David" && secondName == "Eisenberg") {
        return "violet"
    } else if (firstName == "Benedict" && secondName == "Ziegler") {
        return "mediumslateblue"
    } else if (firstName == "Anja" && secondName == "Schulz") {
        return "blueviolet"
    } else if (firstName == "Eva" && secondName == "Fischer") {
        return "yellow"
    } else if (firstName == "Tatjana" && secondName == "Wolf") {
        return "red"
    } else if (firstName == "Sofia" && secondName == "Müller") {
        return "deepskyblue"
    }
}

