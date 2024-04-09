
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
  
  function validateInputs() {
    validation('titleAddtask', 'validation_text_title');
    validation('AddTaskDate', 'validation_text_due_date');
    validateCategory();
    if (validation('titleAddtask', 'validation_text_title') == true && validation('AddTaskDate', 'validation_text_due_date') == true && validateCategory() == true) {
      createNewTask();
    }
  }
  
  function validation(inputId, errortextId) {
    let input = document.getElementById(inputId);
    let errortext = document.getElementById(errortextId)
    if (input.value == '') {
      window.location.hash=inputId;
      input.classList.add('red-border');
      errortext.classList.remove('d-none');
      return false;
    } else {
      input.classList.remove('red-border');
      errortext.classList.add('d-none');
      return true;
    }
  }
  
  
  function validateCategory() {
    let container = document.getElementById('categoryDropDownBtn');
    let errortext = document.getElementById('validation_text_category');
    if (pushCategory.length > 0) {
      container.classList.remove('red-border');
      errortext.classList.add('d-none');
      if (pushCategory.length > 1) {
        pushCategory.shift();
      }
      return true;
    } else {
      container.classList.add('red-border');
      errortext.classList.remove('d-none');
      return false;
    }
  }
  
  
  function createNewTask() {
    getTextInputValues();
    removeAllInputes();
  }

  function getTextInputValues() {
    let title = document.getElementById('titleAddtask').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('AddTaskDate').value;
    

    let new_task = {
      'title': title,
      'description': description,
      'contacts': [],
      'category': pushCategory,
      'dueDate': dueDate,
      'priority': prio,
      'subtasks': subtasklists,
      'status': 'toDo',
      'createdDate': new Date().getTime(),
    };


  }

  
  

    // await setItem('tasks', task);
  
    pushCategory = [];
    selectedFromDropdown.value = '';
    prio.value = '';
  