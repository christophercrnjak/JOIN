 // *** Hover of add  btn kanban Board *** //
 

 // Element mit der ID 'meinElement' auswählen
 let element = document.getElementById('column_head_add_btn');

 // Bildquelle
 let bildQuelleHover = 'assets/img/plus_btn_hover.svg';
 let bildQuelle = 'assets/img/plus_btn.svg';
 

 // Bildelement erstellen
 let imgElement = document.createElement('img');
 imgElement.src = bildQuelle; // Standardbild festlegen
 element.appendChild(imgElement); // Bild dem Element hinzufügen

 // Eventlistener für das Hover-Ereignis hinzufügen
 element.addEventListener('mouseover', function() {
     // Bildquelle ändern
     imgElement.src = bildQuelleHover;
 });

 // Eventlistener für das Verlassen des Hover-Ereignisses hinzufügen
 element.addEventListener('mouseout', function() {
     // Bildquelle zurücksetzen
     imgElement.src = bildQuelle;
 });



  // Element mit der ID 'meinElement' auswählen
  let element1 = document.getElementById("add_btn_InProgress");

// Bildquelle
let bildQuelleHover1 = 'assets/img/plus_btn_hover.svg';
let bildQuelle1 = 'assets/img/plus_btn.svg';


// Bildelement erstellen
let imgElement1 = document.createElement('img');
imgElement1.src = bildQuelle1; // Standardbild festlegen
element1.appendChild(imgElement1); // Bild dem Element hinzufügen

// Eventlistener für das Hover-Ereignis hinzufügen
element1.addEventListener('mouseover', function() {
// Bildquelle ändern
imgElement1.src = bildQuelleHover1;
});

// Eventlistener für das Verlassen des Hover-Ereignisses hinzufügen
element1.addEventListener('mouseout', function() {
// Bildquelle zurücksetzen
imgElement1.src = bildQuelle1;
});



// Element mit der ID 'meinElement' auswählen
let element2 = document.getElementById("add_btn_AwaitFeedback");

// Bildquelle
let bildQuelleHover2 = 'assets/img/plus_btn_hover.svg';
let bildQuelle2 = 'assets/img/plus_btn.svg';


// Bildelement erstellen
let imgElement2 = document.createElement('img');
imgElement2.src = bildQuelle1; // Standardbild festlegen
element2.appendChild(imgElement2); // Bild dem Element hinzufügen

// Eventlistener für das Hover-Ereignis hinzufügen
element2.addEventListener('mouseover', function() {
// Bildquelle ändern
imgElement2.src = bildQuelleHover2;
});

// Eventlistener für das Verlassen des Hover-Ereignisses hinzufügen
element2.addEventListener('mouseout', function() {
// Bildquelle zurücksetzen
imgElement2.src = bildQuelle2;
});



// Element mit der ID 'meinElement' auswählen
let element3 = document.getElementById("add_btn_Done");

// Bildquelle
let bildQuelleHover3 = 'assets/img/plus_btn_hover.svg';
let bildQuelle3 = 'assets/img/plus_btn.svg';


// Bildelement erstellen
let imgElement3 = document.createElement('img');
imgElement3.src = bildQuelle3; // Standardbild festlegen
element3.appendChild(imgElement3); // Bild dem Element hinzufügen

// Eventlistener für das Hover-Ereignis hinzufügen
element3.addEventListener('mouseover', function() {
// Bildquelle ändern
imgElement3.src = bildQuelleHover3;
});

// Eventlistener für das Verlassen des Hover-Ereignisses hinzufügen
element3.addEventListener('mouseout', function() {
// Bildquelle zurücksetzen
imgElement3.src = bildQuelle3;
});



 