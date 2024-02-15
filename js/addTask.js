let contacts = [];



function addTaskInit () {
   // renderAssignedPerson();
    fatchContacts ();
   
}

function fatchContacts () {
    fetch('assets/json/contacts.json')
    .then(response => response.json())
    .then(names =>{
        for (let i = 0; i < names.length; i++) {
            let element = names[i];
            contacts.push(element);
            //console.log('Test text',element.name.firstName);
             
        }
        renderAssignedPerson();
    })
    
}
function renderAssignedPerson() {
    // Render Person form task
    let assigned = document.getElementById('assigned');
    
    assigned.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        assigned.innerHTML += addTaskContacts(contact);
    }
}

function dropdownToggle() {
    let dropdownContainer = document.getElementById('addTask_dropdown');

    if(dropdownContainer.style.display === 'none'){
        dropdownContainer.style.display = 'block';
    } else {
        dropdownContainer.style.display = 'none';
    }
    let addTask_dropdown = document.querySelector('addTask_dropdown');
    addTask_dropdown.style.height = addTask_dropdown.offsetHeight + 'px';
}

function addTaskBtn() {
    
}

function addTaskContacts(contact) {
return`
<option value="#">${contact.name.firstName} ${contact.name.secondName} <input type="checkbox" name="" id=""></option>
`
}
