/**
 * Main json structure of new task.
 */
let newTask = {
  "title": "",
  "description": "",
  "category": "",
  "contacts": [],
  "dueDate": "",
  "priority": "",
  "subtasks": [],
  "status": "toDo"
};

/**
 * Initializes creating a new task.
 */
async function initNewTask() {
  await validateInputs();
  if (
    await validation('titleAddtask', 'validation_text_title') == true &&
    await validation('AddTaskDate', 'validation_text_due_date') == true &&
    await validation('categoryDropDownBtn', 'validation_text_category') == true) {
      console.log('All required inpiut fields are valide!')
      await createNewTask();
  }
}

/**
 * Initializes the validation functions for title, due date and category.
 * 
 * @returns 
 */
async function validateInputs() {
  validation('titleAddtask', 'validation_text_title');
  validation('AddTaskDate', 'validation_text_due_date');
  validation('categoryDropDownBtn', 'validation_text_category');
}

/**
 * Validates the input fields of the transmitted ids to see whether an input is present. 
 * If there is no input, a red border is added, an error text appears and it returns false.
 * If an input is present, the red border, the error text are removed amd it returns true. 
 * 
 * @param {String} inputId - id of input element which is to validate
 * @param {String} errortextId - id of error text element witch appears in case of non valide
 * @returns {Boolean} 
 */
function validation(inputId, errortextId) {
  let input = document.getElementById(inputId);
  let errortext = document.getElementById(errortextId);
  
  if (!input || !errortext) {
    console.error("Input oder Errortext nicht gefunden.");
    return false;
  }

  if (input.value === '') {
    window.location.hash = inputId;
    input.classList.add('red-border');
    errortext.style.visibility = "visible";
    return false;
  } else {
    input.classList.remove('red-border');
    errortext.style.visibility = "hidden";
    return true;
  }
}
  
  
async function createNewTask() {
  await saveNewTask();
  await deleteNewTaskContent();
  await removeAllInputes();
  newTask_status = 'true';
  await setItem('newTask_status', newTask_status);
  changeWindow();
}

async function saveNewTask() {
  await getAllSettingsOfNewTask();
  await pushNewTaskToTasks();
  await setTasksToServer();
  await getTasksFromServer();
}



function changeWindow() {
  window.location.href = "board.html";
}

async function getAllSettingsOfNewTask() {
  await getTextInputValues();
  await dueDate_newTask_addTask();
  await getCategory();
  await getContacts();
  await getPrio();
  await getSubtask();
}

function getTextInputValues() {
  let title = document.getElementById('titleAddtask').value;
  let description = document.getElementById('description').value;
  newTask.title = title;
  newTask.description = description;
}

/**
 * Adds the due date from Input to newTask.dueDate with the right format dd/mm/yy.
 */
function  dueDate_newTask_addTask() {
  let duedateInput = document.getElementById('AddTaskDate').value;
  duedateInput = duedateInput.split('-');
  let year = parseInt(duedateInput[0]); 
  year = year - 2000;
  let newDate = duedateInput[2] + '/' + duedateInput[1] + '/' + year;
  newTask.dueDate = newDate;
}

function getCategory() {
  newTask.category = pushCategory;
}
  
function getContacts() {
  let selected_contacts = [];
  for (let i = 0; i < contacts_addTask.length; i++) {
    let contact = contacts_addTask[i];
    if (contact.select_status == true) {
      delete contact.select_status;
      selected_contacts.push(contact.name);
    }
  newTask.contacts = selected_contacts;
  }
}

function getPrio() {
  newTask.priority = prio;
}

function getSubtask() {
  newTask.subtasks = subtasklists;
}

function pushNewTaskToTasks() {
  tasks.push(newTask);
}



function deleteNewTaskContent() {
  newTask = {
    "title": "",
    "description": "",
    "category": "",
    "contacts": [],
    "dueDate": "",
    "priority": "",
    "subtasks": [],
    "status": "toDo"
  }
}
  
function removeAllInputes() {
  // Remove the Add Task inputs
  selectedFromDropdown = [];
  prio = [];
  pushCategory = [];
  subtasklists = [];
  document.getElementById('titleAddtask').value = '';
  document.getElementById('AddTaskDate').value = '';
  document.getElementById("categoryDropDownBtn").innerHTML = 'Select task category';
  changePriority('medium');
}