let person = [];

async function init() {
    await getContactsFromServer();
    await setUserInitialsAtHeader();
    person = contacts_global;
    loadContacts();
    await getCurrentUserIdFromServer();
    if (currentUserId !== 999) {
        await setYou_contacts();
    }
}

async function loadContacts() {
    let content = document.getElementById('person');
    let contactList = '';
    let displayedLetters = [];

    for (let i = 0; i < person.length; i++) {
        let currentPerson = person[i];
        if (currentPerson.name && currentPerson.name.firstName) {
            let firstLetter = currentPerson.name.firstName.charAt(0).toUpperCase();
            if (!currentPerson.name.secondName) {
                let secondLetter = '';
                if (!displayedLetters.includes(firstLetter)) {
                    displayedLetters.push(firstLetter);
                    contactList += `<div class="first_letter"><h3>${firstLetter}</h3></div>`;
                }
                contactList += contactHTML(i, currentPerson, firstLetter, secondLetter);
            } else {
                let secondLetter = currentPerson.name.secondName.charAt(0).toUpperCase();
                if (!displayedLetters.includes(firstLetter)) {
                    displayedLetters.push(firstLetter);
                    contactList += `<div class="first_letter"><h3>${firstLetter}</h3></div>`;
                }
                contactList += contactHTML(i, currentPerson, firstLetter, secondLetter);
            }
        }
    }
    content.innerHTML = contactList;
}

function contactHTML(i, currentPerson, firstLetter, secondLetter) {
    let secondName = currentPerson.name.secondName;
    if (typeof secondName == 'undefined') {
        secondName = ''
    }
    return `
        <div onclick="changeBackground(this);selectPerson(${i}); handleClick(${i})" id="persons_details" class="persons_details">
            <div class="persons" style="background-color: ${currentPerson.name.color};">${firstLetter}${secondLetter}</div>
            <div class="person_details">${currentPerson.name.firstName} ${secondName} <span class="you" id="youContactList${i}"></span><br><div class="email">${currentPerson.mail}</div></div>
        </div>
    `;
}

async function setYou_contacts() {
    await getCurrentUserIdFromServer();
    if (person[currentUserId].name.firstName == currentUser.name.firstName && person[currentUserId].name.secondName == currentUser.name.secondName) {
        let you = document.getElementById(`youContactList${currentUserId}`);
        you.innerHTML = "(You)";
    };
}

function selectPerson(index) {
    let selectedPerson = person[index];
    let selectedPersonElement = document.getElementById('selectedPerson');
    selectedPersonElement.innerHTML = selectPersonHTML(selectedPerson, index);
    document.getElementById('selectedPersonIndex').value = index;
    document.getElementById('selectedPersonInitials').innerHTML = `<div class="persons" style="background-color: ${selectedPerson.name.color};">${selectedPerson.name.firstName.charAt(0).toUpperCase()}${selectedPerson.name.secondName.charAt(0).toUpperCase()}</div>`;
    selectedPersonElement.classList.remove('active');
    setTimeout(function () {
        selectedPersonElement.classList.add('active');
    }, 300);
}

function selectPersonHTML(selectedPerson, index) {
    return `
    <div class="persons_details">
    <div class="persons" style="background-color: ${selectedPerson.name.color};">${selectedPerson.name.firstName.charAt(0).toUpperCase()}${selectedPerson.name.secondName.charAt(0).toUpperCase()}</div>
    <div class="person_details">${selectedPerson.name.firstName} ${selectedPerson.name.secondName}
    <div onclick="openWindow()" class="button_contacts">
    <div id="editDeleteWindow" class="edit_delete_window">
    <a onclick="editPerson(${index})">
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
        </svg>
    Edit</a>
    <a onclick="deletePerson(${index})">
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
        </svg>
    Delete</a>
    </div>
        <div class="display_flex edit_delete_text">
        <a onclick="editPerson(${index})">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
        </svg>
        <div>Edit</div>          
        </div>
        </a>
        <div class="display_flex edit_delete_text">
        <a onclick="deletePerson(${index})">
        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
        </svg>
        <div>Delete</div>          
        </div>
        </a>
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


function openWindow() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1000) {
        var editDeleteWindow = document.getElementById("editDeleteWindow");
        if (editDeleteWindow) {
            editDeleteWindow.classList.add("active");
        }
    }
}


function handleClick() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1000) {
        document.querySelector('.display_flex').style.display = 'flex';
        document.querySelector('.contacts').style.display = 'none';
    } else {
        document.querySelector('.display_flex').style.display = 'flex';
        document.querySelector('.contacts').style.display = 'unset';
    }
}
window.onload = handleClick;
window.onresize = handleClick;

function updateDisplay() {
    const screenWidth = window.innerWidth;
    const displayFlex = document.querySelector('.display_flex');
    const contacts = document.querySelector('.contacts');

    if (screenWidth <= 1000) {
        displayFlex.style.display = 'none';
        contacts.style.display = 'flex';
    } else {
        displayFlex.style.display = 'flex';
        contacts.style.display = 'unset';
    }
}
window.onload = function () {
    updateDisplay();
};
window.onresize = updateDisplay;


function changeBackground(element) {
    element.parentElement.querySelectorAll('.persons_details').forEach(function (el) {
        el.classList.remove('active');
    });
    element.classList.add('active');
    setTimeout(function () {
        element.classList.add('active');
    }, 100);
}
async function deletePerson() {
    let index = parseInt(document.getElementById('selectedPersonIndex').value);
    if (isNaN(index)) {
        return;
    }
    person.splice(index, 1);
    closeDialog(); 
    loadContacts(); 
    await setContactsToServer(); 
    await getContactsFromServer(); 
    if (person.length > 0) {
        let newIndex = Math.min(index, person.length - 1);
        selectPerson(newIndex);
    } else {
        document.getElementById('selectedPerson').innerHTML = '';
    }
    backMobile();
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

async function createContact(event) {
    event.preventDefault();
    var isValid = validateNames();
    if (!isValid) {
        return;
    }
    let nameInput = document.getElementById('input_name').value;
    let emailInput = document.getElementById('input_email').value;
    let phoneInput = document.getElementById('input_phone').value;

    if (nameInput && emailInput && phoneInput) {
        let [firstName, secondName] = nameInput.split(' ');
        if (typeof secondName == 'undefined') {
            secondName = '';
        }
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
        sortPerson();
        await setContactsToServer();
        await getContactsFromServer();
        loadContacts();
        closeDialog();
        let newIndex = person.findIndex(p => p.name.firstName === firstName && p.name.secondName === secondName);
        if (newIndex !== -1) {
            selectPerson(newIndex);
            setTimeout(function () {
                document.querySelector('.success').classList.add('active');
            }, 100);
            setTimeout(function () {
                document.querySelector('.success').classList.remove('active');
            }, 1800);
        }
        handleClick();
    }
}

function sortPerson() {
    person.sort(function (a, b) {
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
}


async function saveChanges() {
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

        sortPerson();

        let updatedIndex = person.findIndex(p => p.name.firstName === firstName && p.name.secondName === secondName);

        await setContactsToServer();
        await getContactsFromServer();

        loadContacts();

        closePerson();

        if (updatedIndex !== -1) {
            selectPerson(updatedIndex);
        }
    }
}

function validateNames() {
    let nameInput = document.getElementById('input_name').value.trim();
    if (nameInput.indexOf(' ') === -1) {
        let errorMessage = document.getElementById('error_message');
        errorMessage.innerText = "Please enter a first and last name.";
        errorMessage.style.display = 'block';
        document.getElementById('input_name').style.borderColor = 'red';
        return false;
    } else {
        document.getElementById('input_name').style.borderColor = '';
        document.getElementById('error_message').style.display = 'none';
        return true;
    }
}

function validatePhone(input) {
    input.value = input.value.replace(/\D/g, '');
    if (!/^\d+$/.test(input.value)) {
        document.getElementById('phoneError').style.display = 'inline';
        input.setCustomValidity('Please enter only numbers.');
    } else {
        document.getElementById('phoneError').style.display = 'none';
        input.setCustomValidity('');
    }
}

function validateEmail(input) {
    var email = input.value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|de|domain)?$/;
    var errorId = input.id === 'email' ? 'emailError1' : 'emailError2';
    var errorMessage = document.getElementById(errorId);
    if (!emailPattern.test(email)) {
        errorMessage.style.display = 'inline';
    } else {
        errorMessage.style.display = 'none';
    }
}