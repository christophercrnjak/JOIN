let person = [];

async function init() {
    let resp = await fetch('assets/json/contacts.json');
    person = await resp.json();
    console.log(person);
    loadContacts();
}

function loadContacts() {
    let content = document.getElementById('person');
    let contactList = '';
    let displayedLetters = [];

    for (let i = 0; i < person.length; i++) {
        const persons = person[i];
        let firstLetter = persons.name.firstName.charAt(0).toUpperCase();
        let secondLetter = persons.name.secondName.charAt(0).toUpperCase();
        if (!displayedLetters.includes(firstLetter)) {
            displayedLetters.push(firstLetter);
            contactList += `<div class="first_letter"><h3>${firstLetter}</h3></div>`;
        }
        contactList += `<div onclick="changeBackground(this);selectPerson(${i})" id="persons_details" class="persons_details">
                            <div class="persons" style="background-color: ${persons.name.color};"> ${firstLetter}${secondLetter} </div>
                            <div class="person_details">${persons.name.firstName} ${persons.name.secondName}<br><div class = "email">${persons.mail}</div></div>
                       </div>`;
    }
    content.innerHTML = contactList;
}

function selectPerson(index) {
    const selectedPerson = person[index];
    const selectedPersonElement = document.getElementById('selectedPerson');
    selectedPersonElement.innerHTML = `
                                        <div class="persons_details">
                                            <div class="persons" style="background-color: ${selectedPerson.name.color};">${selectedPerson.name.firstName.charAt(0).toUpperCase()}${selectedPerson.name.secondName.charAt(0).toUpperCase()}</div>
                                            <div class="person_details">${selectedPerson.name.firstName} ${selectedPerson.name.secondName}
                                            <div class = "button_contacts"><button><img src= "./assets/img/edit.png"><h3>Edit</h3></button><button onclick="deletePerson(${index})"><img src= "./assets/img/delete.png"><h3>Delete</h3></button></div></div>
                                            </div>
                                            <div class = "info">
                                            <h3>Contact Information</h3>
                                            <h4>Email</h4>
                                            <div class="emails">${selectedPerson.mail}</div>
                                            <h4>Phone</h4>
                                            <p>+49 1111 111 11 1</p>


                                        `;
}


function openDialog() {
    let dialog = document.getElementById('dialog');
    dialog.classList.remove('close');
    dialog.classList.add('open');
}

function closeDialog() {
    let dialog = document.getElementById('dialog');
    dialog.classList.add('close');

}
function changeBackground(element) {
    element.parentElement.querySelectorAll('.persons_details').forEach(function(el) {
        el.classList.remove('active');
    });
    element.classList.add('active');
    setTimeout(function() {
        element.classList.add('active');
    }, 100);
}
function deletePerson(index) {
    person.splice(index, 1);
    const selectedPersonElement = document.getElementById('selectedPerson');
    selectedPersonElement.innerHTML = '';
    loadContacts(); 
}
