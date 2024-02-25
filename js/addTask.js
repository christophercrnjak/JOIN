let contacts = [];
let selectedFormDropdown = [];
let prio = [];


function addTaskInit() {
  renderDropList();
}

async function renderDropList() {
  // render the drop down menu form the
  let response = await fetch('assets/json/contacts.json');
  let responseAsJson = await response.json();
  let dropdown = document.getElementById('dropdown');

  dropdown.innerHTML = '';
  for (let i = 0; i < responseAsJson.length; i++) {
    let e = responseAsJson[i];
    dropdown.innerHTML += dropdownHtml(e);
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

function selectFromDropdown(e, imageUrl, firstName, secondName) {
  // Select for the Drop Down
  let isSelected = isItemSelected(imageUrl, firstName, secondName);
  let dropdownList = document.getElementById('dropdownList');

  if (!isSelected) {
    selectedFormDropdown.push({ imageUrl, firstName, secondName });
    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    dropdownList.appendChild(imageElement);
    e.classList.add('selected');
    imageElement.addEventListener('click', function () {
      dropdownList.style.backgroundColor = '';
      dropdownList.removeChild(imageElement);
      removeFromSelectedItems(firstName, secondName);
      e.classList.remove('selected');
    });
  } else {
    removeFromSelectedItems(firstName, secondName);
    e.classList.remove('selected');

    dropdownList.addEventListener('click', function () {
      dropdownList.style.backgroundColor = '';
      dropdownList.removeChild(imageElement);
      removeFromSelectedItems(firstName, secondName);
    });
  }
}

function isItemSelected(imageUrl, firstName, secondName) {
  // checked if the seceted Item are in the array
  return selectedFormDropdown.some(
    (item) =>
      item.imageUrl === imageUrl &&
      item.firstName === firstName &&
      item.secondName === secondName
  );
}

function removeFromSelectedItems(firstName, secondName) {
  // remove the selected items form the arry
  selectedFormDropdown = selectedFormDropdown.filter(
    (item) => !(item.firstName === firstName && item.secondName === secondName)
  );
}

// Farbe änderung der btn urgrend, medium und low

function changePriority(priority) {
  resetStyles(); // Setze alle Buttons und Bilder auf Standardwerte
  removePreviousPriority(); // Vorherige Priorität aus dem Array löschen

  // Basierend auf der übergebenen Priorität die entsprechenden Änderungen vornehmen
  switch (priority) {
      case 'urgrend':
          setPriorityStyles('#ff0000', '#ffff', '/assets/img/prio_ungrent.svg', 'urgrend');
          break;
      case 'medium':
          setPriorityStyles('#ffa500', '#ffff', 'assets/img/prio_medium.svg', 'medium');
          break;
      case 'low':
          setPriorityStyles('#008000', '#ffff', 'assets/img/prio_low.svg', 'low');
          break;
      default:
          break;
  }
}

function resetStyles() {
  let btnUrgrend = document.getElementById('btnUrgrend');
  let btnMedium = document.getElementById('btnMedium');
  let btnLow = document.getElementById('btnLow');

  let imgUrgrend = document.getElementById('btnUrgrendImg');
  let imgMedium = document.getElementById('btnMediumImg');
  let imgLow = document.getElementById('btnLowImg');

  let buttons = [btnUrgrend, btnMedium, btnLow];
  let images = [imgUrgrend, imgMedium, imgLow];

  buttons.forEach(function(button) {
      button.style.backgroundColor = '#ffff';
      button.style.color = 'black';
  });

  images.forEach(function(image) {
      switch (image.id) {
          case 'btnUrgrendImg':
              image.src = 'assets/img/Priority_symbols_Urgent.png';
              break;
          case 'btnMediumImg':
              image.src = 'assets/img/Priority_symbols_Medium.png';
              break;
          case 'btnLowImg':
              image.src = 'assets/img/Priority_symbols_Low.png';
              break;
          default:
              break;
      }
  });
}

function removePreviousPriority() {
  if (prio.length > 0) {
      prio.pop();
  }
}

function setPriorityStyles(bgColor, textColor, imgSrc, priority) {
  var button = document.getElementById('btn' + priority.charAt(0).toUpperCase() + priority.slice(1));
  var image = document.getElementById('btn' + priority.charAt(0).toUpperCase() + priority.slice(1) + 'Img');

  button.style.backgroundColor = bgColor;
  button.style.color = textColor;
  image.src = imgSrc;

  prio.push(priority);
}

function filterFunction() {
  // Filter on the drop Down menu
  let input, filter, div, options, i, txtValue;
  input = document.getElementById('dropdownInput');
  filter = input.value.toUpperCase();
  div = document.getElementById('dropdown');
  options = div.getElementsByClassName('dropdown_assign');
  for (i = 0; i < options.length; i++) {
    txtValue = options[i].textContent || options[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = '';
    } else {
      options[i].style.display = 'none';
    }
  }
}

function toggledropbtn() {
  let dropdownContent = document.getElementById('dropdown');

  if (!dropdownContent.classList.contains('d-none')) {
    dropdownContent.classList.toggle('show');
    document.getElementById('dropdownInput').classList.toggle('d-none');
    document.getElementById('dropbtn').classList.toggle('d-none');
    document.getElementById('arrow').classList.toggle('rotated');
  }
}

function pushToJson() {
  // Push the Add Task inputs in to a JSON
}

function removeToJson() {
  // Remove the Add Task inputs in to a JSON
}


