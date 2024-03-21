// *** Create new Task Button *** //

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

async function initCreateNewTask() {
    await saveNewTask();
    await tasks.push(newTask);
    await setAndGetToServer();
    resetSettings();
    closeAddTaskDialog();
}

function resetSettings() {
    document.getElementById('category_addTask_dialog').classList.remove('non_valide');
    document.getElementById('edit_input_dueDate_addTask').classList.remove('non_valide');
    clearInputsAddTaskDialog();
    resetNewTask();
    document.getElementById('task_dialog_container').style.width = '525px';
    document.getElementById('task_dialog_container').style.paddingTop = '48px';
}

async function closeAddTaskDialog() {
    await closeDialog();
    let taskslength = tasks.length;
    openTaskDetailsDialog(taskslength);
}

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
    duedateInput = duedateInput.split('/');
    let year = parseInt(duedateInput[2]); 
    year = year - 2000;
    let newDate = duedateInput[0] + '/' + duedateInput[1] + '/' + year;
    newTask.dueDate = newDate;
}

function priority_newTask() {
    newTask.priority = prio_addTask;
}

function subtasks_newTask() {
    if (new_subtask_addTask_dialog > 0 && !new_subtask_addTask_dialog == '') {
    newTask.subtasks.push(new_subtask_addTask_dialog);
    }
}

function status_newTask() {
    newTask.status = "toDo";
}

async function saveNewTask() {
    title_newTask();
    description_newTask();
    category_newTask();
    contacts_newTask();
    dueDate_newTask();
    priority_newTask();
    subtasks_newTask();
    status_newTask();
}

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


