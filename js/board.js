let tasks = [];

async function init() {
    let resp = await fetch('assets/json/tasks.json'); // der Inhalt des JSONs bundesländer wird der Variable resp (steht für respons) zugewiesen und ist noch Text
    tasks = await resp.json(); // der Text wird in ein JSON umgewandelt und noch einmal in einem eigenen Array gespeichert (bundeslaender)
    console.log(tasks);
}



function renderTasksInColumns() {
    renderToDo();
    renderInProgress();
    renderAwaitFeedback();
    renderDone();
}

function renderToDo(){
    let toDoContainer = document.getElementById('task_container_Todo');
    toDoContainer.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if(task.status == toDo) {
            toDoContainer.innerHTML += taskHTML(task);
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


function close_open_Dialog() {
    let container = document.getElementById('dialog_container');
    container.classList.toggle('d-none')
}
