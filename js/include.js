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

    // Funktion zum Hinzufügen der 'active' Klasse basierend auf dem URL-Parameter
    function setActiveLink() {
      // Aktuelle URL abrufen
      var url = window.location.href;
      // Alle Links in der Seitenleiste auswählen
      var links = document.querySelectorAll('.side_navbar_section');

      // Durch alle Links iterieren
      links.forEach(function(link) {
          // Überprüfen, ob der href des Links in der URL enthalten ist
          if (url.includes(link.getAttribute('href'))) {
              // Wenn ja, füge die Klasse 'active' hinzu
              link.classList.add('active');
          }
      });
  }
