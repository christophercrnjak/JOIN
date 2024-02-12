let tasks = [];

async function init() {
    let resp = await fetch('assets/json/tasks.json'); 
    tasks = await resp.json(); 
    console.log(tasks);
    renderColumnContent()
}

// render content of column "To do" in Board
function renderColumnContent(){
    let toDo_container = document.getElementById('task_container_Todo')
    let inProgress_container = document.getElementById('task_container_InProgress')
    let awaitFeedback_container = document.getElementById('task_container_AwaitFeedback')
    let done_container = document.getElementById('task_container_Done')
    toDo_container.innerHTML = '';
    inProgress_container.innerHTML = '';
    awaitFeedback_container.innerHTML = '';
    done_container.innerHTML = '';
    distributionTasks(toDo_container, inProgress_container, awaitFeedback_container, done_container);
}

function distributionTasks(toDo, inProgress, awaitFeedback, done) {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        switch (task.status) {
          case 'toDo':
            toDo.innerHTML += taskHTML(task, i);
            break;
          case 'inProgress':
            inProgress.innerHTML += taskHTML(task, i);
            break;
          case 'awaitFeedback':
            awaitFeedback.innerHTML += taskHTML(task, i);
            break;
          case 'done':
            done.innerHTML += taskHTML(task, i);
            break;
        }
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
            <div class="task_category">${category}</div>
            <div class="task_title">${title}</div>
            <div class="task_description">${description}</div>
            <div class="task_progress">
                <div class="progressbar">
                    <div class="progressbar_blue"></div>
                </div>
                <div class="progressbar_text">1/2 Subtasks</div>
            </div>
            <div class="task_members_prio">
                <div class="task_members">
                    <div class="member_cycle orange pos1">${initials(task.contacts[0])}</div>
                    <div class="member_cycle turkies pos2">${initials(task.contacts[1])}</div>
                    <div class="member_cycle violett pos3">${initials(task.contacts[2])}</div>
                </div>
                <div class="task_prio">
                    <img src="assets/img/Priority_symbols_Medium.png" alt="">
                </div>
            </div>
        </article>
    `
}

function initials() {
    return `test`
}



// ****** DIALOG FUNCTIONS *****

function close_open_Dialog() {
    let container = document.getElementById('dialog_container');
    container.classList.toggle('d-none')
}


