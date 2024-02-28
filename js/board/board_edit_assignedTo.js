let contacts =[];
let dropdownStatus = false;
let contactsOfCurrentTask = [];

async function renderAssigedToEditDialog(taskId){
    await loadContacts();
    contactsOfCurrentTask = tasks[taskId].contacts;
    let container = document.getElementById('assignedTo_section_edit');
    container.innerHTML = assigedToEditHTML(taskId);
    renderSelectedContacts(taskId);

}

function assigedToEditHTML(taskId) {
    return `
    <div class="header_text_edit_section">Assiged to</div>
    <div id="dropdown_main" class="dropdown">

        <div id="dropdown_text" class="dropdown_text"> 
            Select contacts to assign
        </div>

        <div id="dropdown_input" class="d-none"> 
            <input onkeyup="searchContacts(${taskId})" id="search_contacts_edit" type="text">
        </div>

        <a class="dopdown_img_inactive" id="dropdown_arrow" onclick="rotateArrow(${taskId})">
            <img src="assets/img/arrowDropDown.svg">
        </a>
    </div>
    <div id="selectedContactsSection" class="selectedContacts">

    </div>
    `;
}


async function loadContacts() {
    let resp = await fetch('assets/json/contacts.json'); 
    contacts = await resp.json(); 
    console.log(contacts);
}

function renderSelectedContacts(taskId) {
    let container = document.getElementById(`selectedContactsSection`);
    container.innerHTML = '';
    for (let i = 0; i < contactsOfCurrentTask.length; i++) {
        let contact = contactsOfCurrentTask[i];
        let firstCharacter = contact.firstName.charAt(0);
        let secondCharacter = contact.secondName.charAt(0);
        let colorClass = contact.color;
        container.innerHTML += selectedTaskMemberHTML(firstCharacter, secondCharacter, colorClass, taskId, i); 
        console.log(contactsOfCurrentTask); 
    }
}

function selectedTaskMemberHTML(firstCharacter, secondCharacter, colorClass, task_number, i) {
    return `
        <div id="selected_task_member${task_number}${i}" class="selected_member_cicle ${colorClass}">${firstCharacter}${secondCharacter}</div>
    `;
}


function rotateArrow(taskId) {
    let arrow_section = document.getElementById('dropdown_arrow')
    if (dropdownStatus == false){
        arrow_section.style.rotate = '200grad';
        
        showContactList(taskId);
        changeTextInInput();
        document.getElementById('selectedContactsSection').classList.add('flexDirection');
        dropdownStatus = true;
    } else {
        arrow_section.style.rotate = '0grad';
        renderSelectedContacts(taskId);
        document.getElementById('selectedContactsSection').classList.remove('flexDirection');
        dropdownStatus = false;
    }
    
}

function changeTextInInput() {
    let text = document.getElementById('dropdown_text');
    let input = document.getElementById('dropdown_input');
    text.classList.toggle('d-none')
    input.classList.toggle('d-none')
}

function searchContacts(taskId) {
    let searchinput = document.getElementById('search_contacts_edit').value;
    searchinput = searchinput.toLowerCase();
    showContactList(taskId, searchinput);
    document.getElementById('selectedContactsSection').classList.toggle('flexDirection');
}

function showContactList(taskId, searchValue) {
    let container = document.getElementById('selectedContactsSection');
    container.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        if (!searchValue || contacts[i].name.firstName.toLowerCase().includes(searchValue) || contacts[i].name.secondName.toLowerCase().includes(searchValue)) {
        container.innerHTML += editContactListHTML(taskId, i);
        renderMemberImageDropdown(taskId, i);
        renderCheckBoxEdit(taskId, i);
        }
    }
    container.classList.toggle('flexDirection');
    container.style.gap = '0px';
}

function editContactListHTML(taskId, contactId) {
    let contact = contacts[contactId].name;
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

// 
function renderCheckBoxEdit(taskId, contactId) {
    let container_checkbox = document.getElementById(`checkbox_edit${taskId}${contactId}`);
    let container_dropdown_contact = document.getElementById(`dropdown_contact${taskId}${contactId}`);
    let contact = contacts[contactId].name;
    let selectedContactStatus = checkContactSelected(`${contact.firstName}`, `${contact.secondName}`, taskId)
    let cicle = document.getElementById(`selected_task_member${taskId}${contactId}`);

    if (selectedContactStatus == true) {
        container_checkbox.innerHTML = `<img src="assets/img/check_button_checked_white.svg">`;
        container_dropdown_contact.classList.toggle('contactOfTask');
        cicle.style.border = 'solid 3px white';
    } else {
        container_checkbox.innerHTML = `<img onclick="" src="assets/img/check_button_unchecked.svg">`;
        container_checkbox.setAttribute('onclick', `selectContactforTask(${taskId}, ${contactId})`);
        container_dropdown_contact.setAttribute('onclick', `selectContactforTask(${taskId}, ${contactId})`)
    } 
}

function checkContactSelected(firstName, secondName, taskId) {
    
    for (let i = 0; i < contactsOfCurrentTask.length; i++) {
        let contact = contactsOfCurrentTask[i];
        if (firstName == contact.firstName && secondName == contact.secondName) {
            return true
        }
    }
}

function renderMemberImageDropdown(taskId, contactId) {
    let container = document.getElementById(`character_image${taskId}${contactId}`);
    let firstCharacter = contacts[contactId].name.firstName.charAt(0);
    let secondCharacter = contacts[contactId].name.secondName.charAt(0);
    container.innerHTML = dropdownContactHTML(firstCharacter, secondCharacter, taskId, contactId);   
    setcicleColor(taskId, contactId);
}

function dropdownContactHTML(firstCharacter, secondCharacter, taskId, contactId) {
    return `
        <div id="selected_task_member${taskId}${contactId}" class="selected_member_cicle">${firstCharacter}${secondCharacter}</div>
    `;
}

function setcicleColor(taskId, contactId) {
    let cicle = document.getElementById(`selected_task_member${taskId}${contactId}`);
    let color = contacts[contactId].name.color;
    cicle.style.backgroundColor = `${color}`;
    
}

function deleteContactFromTask(firstName, secondName, taskId) {
    let index_of_deleted_name = findDeleteNameInArray(firstName, secondName, taskId);
    contactsOfCurrentTask.splice(index_of_deleted_name, 1);
    showContactList(taskId);
    document.getElementById('selectedContactsSection').classList.toggle('flexDirection');
}

function findDeleteNameInArray(firstName, secondName, taskId) {
    let contacts = contactsOfCurrentTask;
    let index;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (contact.firstName == firstName && contact.secondName == secondName) {
            index = i;
        }
    }
    return index;
}

function selectContactforTask(taskId, contactId) {
    let contact = contacts[contactId].name;
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
    document.getElementById('selectedContactsSection').classList.toggle('flexDirection');
}

function findOutColorClass(contactId) {
    let contact = contacts[contactId].name;
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

// *** OK confirmation *** //

function confirmInputsOfEditDialog() {
    getInputValues();
}

function getInputValues() {
    let title = document.getElementById('edit_input_title').value;
    let description = document.getElementById('edit_input_description').value;
    let dueDate = document.getElementById('edit_input_dueDate').value;
    let priority = prioStatusEdit;
}