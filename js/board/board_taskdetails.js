// ****** Dialog taskdetails functions for the board *****

/**
 * Set new dialog-status.
 * Open dialog container to show task details.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
function openTaskDetailsDialog(taskId) {
    dialog_status = 'taskdetails';
    let container = document.getElementById('dialog_container');
    container.classList.remove('d-none');

    let taskDialogContainer = document.getElementById('task_dialog_container');
    taskDialogContainer.style.position = 'none'; // Element in die Mitte verschieben
    
    renderDialogTask(taskId);  
}

/**
 * Closes the Dialog and decide whether there is required to show taskdetails oder the Kanban Board
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
function closeDialog(taskId) {
    if(dialog_status == 'taskdetails') {
        let container = document.getElementById('dialog_container');
        container.classList.add('d-none');
        renderColumnContent();
        dialog_status = 'inactive';
    } else if (dialog_status == 'edit') {
        renderDialogTask(taskId);  
        dialog_status = 'taskdetails';
    }
}

/**
 * Calls the functions creates the HTML structure of dialog with details of the task.
 * When the dialog to change content is called, the data is loaded from currentTaskContent.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array
 */
async function renderDialogTask(taskId){
    let container = document.getElementById('task_dialog_container');
    let task;
    if(!currentTaskContent == '') {
        task = currentTaskContent;
    } else {
        await setTasksToServer();
        await getTasksFromServer();
        task = tasks[taskId];
        container.innerHTML = taskDialogHTML(task, taskId);
        changeDueDateFormat(taskId);
        setColorOfCategoryInDialog(taskId);
        renderPriorityDialog(taskId);
        await renderAssigedToDialog(taskId);
        renderSubtasksDialog(taskId);
        if (tasks[taskId].subtasks.length > 0){
            renderBlueProgressbar(taskId);
        }
    }
}

/**
 * Returns the HTML structure of dialog with task details of current choosen task
 * 
 * @param {JSON} task Object JSON with task elements.
 * @param {Number} taskId Index of current called task in tasks[] global array.
 * @returns {String} - HTML structure of Dialog with task details.
 */
function taskDialogHTML(task, taskId) {
    return`
        <div class="category_close">
                <div onclick="doNotClose(event)" id="task_category_dialog" class="task_category">${task.category}</div>
                <a onclick="closeDialog(${taskId})" class="close">
                    <div class="line horizontal"></div>
                    <div class="line vertical"></div>
                </a>
            </div>
            <div onclick="doNotClose(event)" class="task_title_dialog">${task.title}</div>
            <div onclick="doNotClose(event)" class="task_description_dialog">${task.description}</div>
            <div onclick="doNotClose(event)" class="due_Date_dialog">
                Due date: <span id="dueDateTaskDetails" class="duedate">${task.dueDate}</span>
            </div>
            <div onclick="doNotClose(event)" class="priority_dialog">
                Priority: <span >${task.priority}</span><div id="prio_image"></div>
            </div>
            <div onclick="doNotClose(event)" class="assigned_to">
                <div>Assiged To:</div>
                <div class="table_assigedto">
                    <table>
                        <tbody id="member_container_dialog"></tbody>
                    </table>
                </div>
            </div>

            <div onclick="doNotClose(event)" class="subtasks_main">
                <div id="subtask_dialog_header"></div>
                <div id="subtask_dialog_container" class="subtask_container">
                </div>
            </div>

            <div onclick="doNotClose(event)" class="delete_and_edit_section">
                <div class="delete_and_edit">

                    <a onclick="deleteTask(${taskId})">
                        <div id="delete_img_dialog">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.14453 18C2.59453 18 2.1237 17.8042 1.73203 17.4125C1.34036 17.0208 1.14453 16.55 1.14453 16V3C0.861198 3 0.623698 2.90417 0.432031 2.7125C0.240365 2.52083 0.144531 2.28333 0.144531 2C0.144531 1.71667 0.240365 1.47917 0.432031 1.2875C0.623698 1.09583 0.861198 1 1.14453 1H5.14453C5.14453 0.716667 5.24036 0.479167 5.43203 0.2875C5.6237 0.0958333 5.8612 0 6.14453 0H10.1445C10.4279 0 10.6654 0.0958333 10.857 0.2875C11.0487 0.479167 11.1445 0.716667 11.1445 1H15.1445C15.4279 1 15.6654 1.09583 15.857 1.2875C16.0487 1.47917 16.1445 1.71667 16.1445 2C16.1445 2.28333 16.0487 2.52083 15.857 2.7125C15.6654 2.90417 15.4279 3 15.1445 3V16C15.1445 16.55 14.9487 17.0208 14.557 17.4125C14.1654 17.8042 13.6945 18 13.1445 18H3.14453ZM3.14453 3V16H13.1445V3H3.14453ZM5.14453 13C5.14453 13.2833 5.24036 13.5208 5.43203 13.7125C5.6237 13.9042 5.8612 14 6.14453 14C6.42786 14 6.66536 13.9042 6.85703 13.7125C7.0487 13.5208 7.14453 13.2833 7.14453 13V6C7.14453 5.71667 7.0487 5.47917 6.85703 5.2875C6.66536 5.09583 6.42786 5 6.14453 5C5.8612 5 5.6237 5.09583 5.43203 5.2875C5.24036 5.47917 5.14453 5.71667 5.14453 6V13ZM9.14453 13C9.14453 13.2833 9.24037 13.5208 9.43203 13.7125C9.6237 13.9042 9.8612 14 10.1445 14C10.4279 14 10.6654 13.9042 10.857 13.7125C11.0487 13.5208 11.1445 13.2833 11.1445 13V6C11.1445 5.71667 11.0487 5.47917 10.857 5.2875C10.6654 5.09583 10.4279 5 10.1445 5C9.8612 5 9.6237 5.09583 9.43203 5.2875C9.24037 5.47917 9.14453 5.71667 9.14453 6V13Z" fill="#2A3647"/>
                            </svg>
                        </div> <div class="delet_text">Delete</div>
                    </a>

                    <div class="line_task"></div>

                    <a id="edit_img_dialog" onclick="openTaskEdit(${taskId})">
                        <div id="delete_img_dialog">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                        </svg>
                        </div> <div class="delet_text">Edit</div>
                    </a>

                </div>
            </div>
    `;
}

/**
 * Saves the new format of DueDate.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array.
 */
function changeDueDateFormat(taskId) {
    let container = document.getElementById('dueDateTaskDetails');
    let date = changeDueDateFormatInLongYear(taskId);
    container.innerHTML = `${date}`;
}

/**
 * Set the background-color of category-element.
 * 
 * @param {Number} i - Index of current called task in tasks[] global array.
 */
function setColorOfCategoryInDialog(i) {
    let category = tasks[i].category;
    container = document.getElementById('task_category_dialog');
    switch (category) {
        case 'User Story':
          container.style.backgroundColor = '#0038FF';
          break;
        case 'Technical Task':
          container.style.backgroundColor = '#1FD7C1';
          break;
    }
}

/**
 * Create the details of contacts assigned to the task.
 * 
 * @param {Number} taskId - Index of current called task in tasks[] global array.
 */
function renderAssigedToDialog(taskId) {
    let container = document.getElementById('member_container_dialog');
    container.innerHTML = '';
    let task = tasks[taskId];
    for (let i = 0; i < task.contacts.length; i++) {
        let contact = task.contacts[i];
        container.innerHTML += `
            <tr>
                <td class="member_cycle ${contact.color} pos1">${contact.firstName.charAt(0)}${contact.secondName.charAt(0)}</td>
                <td class="member_name_assiged_to">${contact.firstName} ${contact.secondName}</td>
            </tr>
        `;
    }
}

/**
 * Set the priority image.
 * 
 * @param {*} taskId - Index of current called task in tasks[] global array.
 */
function renderPriorityDialog(taskId) {
    let priority = tasks[taskId].priority;
    let container = document.getElementById('prio_image');
    switch (priority) {
        case "Low":
          container.innerHTML = `<img src="assets/img/Prio_low_color_32x32.svg" alt="">`;
          break;
        case "Medium":
            container.innerHTML = `<img src="assets/img/Prio_medium_color_32x32.svg" alt="">`;
          break;
        case "Urgent":
          container.innerHTML = `<img src="assets/img/Prio_urgent_color_32x32.svg" alt="">`;
        break;
    }
}

/**
 * 
 * @param {*} taskId - Index of current called task in tasks[] global array.
 */
function renderSubtasksDialog(taskId){
    let container = document.getElementById('subtask_dialog_container');
    let header = document.getElementById('subtask_dialog_header')
    if (tasks[taskId].subtasks.length > 0) {
        header.innerHTML = 'Subtasks';
    }
    container.innerHTML = '';
    for (let j = 0; j < tasks[taskId].subtasks.length; j++) {
        let subtask = tasks[taskId].subtasks[j];
        container.innerHTML += subtaskDialogHTML(taskId, j, subtask.name);
        renderSubtaskImage(taskId, j);
    }
}

function subtaskDialogHTML(i, j, name) {
    return `
        <div class="Subtasks">
            <div id="subtask_status_img${i}${j}"></div>
            <span>${name}</span>
        </div>
    `;
}


function changeSubtaskStatus(taskId, subtaskId) {
    let subtaskStatus = tasks[taskId].subtasks[subtaskId].done;
    if (subtaskStatus == true) {
        tasks[taskId].subtasks[subtaskId].done = false;
    } else {
        tasks[taskId].subtasks[subtaskId].done = true;
    }
    renderSubtasksDialog(taskId);
    renderSubtaskAmounts(taskId);
}


function renderSubtaskImage(taskId, subtaskId) {
    let container = document.getElementById(`subtask_status_img${taskId}${subtaskId}`)
    let status = tasks[taskId].subtasks[subtaskId].done;
    switch (status) {
        case true:
          container.innerHTML = `<a class="checkbox1" onclick="changeSubtaskStatus(${taskId}, ${subtaskId})"><img src="assets/img/check_button_checked.png"></a>`;
          break;
        case false:
            container.innerHTML = `<a class="checkbox1" onclick="changeSubtaskStatus(${taskId}, ${subtaskId})"><img src="assets/img/check_button_unchecked.png"></a>`;
          break;
    }
}


function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    renderColumnContent();
    closeDialog(taskId);
}


function doNotClose(event) {
    event.stopPropagation();
}
