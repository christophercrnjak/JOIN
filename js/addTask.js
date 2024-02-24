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
  const isSelected = isItemSelected(imageUrl, firstName, secondName);
  let dropdownList = document.getElementById("dropdownList");

  if (!isSelected) {
    selectedFormDropdowm.push({ imageUrl, firstName, secondName });
    let imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    dropdownList.appendChild(imageElement);
    element.classList.add("selected");
    imageElement.addEventListener("click", function () {
      dropdownList.style.backgroundColor = "";
      dropdownList.removeChild(imageElement);
      removeFromSelectedItems(firstName, secondName);
      element.classList.remove("selected");
    });
  } else {
    removeFromSelectedItems(firstName, secondName);
    element.classList.remove("selected");

    dropdownList.addEventListener("click", function () {
      dropdownList.style.backgroundColor = "";
      dropdownList.removeChild(imageElement);
      removeFromSelectedItems(firstName, secondName);
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

function removeFromSelectedItems(firstName, secondName) {
  selectedFormDropdowm = selectedFormDropdowm.filter(
    (item) => !(item.firstName === firstName && item.secondName === secondName)
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


function toggleDropdown(open = null) {
  let isOpen = true;
  let dropdownContent = document.getElementById("dropdownContent");
  let dropdownInput = document.getElementById("dropdownInput");
  let dropbtn = document.getElementById("dropbtn");
  let arrow = document.getElementById("arrow");

  if (open !== null) {
    if (open && !isOpen) {
      dropdownContent.classList.add("show");
      dropdownInput.classList.add("d-none");
      dropbtn.classList.add("d-none");
      arrow.style.backgroundImage = 'url("./assets/img/arrowDropDown.svg")';
    } else if (!open && isOpen) {
      dropdownContent.classList.add("show");
      dropdownInput.classList.add("d-none");
      dropbtn.classList.add("d-none");
      arrow.classList.add("rotated"); // Klasse hinzufügen, um das Bild zu drehen
    }
  } else {
     dropdownContent.classList.add("show");
    dropdownInput.classList.add("d-none");
    dropbtn.classList.add("d-none");
    arrow.classList.add("rotated"); // Klasse hinzufügen, um das Bild zu drehen
  }
}

function toggledropbtn() {
  let dropdownContent = document.getElementById("dropdown");

  if (!dropdownContent.classList.contains("d-none")) {
    dropdownContent.classList.toggle("show");
    document.getElementById("dropdownInput").classList.toggle("d-none");
    document.getElementById("dropbtn").classList.toggle("d-none");
  }
}

function pushToJson() {
  // Push the Add Task inputs in to a JSON
}

function removeToJson() {
  // Remove the Add Task inputs in to a JSON
}

function setupDropdownCloseListener() {
  window.onload = function () {
    document.addEventListener("mousedown", function (event) {
      if (
        !event.target.matches("#dropdownInput") &&
        !event.target.closest("#dropdown")
      ) {
        toggleDropdown(false);
      }
    });
  };
}
