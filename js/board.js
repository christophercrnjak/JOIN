let tasks = [];

async function init() {
    let resp = await fetch('assets/json/tasks.json'); // der Inhalt des JSONs bundesländer wird der Variable resp (steht für respons) zugewiesen und ist noch Text
    tasks = await resp.json(); // der Text wird in ein JSON umgewandelt und noch einmal in einem eigenen Array gespeichert (bundeslaender)
    console.log(tasks);
}

// inital render of the different columns
function renderTasksInColumns() {
    renderToDo();
    renderInProgress();
    renderAwaitFeedback();
    renderDone();
}

// render content of column "To do" in Board
function renderToDo(){
    let toDoContainer = document.getElementById('task_container_Todo');
    toDoContainer.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if(task.status == toDo) {
            toDoContainer.innerHTML += taskHTML(task, i);
        } else {
            toDoContainer.innerHTML = noTaskHTML('To do');
        }
    }
}

function renderInProgress(){
    let inProgressContainer = document.getElementById('task_container_InProgress');
}

function renderAwaitFeedback(){
    let awaitFeddbackContainer = document.getElementById('task_container_AwaitFeedback');
}

function renderDone(){
    let doneContainer = document.getElementById('task_container_Done');
}

function noTaskHTML(head_text) {
    return `<div class="no_task">No Task ${head_text}</div>`
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
                    <div class="member_cycle orange pos1">AM</div>
                    <div class="member_cycle turkies pos2">EM</div>
                    <div class="member_cycle violett pos3">MB</div>
                </div>
                <div class="task_prio">
                    <img src="assets/img/Priority_symbols_Medium.png" alt="">
                </div>
            </div>
        </article>
    `
}



// ****** DIALOG FUNCTIONS *****

function close_open_Dialog() {
    let container = document.getElementById('dialog_container');
    container.classList.toggle('d-none')
}


