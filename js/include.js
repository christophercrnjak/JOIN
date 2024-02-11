// 

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

// Durch das Umschreiben der Funktion wird die Sidebar nicht mehr angezeigt,
// es wird auch keine Fehler angezeigt wo durch man erkennen kann warum dort nix erscheint.

  // async function includeHTML() {
  //   let includeElements = document.querySelector("[w3-include-html]");
  
  //   for (let i = 0; i < includeElements.length; i++) {
  //     let element = includeElements[i];
  //     file = element.getAttribute("w3-include-html");
  //     let response = await fetch(file);
  //     if (response.ok) {
  //       element = await response.text();
  //     } else {
  //       element.innerHTML = "Page not found.";
  //     }
  //   }
  // }