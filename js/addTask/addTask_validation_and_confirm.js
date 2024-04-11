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

function takeoverNewSubtaskValue(subtaskId) {
  let input = document.getElementById(`new_subtask_edit_text${subtaskId}`);
  let subtask_element = document.getElementById(`subtasklist_element${subtaskId}`);
  subtasklists[subtaskId] = input.value;
  subtask_element.style.paddingLeft = '10px';
  subtask_element.classList.remove("no-hover");
  rendersubtasklist();
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

async function initNewTask() {
  await validateInputs();
  if (
    validation('titleAddtask', 'validation_text_title') == true &&
    validation('AddTaskDate', 'validation_text_due_date') == true &&
    validation('categoryDropDownBtn', 'validation_text_category') == true) {
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
  // if (validation('titleAddtask', 'validation_text_title') == true && validation('AddTaskDate', 'validation_text_due_date') == true && validateCategory() == true) {
  //   return true
  // } else {
  //   return false
  // }
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
  
// function validateCategory() {
//   let container = document.getElementById('categoryDropDownBtn');
//   let errortext = document.getElementById('validation_text_category');
//   if (!pushCategory == '') {
//     container.classList.remove('red-border');
//     errortext.classList.add('d-none');} 
//     else {
//       container.classList.add('red-border');
//       errortext.classList.remove('d-none');
//     } 
//   }
  
  
async function createNewTask() {
  await getAllSettingsOfNewTask();
  await pushNewTaskToTasks();
  await setTasksToServer();
  await getTasksFromServer();
  toastMessageAddTask();
  await timeout (1200);
  await closeToast();
  deleteNewTaskContent();
  removeAllInputes();
  window.location.href = "board.html";
}

async function getAllSettingsOfNewTask() {
  await getTextInputValues();
  getCategory();
  getContacts();
  getPrio();
  getSubtask();
}

async function getTextInputValues() {
  let title = document.getElementById('titleAddtask').value;
  let description = document.getElementById('description').value;
  let dueDate = document.getElementById('AddTaskDate').value;
  newTask.title = title;
  newTask.description = description;
  newTask.dueDate = dueDate;
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

function toastMessageAddTask() {
  let container = document.getElementById('toastMessageAddTask_main');
  container.classList.remove('d-none');
}

/**
 * Hides the toast message box
 */
function closeToast() {
  let container = document.getElementById('toastMessageAddTask_main'); //@board.html:43
  container.classList.add('d-none');
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
  
