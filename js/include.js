// This function loops through all elements in the document that have the attribute "w3-include-html",
// replacing the content of those elements with the content of an external HTML file
// specified in the "w3-include-html" attribute.
// If the file is successfully retrieved, its content is inserted into the respective element.
// If an error occurs (e.g., file not found), "Page not found." is displayed in the element.

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");

  for (let element of includeElements) {
    let file = element.getAttribute("w3-include-html");
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

