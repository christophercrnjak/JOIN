let contacts = [];



function addTaskInit () {
  
 
   
}

// Farbe änderung der btn urgrend, medium und low 

function changeBtnUrgrend() {
  let btnUrgrend = document.getElementById('btnUrgrend');
  if(btnUrgrend.style.backgroundColor = '#ffff'){
    document.getElementById('btnUrgrend').style.backgroundColor = "#ff0000";
    document.getElementById('btnUrgrend').style.color = '#ffff';
    document.getElementById('btnMedium').style.backgroundColor = "#ffff";
    document.getElementById('btnMedium').style.color = 'black';
    document.getElementById('btnLow').style.backgroundColor = "#ffff";
    document.getElementById('btnLow').style.color = 'black';
  }
}

function changeBtnMedium() {
  let btnUrgrend = document.getElementById('btnMedium');
  if(btnUrgrend.style.backgroundColor = '#ffff'){
    document.getElementById('btnMedium').style.backgroundColor = "#ffa500";
    document.getElementById('btnMedium').style.color = '#ffff';
    document.getElementById('btnUrgrend').style.backgroundColor = "#ffff";
    document.getElementById('btnUrgrend').style.color = 'black';
    document.getElementById('btnLow').style.backgroundColor = "#ffff";
    document.getElementById('btnLow').style.color = 'black';
  }
}

function changeBtnLow() {
  let btnUrgrend = document.getElementById('btnLow');
  if(btnUrgrend.style.backgroundColor = '#ffff'){
    document.getElementById('btnLow').style.backgroundColor = "#008000";
    document.getElementById('btnLow').style.color = '#ffff';
    document.getElementById('btnUrgrend').style.backgroundColor = "#ffff";
    document.getElementById('btnUrgrend').style.color = 'black';
    document.getElementById('btnMedium').style.backgroundColor = "#ffff";
    document.getElementById('btnMedium').style.color = 'black';
  }
  
}

function filterFunction() {
  let input, filter, select, options, i, txtValue, a;
  input = document.getElementById("dropdownInput");
  filter = input.value.toUpperCase();
  select = document.getElementById("dropdown");
  options = select.getElementsByTagName("a");
  for (i = 0; i < options.length; i++) {
      txtValue = options[i].textContent || options[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          options[i].style.display = "";
      } else {
          options[i].style.display = "none";
      }
  }
}


function toggleDropdown() {
  let dropdownContent = document.getElementById('dropdown');
  let arrow = document.getElementById('arrow');
  dropdownContent.classList.toggle('show');
  document.getElementById('dropdownInput').classList.toggle('d-none');
  document.getElementById('dropbtn').classList.toggle('d-none');
  arrow.innerHTML = `&#11205;`;
 
}

function toggledropbtn() {
  let dropdownContent = document.getElementById('dropdown');
  let arrow = document.getElementById('arrow');
  dropdownContent.classList.toggle('show');
  document.getElementById('dropdownInput').classList.toggle('d-none');
  document.getElementById('dropbtn').classList.toggle('d-none');
  arrow.innerHTML = `&#11206;`;
  
}

function pushToJson() {
  // Push the Add Task inputs in to a JSON
}


function removeToJson() {
  // Remove the Add Task inputs in to a JSON
}