let person = [];

async function init() {
    let resp = await fetch('assets/json/contacts.json'); 
    person = await resp.json();
    console.log(person);
    loadContacts();
}

function loadContacts(){
    let content = document.getElementById('person');
    let contactList = '';
    let displayedLetters = [];

    for (let i = 0; i < person.length; i++) { // Iterieren Sie über 'person' statt 'tasks'
        const persons = person[i];
        let firstLetter = persons.name.firstName.charAt(0).toUpperCase();
        let secondLetter = persons.name.secondName.charAt(0).toUpperCase();
        if (!displayedLetters.includes(firstLetter)) {
            displayedLetters.push(firstLetter);
            contactList += `<div class="first_letter"><h3>${firstLetter}</h3></div>`;
        }
        contactList += `<div class="persons_details">
                            <div class="persons" style="background-color: ${persons.name.color};"> ${firstLetter}${secondLetter} </div>
                            <div class="person_details">${persons.name.firstName} ${persons.name.secondName}<br><div class = "email">${persons.mail}</div></div>
                       </div>`;
    }
    content.innerHTML = contactList;
}