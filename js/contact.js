let person = [];

async function init() {
    let resp = await fetch('assets/json/contacts.json');
    person = await resp.json();
    console.log(person);
    for (let i = 0; i < person.length; i++) {
        person[i].phone = "+49 1111 111 11 1";
    }
    
    loadContacts();
}

function loadContacts() {
    let content = document.getElementById('person');
    let contactList = '';
    let displayedLetters = [];

    for (let i = 0; i < person.length; i++) {
        const currentPerson = person[i];
        if (currentPerson.name && currentPerson.name.firstName && currentPerson.name.secondName) {
            let firstLetter = currentPerson.name.firstName.charAt(0).toUpperCase();
            let secondLetter = currentPerson.name.secondName.charAt(0).toUpperCase();
            if (!displayedLetters.includes(firstLetter)) {
                displayedLetters.push(firstLetter);
                contactList += `<div class="first_letter"><h3>${firstLetter}</h3></div>`;
            }
            contactList += `<div onclick="changeBackground(this);selectPerson(${i})" id="persons_details" class="persons_details">
                                <div class="persons" style="background-color: ${currentPerson.name.color};">${firstLetter}${secondLetter}</div>
                                <div class="person_details">${currentPerson.name.firstName} ${currentPerson.name.secondName}<br><div class="email">${currentPerson.mail}</div></div>
                           </div>`;
        }
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
            <div class="button_contacts">
                <button onclick="editPerson(${index})"><img src="./assets/img/edit.png"><h3>Edit</h3></button>
                <button onclick="deletePerson(${index})"><img src="./assets/img/delete.png"><h3>Delete</h3></button>
            </div>
            </div>
        </div>
        <div class="info">
            <h3>Contact Information</h3>
            <h4>Email</h4>
            <div class="emails">${selectedPerson.mail}</div>
            <h4>Phone</h4>
            <p>${selectedPerson.phone}</p>
        `;
    document.getElementById('selectedPersonIndex').value = index;
    document.getElementById('selectedPersonInitials').innerHTML = `<div class="persons" style="background-color: ${selectedPerson.name.color};">${selectedPerson.name.firstName.charAt(0).toUpperCase()}${selectedPerson.name.secondName.charAt(0).toUpperCase()}</div>`;
    
    selectedPersonElement.classList.remove('active');
    setTimeout(function() {
        selectedPersonElement.classList.add('active');
    }, 300); 
}



function openDialog() {
    let dialog = document.getElementById('dialog');
    dialog.classList.remove('close');
    dialog.classList.add('open');
}

function closeDialog() {
    let dialog = document.getElementById('dialog');
    dialog.classList.add('close');

    document.getElementById('input_name').value = "";
    document.getElementById('input_email').value = "";
    document.getElementById('input_phone').value = "";

}
function changeBackground(element) {
    element.parentElement.querySelectorAll('.persons_details').forEach(function (el) {
        el.classList.remove('active');
    });
    element.classList.add('active');
    setTimeout(function () {
        element.classList.add('active');
    }, 100);
}
function deletePerson(index) {
    person.splice(index, 1);
    const selectedPersonElement = document.getElementById('selectedPerson');
    selectedPersonElement.innerHTML = '';
    closeDialog();
    loadContacts();
    
}
function closePerson() {
    let editPersons = document.getElementById('editPersons');
    editPersons.classList.add('close');
}
function editPerson(index) {
    let selectedPerson = person[index];
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');

    nameInput.value = `${selectedPerson.name.firstName} ${selectedPerson.name.secondName}`;
    emailInput.value = selectedPerson.mail;
    phoneInput.value = selectedPerson.phone; 

    let editPersons = document.getElementById('editPersons');
    editPersons.classList.remove('close');
    editPersons.classList.add('open');
}

function createContact() {
    let nameInput = document.getElementById('input_name').value;
    let emailInput = document.getElementById('input_email').value;
    let phoneInput = document.getElementById('input_phone').value;

    console.log("Name:", nameInput);
    console.log("Email:", emailInput);
    console.log("Phone:", phoneInput);

    if (nameInput && emailInput && phoneInput) {
        let [firstName, secondName] = nameInput.split(' ');

        let fixedColor = "rgba(255, 199, 0, 1)";

        let newContact = {
            "name": {
                "firstName": firstName,
                "secondName": secondName,
                "color": fixedColor
            },
            "mail": emailInput,
            "phone": phoneInput
        };

        person.push(newContact);

        person.sort(function(a, b) {
            let nameA = (a.name.firstName + ' ' + a.name.secondName).toUpperCase();
            let nameB = (b.name.firstName + ' ' + b.name.secondName).toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        loadContacts();

        closeDialog();

        let newIndex = person.findIndex(p => p.name.firstName === firstName && p.name.secondName === secondName);


        if (newIndex !== -1) {
            selectPerson(newIndex);
            setTimeout(function() {
                document.querySelector('.success').classList.add('active');
            }, 100);
            setTimeout(function() {
                document.querySelector('.success').classList.remove('active');
            }, 1800);
        }
    }
}





function saveChanges() {
    let selectedPersonIndex = parseInt(document.getElementById('selectedPersonIndex').value);
    let selectedPerson = person[selectedPersonIndex];
    let nameInput = document.getElementById('name').value;
    let emailInput = document.getElementById('email').value;
    let phoneInput = document.getElementById('phone').value;

    
    if (nameInput && emailInput) {
        let [firstName, secondName] = nameInput.split(' ');

    
        selectedPerson.name.firstName = firstName;
        selectedPerson.name.secondName = secondName;
        selectedPerson.mail = emailInput;
        selectedPerson.phone = phoneInput;

    
        loadContacts();

  
        closePerson();
    }
}

