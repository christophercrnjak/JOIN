// *** Create new Task Button *** //

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
 * Validates the required inputs, jump to the invalide section/input and mark the border red if the input isn't valide.
 * The function is triggered by pressing the "Create Task" button in add task dialog.
 */
function validationOfAllInputs() {
    let titleInput = document.getElementById('input_title_addTask_dialog');
    let duedateInput = document.getElementById('edit_input_dueDate_addTask');
    if (titleInput.value == '') {
        window.location.hash='input_title_addTask_dialog';
        checkFormValidation_title_addTask();
    } else 
    
    if (duedateInput.value == '') {
        window.location.hash='edit_input_dueDate_addTask';
        DueDatevalidation_addTask();
        document.getElementById('edit_input_dueDate_addTask').classList.add('non_valide');
    } else 

    if (selectedCategory == '') {
        window.location.hash='addTask_dialog_category';
        document.getElementById('category_addTask_dialog').classList.add('non_valide');
    } else {
        initCreateNewTask()
    }
}

/**
 * Initiates the creation of a new task.
 */
async function initCreateNewTask() {
    saveNewTask();
    await tasks.push(newTask); // @storage.js:32
    await setAndGetToServer(); // @board_main.js:498
    await toastMessageAddTask();
    await timeout (1200);
    let container = document.getElementById('toastMessageAddTask');
    container.classList.add('d-none');
    resetSettings();
    closeDialog(); // @board_taskdetails.js:25
}

/**
 * Calls the functions that store the inputs of the "addTask dialog" in the newTask JSON-array.
 */
function saveNewTask() {
    title_newTask();
    description_newTask();
    category_newTask();
    contacts_newTask();
    dueDate_newTask();
    priority_newTask();
    subtasks_newTask();
    status_newTask();
}

function timeout (ms) {
    return new Promise(res => setTimeout(res,ms));
  }

/**
 * Makes the element saying "Task added to board" appear and disappear after 1 s and 20 ms.
 */
function toastMessageAddTask() {
    let container = document.getElementById('toastMessageAddTask');
    container.classList.remove('d-none');
    // setTimeout(function() {
    //     container.classList.add('d-none');
    // }, 1200); 
}

/**
 * Resets all elements of the dialog that were changed by the inputs.
 * 
 */
function resetSettings() {
    clearInputsAddTaskDialog(); // @board_addTask.js:311
    resetNewTask();
    // document.getElementById('task_dialog_container').style.width = '525px';
    // document.getElementById('task_dialog_container').style.paddingTop = '48px';
}

/**
 * Resets the newTask JSON-array and clear the content of the keys.
 */
function resetNewTask() {
    newTask = {
        "title": "",
        "description": "",
        "category": "",
        "contacts": [],
        "dueDate": "",
        "priority": "",
        "subtasks": [],
        "status": "toDo"
    };
}

/**
 * 
 */
function title_newTask() {
    let titleInput = document.getElementById('input_title_addTask_dialog');
    newTask.title = titleInput.value;
}

function description_newTask() {
    let descriptionInput = document.getElementById('input_description_addTask_dialog');
    newTask.description = descriptionInput.value;
}

function category_newTask() {
    newTask.category = selectedCategory;
}

function contacts_newTask() {
    for (let i = 0; i < contacts_addTask.length; i++) {
        let contact = contacts_addTask[i];
        if (contact.select_status == true) {
            newTask.contacts.push(
            {
                "firstName": contact.firstName,
                "secondName": contact.secondName,
                "color": contact.color
            }
            )
        }
    }
}

function  dueDate_newTask() {
    let duedateInput = document.getElementById('edit_input_dueDate_addTask').value;
    duedateInput = duedateInput.split('-');
    let year = parseInt(duedateInput[2]); 
    year = year - 2000;
    let newDate = duedateInput[0] + '/' + duedateInput[1] + '/' + year;
    newTask.dueDate = newDate;
}

function priority_newTask() {
    newTask.priority = prio_addTask;
}

function subtasks_newTask() {
    if (new_subtask_addTask_dialog.length > 0) {
    newTask.subtasks = new_subtask_addTask_dialog;
    }
}

function status_newTask() {
    newTask.status = "toDo";
}






