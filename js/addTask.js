let contacts = [];
let selectedFormDropdowm = [];

function addTaskInit() {
  renderDropList();
}

async function renderDropList() {
  let response = await fetch("assets/json/contacts.json");
  let responseAsJson = await response.json();
  let dropdown = document.getElementById("dropdown");

  dropdown.innerHTML = "";
  for (let i = 0; i < responseAsJson.length; i++) {
    let element = responseAsJson[i];
    dropdown.innerHTML += dropdownHtml(element);
  }
}

function dropdownHtml(dropdownList) {
  return `
  <a class="dropdown_assign" onclick="selectFromDropdown(this, '${dropdownList["image"]}', '${dropdownList["name"]["firstName"]}', '${dropdownList["name"]["secondName"]}')">
    <div class="display_center gap">
    <img src="${dropdownList["image"]}">${dropdownList["name"]["firstName"]} ${dropdownList["name"]["secondName"]}
    </div>
    <img src="assets/img/Check_btn.svg">
  </a>
  `;
}

function selectFromDropdown(element, imageUrl, firstName, secondName) {
  if (!isItemSelected(imageUrl, firstName, secondName)) {
    selectedFormDropdowm.push({ imageUrl, firstName, secondName });
    let imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    let dropdownList = document.getElementById("dropdownList");
    dropdownList.appendChild(imageElement);
    element.classList.toggle("selected");

    // Eventlistener, um das Element auszuwählen und zu entfernen
    imageElement.addEventListener("click", function () {
      dropdownList.removeChild(imageElement);

      // Entferne das entsprechende Element aus dem selectedFormDropdowm-Array
      selectedFormDropdowm = selectedFormDropdowm.filter(
        (item) =>
          !(item.firstName === firstName && item.secondName === secondName)
      );
    });
  }
}


function isItemSelected(imageUrl, firstName, secondName) {
  return selectedFormDropdowm.some(
    (item) =>
      item.imageUrl === imageUrl &&
      item.firstName === firstName &&
      item.secondName === secondName
  );
}

// Farbe änderung der btn urgrend, medium und low

function changeBtnUrgrend() {
  let btnUrgrend = document.getElementById("btnUrgrend");
  if ((btnUrgrend.style.backgroundColor = "#ffff")) {
    document.getElementById("btnUrgrend").style.backgroundColor = "#ff0000";
    document.getElementById("btnUrgrend").style.color = "#ffff";
    document.getElementById("btnMedium").style.backgroundColor = "#ffff";
    document.getElementById("btnMedium").style.color = "black";
    document.getElementById("btnLow").style.backgroundColor = "#ffff";
    document.getElementById("btnLow").style.color = "black";
  }
}

function changeBtnMedium() {
  let btnUrgrend = document.getElementById("btnMedium");
  if ((btnUrgrend.style.backgroundColor = "#ffff")) {
    document.getElementById("btnMedium").style.backgroundColor = "#ffa500";
    document.getElementById("btnMedium").style.color = "#ffff";
    document.getElementById("btnUrgrend").style.backgroundColor = "#ffff";
    document.getElementById("btnUrgrend").style.color = "black";
    document.getElementById("btnLow").style.backgroundColor = "#ffff";
    document.getElementById("btnLow").style.color = "black";
  }
}

function changeBtnLow() {
  let btnUrgrend = document.getElementById("btnLow");
  if ((btnUrgrend.style.backgroundColor = "#ffff")) {
    document.getElementById("btnLow").style.backgroundColor = "#008000";
    document.getElementById("btnLow").style.color = "#ffff";
    document.getElementById("btnUrgrend").style.backgroundColor = "#ffff";
    document.getElementById("btnUrgrend").style.color = "black";
    document.getElementById("btnMedium").style.backgroundColor = "#ffff";
    document.getElementById("btnMedium").style.color = "black";
  }
}

function filterFunction() {
  let input, filter, div, options, i, txtValue;
  input = document.getElementById("dropdownInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("dropdown");
  options = div.getElementsByClassName("dropdown_assign");
  for (i = 0; i < options.length; i++) {
    txtValue = options[i].textContent || options[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = "";
    } else {
      options[i].style.display = "none";
    }
  }
}

// Funktion, um das Dropdown-Menü zu öffnen oder zu schließen
function toggleDropdown(open = null) {
  let dropdownContent = document.getElementById("dropdown");
  let arrow = document.getElementById("arrow");
  let isOpen = dropdownContent.classList.contains("show");

  // Wenn der open-Parameter übergeben wird, aktualisiere den Zustand des Dropdown-Menüs entsprechend
  if (open !== null) {
    if (open && !isOpen) {
      dropdownContent.classList.add("show");
      document.getElementById("dropdownInput").classList.add("d-none");
      document.getElementById("dropbtn").classList.add("d-none");
      arrow.innerHTML = `&#11205;`;
    } else if (!open && isOpen) {
      dropdownContent.classList.remove("show");
      document.getElementById("dropdownInput").classList.remove("d-none");
      document.getElementById("dropbtn").classList.remove("d-none");
      arrow.innerHTML = ""; // Hier eventuell den Pfeilinhalt zurücksetzen, je nach Bedarf
    }
  } else {
    // Andernfalls, wenn kein Parameter übergeben wird, wechsle einfach den Zustand des Dropdown-Menüs
    dropdownContent.classList.toggle("show");
    document.getElementById("dropdownInput").classList.toggle("d-none");
    document.getElementById("dropbtn").classList.toggle("d-none");
    arrow.innerHTML = isOpen ? "" : `&#11205;`; // Hier eventuell den Pfeilinhalt zurücksetzen, je nach Bedarf
  }
}

function toggledropbtn() {
  let dropdownContent = document.getElementById("dropdown");
  let arrow = document.getElementById("arrow");
  dropdownContent.classList.toggle("show");
  document.getElementById("dropdownInput").classList.toggle("d-none");
  document.getElementById("dropbtn").classList.toggle("d-none");
  arrow.innerHTML = `&#11206;`;
}

function pushToJson() {
  // Push the Add Task inputs in to a JSON
}

function removeToJson() {
  // Remove the Add Task inputs in to a JSON
}

function setupDropdownCloseListener() {
  window.onload = function () {
    // Setze Event-Listener auf das Dokument
    document.addEventListener("mousedown", function (event) {
      // Prüfe, ob das geklickte Element nicht das Dropdown-Eingabefeld oder das Dropdown-Menü selbst ist
      if (
        !event.target.matches("#dropdownInput") &&
        !event.target.closest("#dropdown")
      ) {
        // Schließe das Dropdown-Menü
        toggleDropdown(false);
      }
    });
  };
}
