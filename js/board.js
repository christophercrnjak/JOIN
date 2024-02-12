let tasks = [];

async function init() {
    let resp = await fetch('assets/json/tasks.json'); 
    tasks = await resp.json(); 
    console.log(tasks);
    renderColumnContent();
}

// delete content of columns
function renderColumnContent(){
    let toDo_container = document.getElementById('task_container_Todo');
    let inProgress_container = document.getElementById('task_container_InProgress');
    let awaitFeedback_container = document.getElementById('task_container_AwaitFeedback');
    let done_container = document.getElementById('task_container_Done');
    toDo_container.innerHTML = '';
    inProgress_container.innerHTML = '';
    awaitFeedback_container.innerHTML = '';
    done_container.innerHTML = '';
    distributionTasks(toDo_container, inProgress_container, awaitFeedback_container, done_container);
}

function distributionTasks(toDo, inProgress, awaitFeedback, done) {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        switch (task.status) { // tasks[i].status has the Value of

            case 'toDo': // case one tasks[i].status: 'toDo'
              toDo.innerHTML += taskHTML(task, i);
              renderInitials(i); // get the circle with the Initials
              setColorOfCategory(i); // set color of categories in dependence of category names
              showprogressbar(i);
              break;
            case 'inProgress': // case one tasks[i].status: 'inProgress'
              inProgress.innerHTML += taskHTML(task, i);
              renderInitials(i);
              setColorOfCategory(i);
              showprogressbar(i);
              break;
            case 'awaitFeedback':
              awaitFeedback.innerHTML += taskHTML(task, i);
              renderInitials(i);
              setColorOfCategory(i);
              showprogressbar(i);
              break;
            case 'done':
              done.innerHTML += taskHTML(task, i);
              renderInitials(i);
              setColorOfCategory(i);
              showprogressbar(i);
              break;
        }
    }
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

function noTaskHTML(head_text) {
    return `<div class="no_task"> no ${head_text} task</div>`
}

function taskHTML(task, i) {

    let category = task.category;
    let title = task.title;
    let description = task.description;
    return `
        <article id="task${i}" onclick="close_open_Dialog()" class="task">
            <div id="task_category${i}" class="task_category">${category}</div>
            <div class="task_title">${title}</div>
            <div class="task_description">${description}</div>
            <div id="task_progressbar${i}" class="task_progress"></div>
            <div class="task_members_prio">
                <div id="task_member_section${i}" class="task_members"></div>
            <div class="task_prio">
                <img src="assets/img/Priority_symbols_Medium.png" alt="">
            </div>
        </article>
    `
}

function showprogressbar(i) {
    let container = document.getElementById(`task_progressbar${i}`)
    let task = tasks[i];
    if (task.subtasks.length > 0) {
        container.innerHTML = subtaskHTML(i);
        renderSubtaskAmounts(i);
    } else {
        container.classList.add('d-none')
    }
}

function subtaskHTML(i) {
    return `
    <div  class="progressbar">
            <div class="progressbar_blue"></div>
        </div>
        <div class="progressbar_text"> <span id="subtasks_todo${i}"></span>/<span id="subtasks_total${i}"></span> Subtasks</div>
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

function close_open_Dialog() {
    let container = document.getElementById('dialog_container');
    container.classList.toggle('d-none')
}


