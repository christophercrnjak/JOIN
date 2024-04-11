// This function loops through all elements in the document that have the attribute "w3-include-html",
// replacing the content of those elements with the content of an external HTML file
// specified in the "w3-include-html" attribute.
// If the file is successfully retrieved, its content is inserted into the respective element.
// If an error occurs (e.g., file not found), "Page not found." is displayed in the element.

async function includeHTML() {
  let includeElements = document.querySelectorAll("[template-src]");

  for (let element of includeElements) {
    let file = element.getAttribute("template-src");
    let response = await fetch(file);
    if (response.ok) {
      let text = await response.text();
      element.innerHTML = text;
    } else {
      element.innerHTML = "Page not found.";
    }
  }
  setActiveLink();
}
  
  function setActiveLink() {
   
    var url = window.location.href;
    
    var links = document.querySelectorAll('.side_navbar_section');
    links.forEach(function(link) {
        if (url.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

/**
 * Sets the innitials of logged account in the head navbar in the top right corner.
 * currentUser is an Array in storage.js.
 */
async function setUserInitialsAtHeader() {
  await getCurrentUserFromServer();
  let accountLogo = document.getElementById('navbarHeadIcon');
  if (currentUser.length === 0 || typeof currentUser == "undefined" || currentUser == '') {
    accountLogo.innerHTML = 'G';
  } else if (typeof currentUser.name.secondName == "undefined" || typeof currentUser.name.secondName == '') {
    let firstName = currentUser.name.firstName;
    firstName = firstName.charAt(0);
    accountLogo.innerHTML = `${firstName}`;
  } else {
    let firstName = currentUser.name.firstName;
    firstName = firstName.charAt(0);
    let secondName = currentUser.name.secondName;
    secondName = secondName.charAt(0);
    accountLogo.innerHTML = `${firstName} ${secondName}`;
  }
}
