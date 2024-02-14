let tasks = [];


async function init() {
    let resp = await fetch('assets/json/tasks.json'); 
    tasks = await resp.json(); 
    console.log(tasks);
    renderColumnContent();
}


// delete content of columns
async function renderColumnContent(){
    let toDo_container = document.getElementById('task_container_Todo');
    let inProgress_container = document.getElementById('task_container_InProgress');
    let awaitFeedback_container = document.getElementById('task_container_AwaitFeedback');
    let done_container = document.getElementById('task_container_Done');
    toDo_container.innerHTML = '';
    inProgress_container.innerHTML = '';
    awaitFeedback_container.innerHTML = '';
    done_container.innerHTML = '';
    await distributionTasks(toDo_container, inProgress_container, awaitFeedback_container, done_container);
    noTask(toDo_container, inProgress_container, awaitFeedback_container, done_container);
}


function distributionTasks(toDo, inProgress, awaitFeedback, done) {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        switch (task.status) { // tasks[i].status has the Value of

            case 'toDo': // case one tasks[i].status: 'toDo'
              toDo.innerHTML += taskHTML(task, i);
              renderTaskElements(i)
              break;
            case 'inProgress': // case one tasks[i].status: 'inProgress'
              inProgress.innerHTML += taskHTML(task, i);
              renderTaskElements(i)
              break;
            case 'awaitFeedback':
              awaitFeedback.innerHTML += taskHTML(task, i);
              renderTaskElements(i)
              break;
            case 'done':
              done.innerHTML += taskHTML(task, i);
              renderTaskElements(i)
              break;
        }
    }
  
}


function noTask(toDo_container, inProgress_container, awaitFeedback_container, done_container) {
    if (toDo_container.innerHTML == '') {
        toDo_container.innerHTML = noTaskHTML('To do');
    };
    if (inProgress_container.innerHTML == '') {
        inProgress_container.innerHTML = noTaskHTML('In Progress');
    };
    if (awaitFeedback_container.innerHTML == '') {
        awaitFeedback_container.innerHTML = noTaskHTML('Await feedback');
    };
    if (done_container.innerHTML == '') {
        done_container.innerHTML = noTaskHTML('done');
    };
}


function noTaskHTML(head_text) {
   
    return `<div class="no_task"> no ${head_text} task</div>`
}


function renderTaskElements(i) {
    setColorOfCategory(i);
    showprogressbar(i);
    renderInitials(i);
    renderPriority(i);
}


function setColorOfCategory(i) {
    let category = tasks[i].category;
    container = document.getElementById(`task_category${i}`);
    switch (category) {
        case 'User Story':
          container.style.backgroundColor = '#0038FF';
          break;
        case 'Technical Task':
          container.style.backgroundColor = '#1FD7C1';
          break;
    }
}


function taskHTML(task, i) {
    let category = task.category;
    let title = task.title;
    let description = task.description;
    return `
        <article id="task${i}" onclick="close_open_Dialog(${i})" class="task">
            <div id="task_category${i}" class="task_category">${category}</div>
            <div class="task_title">${title}</div>
            <div class="task_description">${description}</div>
            <div id="task_progressbar${i}" class="task_progress"></div>
            <div class="task_members_prio">
                <div id="task_member_section${i}" class="task_members"></div>
            <div id="prio_icon${i}" class="task_prio">
                <img src="assets/img/Priority_symbols_Medium.png" alt="">
            </div>
        </article>
    `
}


function renderPriority(i) {
    let priority = tasks[i].priority;
    let container = document.getElementById(`prio_icon${i}`);
    switch (priority) {
        case "Low":
          container.innerHTML = `<img src="assets/img/Priority_symbols_Low.png" alt="">`;
          break;
        case "Medium":
            container.innerHTML = `<img src="assets/img/Priority_symbols_Medium.png" alt="">`;
          break;
        case "Urgent":
          container.innerHTML = `<img src="assets/img/Priority_symbols_Urgent.png" alt="">`;
        break;
    }
}


function showprogressbar(i) {
    let container = document.getElementById(`task_progressbar${i}`)
    let task = tasks[i];
    if (task.subtasks.length > 0) {
        container.innerHTML = subtaskHTML(i);
        renderSubtaskAmounts(i);
        renderBlueProgressbar(i)
    } else {
        container.classList.add('d-none')
    }
}


function subtaskHTML(i) {
    return `
    <div  class="progressbar">
        <div id="blue_progressbar${i}" class="progressbar_blue"></div>
    </div>
    <div class="progressbar_text"> 
        <span id="subtasks_todo${i}"></span> / <span id="subtasks_total${i}"></span> Subtasks
    </div>
    `;
}


function renderSubtaskAmounts(i) {
    let sub_todo = document.getElementById(`subtasks_todo${i}`);
    let sub_total = document.getElementById(`subtasks_total${i}`);
    let amountOfOpenTasks = calcSubtaskAmount(i);
    sub_todo.innerHTML = amountOfOpenTasks;
    sub_total.innerHTML = tasks[i].subtasks.length;
}


function calcSubtaskAmount(i) {
    let task = tasks[i];
    let subtask = task.subtasks;
    let subtask_amount_todo = 0;
    for (let i = 0; i < subtask.length; i++) {
        if(subtask[i].done == true) {
            subtask_amount_todo++;
        } 
    }
    return subtask_amount_todo;
}


function renderBlueProgressbar(i) {
    let container = document.getElementById(`blue_progressbar${i}`)
    let amountOfOpenTasks = calcSubtaskAmount(i);
    let totalSubtasks = tasks[i].subtasks.length;
    if (amountOfOpenTasks == 0) {
        container.style.width = '0px';
    } else if (amountOfOpenTasks == tasks[i].subtasks.length) {
        container.style.width = '128px';
    } else {
        let progress = calcProgressbar(totalSubtasks) * amountOfOpenTasks;
        container.style.width = `${progress}px`;
    }
}


function calcProgressbar(totalSubtasks){
    let progressTotal = 128 / totalSubtasks;
    return +progressTotal;
}


function renderInitials(task_number) {
    let task = tasks[task_number];
    let container = document.getElementById(`task_member_section${task_number}`);
    container.innerHTML = '';
    for (let i = 0; i < task.contacts.length; i++) {
        let contact = task.contacts[i];
        let firstCharacter = contact.firstName.charAt(0);
        let secondCharacter = contact.secondName.charAt(0);
        let colorClass = contact.color;
        container.innerHTML += taskMemberHTML(firstCharacter, secondCharacter, colorClass, task_number, i);   
        if(i > 0) {
            let additionalTaskMember = document.getElementById(`task_member${task_number}${i}`);
            additionalTaskMember.style.position = 'relative';
            additionalTaskMember.style.left     = calcPositionMember(i);
        }
    }
}


function calcPositionMember(i) {
    let position = i * -9;
    return `${position}px`
}


function taskMemberHTML(firstCharacter, secondCharacter, colorClass, task_number, i) {
    return `
        <div id="task_member${task_number}${i}" class="member_cycle ${colorClass}">${firstCharacter}${secondCharacter}</div>
    `;
}



// ****** DIALOG FUNCTIONS *****



function close_open_Dialog(taskId) {
    let container = document.getElementById('dialog_container');
    container.classList.toggle('d-none');
    if(!container.classList.contains('d-none')) {
    renderDialogTask(taskId)};
    renderBlueProgressbar(taskId);
}


function renderDialogTask(taskId){
    let container = document.getElementById('task_dialog_container');
    let task = tasks[taskId];
    container.innerHTML = taskDialogHTML(task, taskId);
    setColorOfCategoryInDialog(taskId);
    renderAssigedToDialog(taskId);
    renderPriorityDialog(taskId);
    renderSubtasksDialog(taskId);
}


function taskDialogHTML(task, taskId) {
    return`
        <div class="category_close">
                <div onclick="doNotClose(event)" id="task_category_dialog" class="task_category">${task.category}</div>
                <a onclick="close_open_Dialog(${taskId})" class="close">
                    <div class="line horizontal"></div>
                    <div class="line vertical"></div>
                </a>
            </div>
            <div onclick="doNotClose(event)" class="task_title_dialog">${task.title}</div>
            <div onclick="doNotClose(event)" class="task_description_dialog">${task.description}</div>
            <div onclick="doNotClose(event)" class="due_Date_dialog">
                Due date: <span class="duedate">${task.dueDate}</span>
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
                    <a onclick="deleteTask(${taskId})"><img src="assets/img/delete.png" alt="">Delete</a>
                    <div class="line_task"></div>
                    <a><img src="assets/img/edit.png" alt="">Edit</a>
                </div>
            </div>
    `;
}


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


function renderPriorityDialog(i) {
    let priority = tasks[i].priority;
    let container = document.getElementById('prio_image');
    switch (priority) {
        case "Low":
          container.innerHTML = `<img src="assets/img/Priority_symbols_Low.png" alt="">`;
          break;
        case "Medium":
            container.innerHTML = `<img src="assets/img/Priority_symbols_Medium.png" alt="">`;
          break;
        case "Urgent":
          container.innerHTML = `<img src="assets/img/Priority_symbols_Urgent.png" alt="">`;
        break;
    }
}


function renderSubtasksDialog(i){
    let container = document.getElementById('subtask_dialog_container');
    let header = document.getElementById('subtask_dialog_header')
    if (tasks[i].subtasks.length > 0) {
        header.innerHTML = 'Subtasks';
    }
    container.innerHTML = '';
    for (let j = 0; j < tasks[i].subtasks.length; j++) {
        let subtask = tasks[i].subtasks[j];
        container.innerHTML += `
            <div class="Subtasks">
                <div id="subtask_status_img${i}${j}"></div>
                <span>${subtask.name}</span>
            </div>
        `;
        renderSubtaskImage(i, j);
    }
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
          container.innerHTML = `<a class="checkbox" onclick="changeSubtaskStatus(${taskId}, ${subtaskId})"><img src="assets/img/check_button_checked.png" alt=""></a>`;
          break;
        case false:
            container.innerHTML = `<a onclick="changeSubtaskStatus(${taskId}, ${subtaskId})"><img src="assets/img/check_button_unchecked.png" alt=""></a>`;
          break;
    }
}


function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    renderColumnContent();
    close_open_Dialog(taskId);
}


function doNotClose(event) {
    event.stopPropagation();
}


