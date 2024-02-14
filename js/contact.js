let person = [
    {
        "name": {
            "firstName": "Anton",
            "secondName": "Meyer"
        },
        "mail": "anton@gmail.com"
    },
    {
        "name": {
            "firstName": "Anja",
            "secondName": "Schulz"
        },
        "mail": "schulz@hotmail.de"
    },
    {
        "name": {
            "firstName": "Benedikt",
            "secondName": "Ziegler"
        },
        "mail": "benedikt@gmail.com"
    },
    {
        "name": {
            "firstName": "David",
            "secondName": "Eisenberg"
        },
        "mail": "davidberg@gmail.com"
    },
    {
        "name": {
            "firstName": "Eva",
            "secondName": "Fischer"
        },
        "mail":"eva@gmail.com"
    },
    {
        "name": {
            "firstName": "Emmanuel",
            "secondName": "Mauer"
        },
        "mail":"emmanuelma@gmail.com"
    },
    {
        "name": {
            "firstName": "Marcel",
            "secondName": "Bauer"
        },
        "mail":"bauer@gmail.com"
    },
]

function loadContacts(){
    let content = document.getElementById('person');
    let contactList = '';
    let displayedLetters = [];

    for (let i = 0; i < person.length; i++) {
        const persons = person[i];
        let firstLetter = persons.name.firstName.charAt(0).toUpperCase();
        let secondLetter = persons.name.secondName.charAt(0).toUpperCase();
        let randomColor = getRandomColor();
        if (!displayedLetters.includes(firstLetter)) {
            displayedLetters.push(firstLetter);
            contactList += `<div class="first_letter"><h3>${firstLetter}</h3></div>`;
        }
        contactList += `<div class="persons_details">
                            <div class="persons" <div style="background-color: ${randomColor};"> ${firstLetter}${secondLetter} </div>
                            <div class="person_details">${persons.name.firstName} ${persons.name.secondName}<br><div class = "email">${persons.mail}</div></div>
                       </div>`;
    }
    content.innerHTML = contactList;
}

loadContacts();
function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}