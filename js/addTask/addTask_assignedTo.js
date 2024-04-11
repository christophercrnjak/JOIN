// Assigned to 

let dropdown_status_assignedTo = false;

async function renderDropList() {
    // render the drop down menu form the
    let dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = "";
    for (let i = 0; i < contacts_addTask.length; i++) {
      let contact = contacts_addTask[i];
      dropdown.innerHTML += dropdownHtml(contact, [i]);
    }
  }
  
  /**
   * 
   * @param {JSON} contact 
   * @param {Number} i 
   * @returns 
   */
  function dropdownHtml(contact, i) {
    return `
    <a class="dropdown_assign" id="contact${i}" onclick="selectFromDropdown(${i})">
        <!-- contact -->
        <div class="display_center gap ">
          <div class="member_cicle_main">
            <div class="member_cicle" style='background-color:${contact["name"]["color"]};'>
              ${contact["name"]["firstName"].charAt(0)}
              ${contact["name"]["secondName"].charAt(0)}
            </div>
          </div>
          <div class="member_name">${contact["name"]["firstName"]} ${contact["name"]["secondName"]}</div>
        </div> 
        <!-- checkbox -->
        <div class="dropdown_img" id="selected_img${i}">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
          </svg>
        </div>
    </a>
    `;
  }
  
  /**
   * This function put the selected member from the drop down list assigned to 
   * in a array and div container
   * @param {String} color  - fill the color from JSON in the circle.
   * @param {String} firstName - fill the first name into the circle from the JSON.
   * @param {String} secondName - fill the second name into the circle from the JSON.
   * @param {Number} i - Index of contact in contacts_addTask array
   */
  function selectFromDropdown(i) {
    let contact = document.getElementById(`contact${i}`);
    let checkbox = document.getElementById(`selected_img${i}`);
    
    if (contacts_addTask[i].select_status == false) {
      contacts_addTask[i].select_status = true;
      contact.classList.add('selected');
      checkbox.innerHTML = checkboxHTML_checked();
      renderSelectedContactsRow();
    } else if (contacts_addTask[i].select_status == true){
      contacts_addTask[i].select_status = false;
      contact.classList.remove('selected');
      checkbox.innerHTML = checkboxHTML_unchecked();
      renderSelectedContactsRow();
    }
  }
  
  function checkboxHTML_checked() {
    return `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M5 9L9 13L17 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }
  
  function checkboxHTML_unchecked() {
    return `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
      </svg>
    `;
  }
  
  function renderSelectedContactsRow() {
    let selected_contacts_row = document.getElementById('row_selected_contacts_circles');
    selected_contacts_row.innerHTML = '';
    for (let i = 0; i < contacts_addTask.length; i++) {
      let contact = contacts_addTask[i];
      if (contact.select_status == true) {
        selected_contacts_row.innerHTML += dropdownHtmlMemberCircle(i);
      }
      
    }
  }
  
  
  /**
   * Creates the circle with initials from contacts are selected.
   * 
   * @param {Number} i - Index of contact in contacts_addTask array
   * @returns 
   */
  function dropdownHtmlMemberCircle(i) {
    let firstName = contacts_addTask[i].name.firstName;
    let secondName = contacts_addTask[i].name.secondName;
    let color = contacts_addTask[i].name.color;
    return `
      <div class="member_cicle_main">
        <div class="member_cicle" style="background-color:${color};">
          ${firstName.charAt(0)}
          ${secondName.charAt(0)}
        </div>
      </div>
    `;
  }
  
  /**
   * The function is for the filtering of the dropdown menu 
   */
  function filterFunction() {
    // Filter on the drop Down menu
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
  
  function closeDropBtn() {
    let assignedTo_section = document.getElementById('assigned_to_section')
    let dropdown_container = document.getElementById('dropdown');
    let buttonfield = document.getElementById("dropbtn");
    let arrow_icon = document.getElementById("arrow")
    let inputfield = document.getElementById("dropdownInput");
  
  
    if (!dropdown_container.classList.contains("d-none")) {
      dropdown_container.classList.add('show_task'); //dropdown-list appear
      inputfield.classList.remove("d-none");// input appear
      buttonfield.classList.add("d-none"); // btn with text disappears
      arrow_icon.classList.add("rotated"); // triangle rotate to top
      assignedTo_section.classList.add('background_and_radius_fitting'); // add white background
    }
  }
  
  function open_close_Dropdownlsit_contacts() {
  
    if (dropdown_status_assignedTo == false) {
      openDropdownlsit_contacts()
    } else if (dropdown_status_assignedTo == true){
      closeDropdownlsit_contacts()
    }
  }
  
  function openDropdownlsit_contacts() {
    let assignedTo_section = document.getElementById('assigned_to_section')
    let dropdown_container = document.getElementById('dropdown');
    let buttonfield = document.getElementById("dropbtn");
    let arrow_icon = document.getElementById("arrow")
    let inputfield = document.getElementById("dropdownInput");
    
    dropdown_status_assignedTo = true;
    dropdown_container.classList.add('show_task');  // dropdown-list appear
    inputfield.classList.remove("d-none");          // input appear
    buttonfield.classList.add("d-none");            // btn with text disappears
    arrow_icon.classList.add("rotated");            // triangle rotate to top
    assignedTo_section.classList.add('background_and_radius_fitting'); // add white background
  }
  
  function closeDropdownlsit_contacts() {
    let assignedTo_section = document.getElementById('assigned_to_section')
    let dropdown_container = document.getElementById('dropdown');
    let buttonfield = document.getElementById("dropbtn");
    let arrow_icon = document.getElementById("arrow")
    let inputfield = document.getElementById("dropdownInput");
    
    dropdown_status_assignedTo = false;
    dropdown_container.classList.remove('show_task');  // dropdown-list disappear
    inputfield.classList.add("d-none");          // input disappear
    buttonfield.classList.remove("d-none");            // btn with text appears
    arrow_icon.classList.remove("rotated");            // triangle rotate to bottom
    assignedTo_section.classList.remove('background_and_radius_fitting'); // remove white background
  }