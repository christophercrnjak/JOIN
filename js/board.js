let tasks = [];

async function init() {
    let resp = await fetch('assets/json/tasks.json'); 
    tasks = await resp.json(); 
    console.log(tasks);
    renderColumnContent()
}

// render content of column "To do" in Board
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
        switch (task.status) {
            case 'toDo':
              toDo.innerHTML += taskHTML(task, i);
              renderInitials(i);
              setColorOfCategory(i);
              break;
            case 'inProgress':
              inProgress.innerHTML += taskHTML(task, i);
              renderInitials(i);
              setColorOfCategory(i);
              break;
            case 'awaitFeedback':
              awaitFeedback.innerHTML += taskHTML(task, i);
              renderInitials(i);
              setColorOfCategory(i);
              break;
            case 'done':
              done.innerHTML += taskHTML(task, i);
              renderInitials(i);
              setColorOfCategory(i);
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
            <div class="task_progress">
                <div class="progressbar">
                    <div class="progressbar_blue"></div>
                </div>
                <div class="progressbar_text">1/2 Subtasks</div>
            </div>
            <div class="task_members_prio">
                <div id="task_member_section${i}" class="task_members">
                </div>
                <div class="task_prio">
                    <img src="assets/img/Priority_symbols_Medium.png" alt="">
                </div>
            </div>
        </article>
    `
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


